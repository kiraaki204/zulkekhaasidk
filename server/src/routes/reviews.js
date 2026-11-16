import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma.js'
import { ApiError } from '../middleware/errors.js'
import { validateBody } from '../middleware/validate.js'
import { requireAdmin } from '../middleware/auth.js'

const router = Router()

const createReviewSchema = z.object({
  orderReference: z.string().trim().min(4).max(40),
  email: z.string().trim().email().max(200),
  authorName: z.string().trim().min(2).max(80),
  rating: z.number().int().min(1).max(5),
  body: z.string().trim().min(10).max(2000),
  photoUrl: z.string().trim().url().max(500).optional().or(z.literal('')),
})

const publicQuerySchema = z.object({
  rating: z.coerce.number().int().min(1).max(5).optional(),
  photos: z.coerce.boolean().optional(),
  sort: z.enum(['recent', 'rating']).optional(),
})

/** Published reviews only, with optional filters. */
router.get('/reviews', async (req, res, next) => {
  try {
    const parsed = publicQuerySchema.safeParse(req.query)
    if (!parsed.success) throw new ApiError(400, 'Invalid query parameters')

    const { rating, photos, sort } = parsed.data
    const where = {
      status: 'PUBLISHED',
      ...(rating ? { rating } : {}),
      ...(photos ? { NOT: { photoUrl: null } } : {}),
    }

    const reviews = await prisma.review.findMany({
      where,
      orderBy: sort === 'rating' ? [{ rating: 'desc' }, { createdAt: 'desc' }] : { createdAt: 'desc' },
      take: 60,
      select: {
        id: true,
        authorName: true,
        rating: true,
        body: true,
        photoUrl: true,
        sellerResponse: true,
        createdAt: true,
      },
    })

    res.json({
      reviews: reviews.map((r) => ({
        ...r,
        verified: true,
      })),
    })
  } catch (err) {
    next(err)
  }
})

/**
 * Submit a review tied to a verified order.
 * Requires order reference + matching checkout email; one review per order.
 */
router.post('/reviews', validateBody(createReviewSchema), async (req, res, next) => {
  try {
    const { orderReference, email, authorName, rating, body, photoUrl } = req.body

    const order = await prisma.order.findUnique({ where: { reference: orderReference } })
    if (!order) throw new ApiError(404, 'Order reference not found')
    if (order.status === 'CANCELLED') throw new ApiError(409, 'This order cannot be reviewed')
    if (order.email.toLowerCase() !== email.trim().toLowerCase()) {
      throw new ApiError(403, 'Email does not match the order')
    }

    const existing = await prisma.review.findUnique({ where: { orderId: order.id } })
    if (existing) throw new ApiError(409, 'This order has already been reviewed')

    const product = await prisma.product.findFirst({ where: { active: true } })
    if (!product) throw new ApiError(409, 'No product available to review')

    const review = await prisma.review.create({
      data: {
        productId: product.id,
        orderId: order.id,
        authorName,
        rating,
        body,
        photoUrl: photoUrl || null,
        status: 'PENDING',
      },
    })

    res.status(201).json({
      review: {
        id: review.id,
        status: review.status,
        message: 'Thank you — your review will appear after moderation.',
      },
    })
  } catch (err) {
    next(err)
  }
})

/* ——— Admin moderation ——— */

const adminListQuery = z.object({
  status: z.enum(['PENDING', 'PUBLISHED', 'HIDDEN']).optional(),
})

router.get('/admin/reviews', requireAdmin, async (req, res, next) => {
  try {
    const parsed = adminListQuery.safeParse(req.query)
    if (!parsed.success) throw new ApiError(400, 'Invalid query parameters')

    const reviews = await prisma.review.findMany({
      where: parsed.data.status ? { status: parsed.data.status } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        product: { select: { name: true, slug: true } },
        order: { select: { reference: true, customerName: true, email: true } },
      },
    })
    res.json({ reviews })
  } catch (err) {
    next(err)
  }
})

const moderateSchema = z.object({
  status: z.enum(['PENDING', 'PUBLISHED', 'HIDDEN']).optional(),
  sellerResponse: z.string().trim().max(1000).optional().or(z.literal('')),
})

router.patch('/admin/reviews/:id', requireAdmin, validateBody(moderateSchema), async (req, res, next) => {
  try {
    const { status, sellerResponse } = req.body
    const existing = await prisma.review.findUnique({ where: { id: req.params.id } })
    if (!existing) throw new ApiError(404, 'Review not found')

    const review = await prisma.review.update({
      where: { id: existing.id },
      data: {
        ...(status ? { status } : {}),
        ...(sellerResponse !== undefined ? { sellerResponse: sellerResponse || null } : {}),
      },
    })
    res.json({ review })
  } catch (err) {
    next(err)
  }
})

export default router
