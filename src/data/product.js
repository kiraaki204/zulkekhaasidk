import heroImage from '../assets/images/Zulfe Khaas Hair Oil Still Life.png'

export const product = {
  id: 'zulfe-khaas-hair-oil-150',
  slug: 'zulfe-khaas-hair-oil-150',
  name: 'Zulfe Khaas',
  tagline: 'Herbal Hair Oil',
  size: '150 ml',
  price: 2499,
  currency: 'PKR',
  inStock: true,
  stockQuantity: 120,
  heroImage,
  gallery: [heroImage],
  description:
    'A slow-crafted herbal hair oil enriched with 27 botanicals, simmered in a mustard-oil base. Made to nourish the scalp, strengthen the lengths, and bring a quiet ritual of care to every day.',
  benefits: [
    'Nourishes the scalp with 27 hand-selected herbs',
    'Supports stronger, softer-looking lengths',
    'Lightweight mustard-oil base, never greasy-heavy',
    'A calming botanical ritual for daily or weekly care',
  ],
}

export const formatPrice = (amount) =>
  new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(amount)

/** Configurable checkout placeholders — replaced by backend config later. */
export const shipping = {
  flatRate: 250,
  freeOver: 5000,
  estimateDays: { min: 2, max: 5 },
}

export const orderTotals = (qty, price = product.price, ship = shipping) => {
  const subtotal = qty * price
  const shippingCost = subtotal === 0 || subtotal >= ship.freeOver ? 0 : ship.flatRate
  return { subtotal, shipping: shippingCost, total: subtotal + shippingCost }
}
