import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/afterschool-app/' : '/',
  plugins: [vue()],
})
