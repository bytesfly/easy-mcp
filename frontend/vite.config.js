import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath, URL } from 'node:url'

/**
 * Normalize the base path for Vite and Vue Router
 * - Ensures it starts with '/' if not empty
 * - Ensures it ends with '/' if not empty
 * - Returns '/' if the value is empty or '/'
 */
function normalizeBase(base) {
  if (!base || base === '/') {
    return '/'
  }
  
  // Remove leading and trailing slashes, then add them back properly
  const normalized = base.trim().replace(/^\/+|\/+$/g, '')
  
  if (!normalized) {
    return '/'
  }
  
  return `/${normalized}/`
}

// Get base path from environment variable PROXY_PREFIX_PATH, default to '/'
const basePath = normalizeBase(process.env.PROXY_PREFIX_PATH || '')

// https://vitejs.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  worker: {
    format: 'es',
  },
})
