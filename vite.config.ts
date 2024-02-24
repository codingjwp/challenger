import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: [
      {find: "@", replacement: path.resolve(__dirname, "src")},
      {find: "@components", replacement: path.resolve(__dirname, "src/components")},
      {find: "@modals", replacement: path.resolve(__dirname, "src/components/modals")},
      {find: "@ui", replacement: path.resolve(__dirname, "src/components/ui")},
      {find: "@pages", replacement: path.resolve(__dirname, "src/pages")},
      {find: "@stores", replacement: path.resolve(__dirname, "src/stores")},
      {find: "@util", replacement: path.resolve(__dirname, "src/util")},
      {find: "@assets", replacement: path.resolve(__dirname, "src/assets")},
      {find: "@hooks", replacement: path.resolve(__dirname, "src/hooks")},
    ]
  }
})
