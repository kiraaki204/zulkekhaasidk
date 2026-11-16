import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma.js'
import { ApiError } from '../middleware/errors.js'
import { validateBody } from '../middleware/validate.js'
import { requireAdmin } from '../middleware/auth.js'

const router = Router()
// Scope auth to /admin/* only — a bare router.use would 401 every /api request that hits this router first
router.use('/admin', requireAdmin)

const orderStatusEnum = z.enum(['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'])
const paymentStatusEnum = z.enum(['PENDING', 'PAID', 'FAILED', 'REFUNDED', 'COD_PENDING'])

/* ——— Orders ——— */

router.get('/admin/orders', async (req, res, next) => {
  try {
    const parsed = z
      .object({ status: orderStatusEnum.optional(), take: z.coerce.number().int().min(1).max(100).optional() })
      .safeParse(req.query)
    if (!parsed.success) throw new ApiError(400, 'Invalid query parameters')

    const orders = await prisma.order.findMany({
      where: parsed.data.status ? { status: parsed.data.status } : undefined,
      orderBy: { createdAt: 'desc' },
      take: parsed.data.take ?? 50,
      include: {
        items: { include: { product: { select: { name: true, slug: true } } } },
      },
    })
    res.json({ orders })
  } catch (err) {
    next(err)
  }
})

router.get('/admin/orders/:id', async (req, res, next) => {
  try {
    const order = await prisma.order.findFirst({
      where: { OR: [{ id: req.params.id }, { reference: req.params.id }] },
      include: { items: { include: { product: { select: { name: true, slug: true } } } } },
    })
    if (!order) throw new ApiError(404, 'Order not found')
    res.json({ order })
  } catch (err) {
    next(err)
  }
})

const updateOrderSchema = z
  .object({
    status: orderStatusEnum.optional(),
    paymentStatus: paymentStatusEnum.optional(),
  })
  .refine((v) => v.status !== undefined || v.paymentStatus !== undefined, {
    message: 'Provide status or paymentStatus',
  })

router.patch('/admin/orders/:id', validateBody(updateOrderSchema), async (req, res, next) => {
  try {
    const existing = await prisma.order.findFirst({
      where: { OR: [{ id: req.params.id }, { reference: req.params.id }] },
    })
    if (!existing) throw new ApiError(404, 'Order not found')

    const { status, paymentStatus } = req.body
    const order = await prisma.order.update({
      where: { id: existing.id },
      data: {
        ...(status ? { status } : {}),
        ...(paymentStatus ? { paymentStatus } : {}),
      },
    })
    res.json({ order })
  } catch (err) {
    next(err)
  }
})

/* ——— Products CRUD ——— */

const benefitSchema = z.array(z.string().trim().min(1).max(120)).max(12)

const productCreateSchema = z.object({
  slug: z.string().trim().min(3).max(120).regex(/^[a-z0-9-]+$/),
  name: z.string().trim().min(2).max(160),
  tagline: z.string().trim().min(2).max(240),
  description: z.string().trim().min(10).max(4000),
  sizeMl: z.number().int().min(1).max(5000).default(150),
  pricePkr: z.number().int().min(1).max(10_000_000),
  stock: z.number().int().min(0).max(1_000_000).default(0),
  inStock: z.boolean().default(true),
  benefits: benefitSchema.default([]),
  heroImage: z.string().trim().max(500).optional().or(z.literal('')),
  active: z.boolean().default(true),
})

const productUpdateSchema = productCreateSchema.partial()

router.get('/admin/products', async (_req, res, next) => {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'asc' } })
    res.json({ products })
  } catch (err) {
    next(err)
  }
})

router.post('/admin/products', validateBody(productCreateSchema), async (req, res, next) => {
  try {
    const data = { ...req.body, heroImage: req.body.heroImage || null }
    const product = await prisma.product.create({ data })
    res.status(201).json({ product })
  } catch (err) {
    if (err.code === 'P2002') throw new ApiError(409, 'Slug already exists')
    next(err)
  }
})

router.patch('/admin/products/:id', validateBody(productUpdateSchema), async (req, res, next) => {
  try {
    const existing = await prisma.product.findFirst({
      where: { OR: [{ id: req.params.id }, { slug: req.params.id }] },
    })
    if (!existing) throw new ApiError(404, 'Product not found')

    const data = { ...req.body }
    if ('heroImage' in data) data.heroImage = data.heroImage || null

    const product = await prisma.product.update({ where: { id: existing.id }, data })
    res.json({ product })
  } catch (err) {
    if (err.code === 'P2002') throw new ApiError(409, 'Slug already exists')
    next(err)
  }
})

/* ——— Analytics ——— */

router.get('/admin/analytics', async (_req, res, next) => {
  try {
    const [orderAgg, byStatus, revenueAgg, reviewAgg, productCount] = await Promise.all([
      prisma.order.aggregate({ _count: { _all: true } }),
      prisma.order.groupBy({ by: ['status'], _count: { _all: true } }),
      prisma.order.aggregate({
        _sum: { totalPkr: true },
        where: { status: { notIn: ['CANCELLED'] } },
      }),
      prisma.review.groupBy({ by: ['status'], _count: { _all: true } }),
      prisma.product.count({ where: { active: true } }),
    ])

    res.json({
      analytics: {
        totalOrders: orderAgg._count._all,
        ordersByStatus: Object.fromEntries(byStatus.map((s) => [s.status, s._count._all])),
        revenuePkr: revenueAgg._sum.totalPkr ?? 0,
        reviewsByStatus: Object.fromEntries(reviewAgg.map((s) => [s.status, s._count._all])),
        activeProducts: productCount,
      },
    })
  } catch (err) {
    next(err)
  }
})

export default router
