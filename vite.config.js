import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs'
import { join, resolve } from 'path'

function copyPublicAssets() {
  return {
    name: 'copy-public-assets',
    closeBundle() {
      const publicDir = resolve(__dirname, 'public')
      const distDir = resolve(__dirname, 'dist')
      if (!existsSync(publicDir)) return
      if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true })

      function copyDir(src, dest) {
        if (!existsSync(src)) return
        if (!existsSync(dest)) mkdirSync(dest, { recursive: true })
        const entries = readdirSync(src)
        for (const entry of entries) {
          const srcPath = join(src, entry)
          const destPath = join(dest, entry)
          if (statSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath)
          } else {
            copyFileSync(srcPath, destPath)
          }
        }
      }
      copyDir(publicDir, distDir)
    }
  }
}

export default defineConfig({
  plugins: [react(), copyPublicAssets()],
  base: '/',
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
