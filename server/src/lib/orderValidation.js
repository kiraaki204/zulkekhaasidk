import { config } from '../lib/config.js'
import { prisma } from '../lib/prisma.js'
import { ApiError } from '../middleware/errors.js'

export function computeShipping(subtotalPkr) {
  if (subtotalPkr <= 0) return 0
  if (subtotalPkr >= config.shipping.freeOverPkr) return 0
  return config.shipping.flatRatePkr
}

/**
 * Server-side order validation: re-prices from DB, checks stock.
 * Never trusts client-provided totals.
 */
export async function validateOrderRequest({ items, shipping: shippingPkr }) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new ApiError(400, 'Order must contain at least one item')
  }

  const productIds = items.map((i) => i.productId)
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, active: true },
  })
  const byId = new Map(products.map((p) => [p.id, p]))

  let subtotal = 0
  const lines = []

  for (const line of items) {
    const product = byId.get(line.productId)
    if (!product) throw new ApiError(400, `Unknown product: ${line.productId}`)
    if (!product.inStock || product.stock < line.quantity) {
      throw new ApiError(409, `${product.name} does not have enough stock`, {
        productId: product.id,
        available: product.stock,
      })
    }
    const qty = line.quantity
    subtotal += product.pricePkr * qty
    lines.push({
      productId: product.id,
      quantity: qty,
      unitPricePkr: product.pricePkr,
    })
  }

  const expectedShipping = computeShipping(subtotal)
  if (typeof shippingPkr === 'number' && shippingPkr !== expectedShipping) {
    throw new ApiError(409, 'Shipping calculation mismatch', {
      expected: expectedShipping,
      received: shippingPkr,
    })
  }

  return { lines, subtotal, shipping: expectedShipping, total: subtotal + expectedShipping }
}
