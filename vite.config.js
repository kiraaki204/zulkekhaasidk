import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss()],
    server: {
      // The Arena preview proxies the dev server through a per-session host —
      // accept any Host header so the preview iframe can reach it.
      allowedHosts: true,
      proxy: {
        '/api': {
          target: env.VITE_API_PROXY || 'http://localhost:4000',
          changeOrigin: true,
        },
      },
    },
  }
})
