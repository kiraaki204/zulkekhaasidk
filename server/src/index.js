import { createApp } from './app.js'
import { config } from './lib/config.js'

const app = createApp()

app.listen(config.port, () => {
  console.log(`[zk-api] listening on http://localhost:${config.port} (${config.env})`)
})
