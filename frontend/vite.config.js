import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries (cached independently)
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Heavy third-party libraries in separate chunks
          'chart-vendor': ['recharts'],
          'animation-vendor': ['framer-motion'],
        }
      }
    },
  }
})
