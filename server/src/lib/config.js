import 'dotenv/config'

function required(name, fallback) {
  const v = process.env[name] ?? fallback
  if (v === undefined || v === '') {
    throw new Error(`Missing required env var: ${name}`)
  }
  return v
}

export const config = {
  env: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  clientOrigins: (process.env.CLIENT_ORIGINS ?? 'http://localhost:5173')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  session: {
    cookieName: process.env.SESSION_COOKIE_NAME ?? 'zk_session',
    ttlHours: Number(process.env.SESSION_TTL_HOURS ?? 8),
    secure: process.env.NODE_ENV === 'production',
  },
  adminBootstrap: {
    email: process.env.ADMIN_BOOTSTRAP_EMAIL ?? 'admin@zulfekhaas.pk',
    password: process.env.ADMIN_BOOTSTRAP_PASSWORD ?? '',
  },
  shipping: {
    flatRatePkr: Number(process.env.SHIPPING_FLAT_RATE_PKR ?? 250),
    freeOverPkr: Number(process.env.SHIPPING_FREE_OVER_PKR ?? 5000),
  },
  payments: {
    /** Digital gateways (CARD/JAZZCASH/EASYPAISA) stay off until merchant credentials exist. */
    onlineEnabled: process.env.PAYMENTS_ONLINE_ENABLED === 'true',
  },
  databaseUrl: required('DATABASE_URL'),
}
