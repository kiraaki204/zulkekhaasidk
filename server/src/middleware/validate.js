import { ZodError } from 'zod'
import { ApiError } from './errors.js'

export function validateBody(schema) {
  return (req, _res, next) => {
    try {
      req.body = schema.parse(req.body ?? {})
      next()
    } catch (err) {
      if (err instanceof ZodError) {
        next(
          new ApiError(
            400,
            'Validation failed',
            err.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
          ),
        )
        return
      }
      next(err)
    }
  }
}
