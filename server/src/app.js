import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import { config } from './lib/config.js'
import { errorHandler, notFound } from './middleware/errors.js'
import catalogRoutes from './routes/catalog.js'
import orderRoutes from './routes/orders.js'
import authRoutes from './routes/auth.js'
import reviewRoutes from './routes/reviews.js'

export function createApp() {
  const app = express()

  app.set('trust proxy', 1)
  app.use(helmet())
  app.use(
    cors({
      origin(origin, cb) {
        if (!origin || config.clientOrigins.includes(origin)) {
          cb(null, true)
          return
        }
        cb(new Error('Not allowed by CORS'))
      },
      credentials: true,
    }),
  )
  app.use(express.json({ limit: '100kb' }))
  app.use(cookieParser())

  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: { message: 'Too many requests, please try again later' } },
  })
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: { message: 'Too many attempts, please try again later' } },
  })

  app.use('/api', apiLimiter)
  app.use('/api/auth', authLimiter)

  app.use('/api', catalogRoutes)
  app.use('/api', orderRoutes)
  app.use('/api', authRoutes)
  app.use('/api', reviewRoutes)

  app.use(notFound)
  app.use(errorHandler)

  return app
}
