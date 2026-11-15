import { Router } from 'express'
import { prisma } from '../lib/prisma.js'
import { ApiError } from '../middleware/errors.js'

const router = Router()

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), time: new Date().toISOString() })
})

router.get('/products', async (_req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: { active: true },
      orderBy: { createdAt: 'asc' },
    })
    res.json({ products })
  } catch (err) {
    next(err)
  }
})

router.get('/products/:slug', async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({ where: { slug: req.params.slug } })
    if (!product || !product.active) throw new ApiError(404, 'Product not found')
    res.json({ product })
  } catch (err) {
    next(err)
  }
})

export default router
