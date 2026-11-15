import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma.js'
import { ApiError } from '../middleware/errors.js'
import { validateBody } from '../middleware/validate.js'
import {
  createSession,
  destroySession,
  setSessionCookie,
  clearSessionCookie,
  requireAdmin,
  verifyPassword,
} from '../middleware/auth.js'
import { config } from '../lib/config.js'

const router = Router()

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1).max(200),
})

router.post(
  '/auth/login',
  validateBody(loginSchema),
  async (req, res, next) => {
    try {
      const { email, password } = req.body
      const admin = await prisma.adminUser.findUnique({ where: { email: email.toLowerCase() } })
      if (!admin || !(await verifyPassword(admin.passwordHash, password))) {
        throw new ApiError(401, 'Invalid email or password')
      }
      const { token, expiresAt } = await createSession(admin.id)
      setSessionCookie(res, token, expiresAt)
      res.json({
        admin: { id: admin.id, email: admin.email, displayName: admin.displayName, role: admin.role },
      })
    } catch (err) {
      next(err)
    }
  },
)

router.post('/auth/logout', async (req, res, next) => {
  try {
    await destroySession(req.cookies?.[config.session.cookieName])
    clearSessionCookie(res)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.get('/auth/me', requireAdmin, (req, res) => {
  res.json({ admin: req.admin })
})

export default router
