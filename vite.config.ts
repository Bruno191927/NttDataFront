import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { env } from 'process'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': env
  },
  server:{
    host: true,
    strictPort: true,
    port: 8080
  }
})
