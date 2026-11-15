import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma.js'
import { ApiError } from '../middleware/errors.js'
import { validateBody } from '../middleware/validate.js'
import { validateOrderRequest } from '../lib/orderValidation.js'

const router = Router()

const orderSchema = z.object({
  customer: z.object({
    fullName: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(200),
    phone: z.string().trim().min(7).max(24),
  }),
  address: z.object({
    line1: z.string().trim().min(3).max(200),
    line2: z.string().trim().max(200).optional().or(z.literal('')),
    city: z.string().trim().min(2).max(100),
    province: z.string().trim().min(2).max(100),
    postalCode: z.string().trim().max(12).optional().or(z.literal('')),
    notes: z.string().trim().max(500).optional().or(z.literal('')),
  }),
  paymentMethod: z.enum(['COD', 'CARD', 'JAZZCASH', 'EASYPAISA']),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1).max(10),
      }),
    )
    .min(1)
    .max(20),
  shipping: z.number().int().min(0).optional(),
})

function makeReference() {
  const stamp = crypto.randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase()
  return `ZK-${stamp}`
}

router.post('/orders', validateBody(orderSchema), async (req, res, next) => {
  try {
    const { customer, address, paymentMethod, items, shipping } = req.body

    const priced = await validateOrderRequest({ items, shipping })

    // Reserve stock transactionally
    const order = await prisma.$transaction(async (tx) => {
      for (const line of priced.lines) {
        const updated = await tx.product.updateMany({
          where: { id: line.productId, stock: { gte: line.quantity } },
          data: { stock: { decrement: line.quantity } },
        })
        if (updated.count === 0) {
          throw new ApiError(409, 'Stock changed while placing the order — please retry')
        }
      }

      return tx.order.create({
        data: {
          reference: makeReference(),
          customerName: customer.fullName,
          email: customer.email,
          phone: customer.phone,
          addressLine1: address.line1,
          addressLine2: address.line2 || null,
          city: address.city,
          province: address.province,
          postalCode: address.postalCode || null,
          notes: address.notes || null,
          paymentMethod,
          paymentStatus: paymentMethod === 'COD' ? 'COD_PENDING' : 'PENDING',
          status: 'PENDING',
          subtotalPkr: priced.subtotal,
          shippingPkr: priced.shipping,
          totalPkr: priced.total,
          items: { create: priced.lines },
        },
        include: { items: { include: { product: true } } },
      })
    })

    res.status(201).json({
      order: {
        id: order.id,
        reference: order.reference,
        status: order.status,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        subtotalPkr: order.subtotalPkr,
        shippingPkr: order.shippingPkr,
        totalPkr: order.totalPkr,
        createdAt: order.createdAt,
        items: order.items.map((i) => ({
          productId: i.productId,
          name: i.product.name,
          quantity: i.quantity,
          unitPricePkr: i.unitPricePkr,
        })),
      },
    })
  } catch (err) {
    next(err)
  }
})

router.get('/orders/:reference', async (req, res, next) => {
  try {
    const order = await prisma.order.findUnique({
      where: { reference: req.params.reference },
      include: { items: { include: { product: true } } },
    })
    if (!order) throw new ApiError(404, 'Order not found')
    res.json({
      order: {
        reference: order.reference,
        status: order.status,
        paymentStatus: order.paymentStatus,
        totalPkr: order.totalPkr,
        createdAt: order.createdAt,
        items: order.items.map((i) => ({
          name: i.product.name,
          quantity: i.quantity,
          unitPricePkr: i.unitPricePkr,
        })),
      },
    })
  } catch (err) {
    next(err)
  }
})

export default router
