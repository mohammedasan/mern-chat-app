import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8001', // KEEP for local
        changeOrigin: true,
      }
    }
  },
  define: {
    'process.env': {} // Prevent Vite from crashing due to process.env in frontend
  }
})
