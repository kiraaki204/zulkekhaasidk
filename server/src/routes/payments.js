import { Router } from 'express'
import { config } from '../lib/config.js'

const router = Router()

/**
 * Public payment availability — lets checkout enable digital methods
 * only after a gateway is wired and PAYMENTS_ONLINE_ENABLED=true.
 */
router.get('/payments/config', (_req, res) => {
  res.json({
    onlineEnabled: config.payments.onlineEnabled,
    methods: {
      COD: { enabled: true },
      CARD: { enabled: config.payments.onlineEnabled },
      JAZZCASH: { enabled: config.payments.onlineEnabled },
      EASYPAISA: { enabled: config.payments.onlineEnabled },
    },
  })
})

export default router
