import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    // En développement, Vite transmet les appels /api au serveur Express.
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
