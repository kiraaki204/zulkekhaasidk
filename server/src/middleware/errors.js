export class ApiError extends Error {
  constructor(status, message, details) {
    super(message)
    this.status = status
    this.details = details
  }
}

export function notFound(_req, res) {
  res.status(404).json({ error: { message: 'Not found' } })
}

// Express detects 4-arity error handlers
export function errorHandler(err, _req, res, _next) {
  if (err instanceof ApiError) {
    res.status(err.status).json({ error: { message: err.message, details: err.details } })
    return
  }
  if (err?.type === 'entity.parse.failed') {
    res.status(400).json({ error: { message: 'Invalid JSON body' } })
    return
  }
  // Framework errors (e.g. CORS) may carry a status — honor it without leaking details.
  const status = Number.isInteger(err?.status) ? err.status : 500
  if (status >= 500) console.error('[api]', err)
  res.status(status).json({
    error: { message: status >= 500 ? 'Internal server error' : 'Request rejected' },
  })
}
