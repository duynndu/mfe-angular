import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import federation from '@originjs/vite-plugin-federation'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    federation({
      filename: 'remoteEntry.js',
      name: 'VueEntry',
      exposes: {
        './VueEntry': './src/vue-entry.js',
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'shared/helpers': path.resolve(__dirname, '../shared/helpers'),
      'shared/types': path.resolve(__dirname, '../shared/types'),
      'shared/utils': path.resolve(__dirname, '../shared/utils'),
      'shared/constants': path.resolve(__dirname, '../shared/constants'),
    },
  },

  build: {
    outDir: path.resolve(__dirname, '../../dist/template-editor'),
    target: 'esnext'
  }
})
