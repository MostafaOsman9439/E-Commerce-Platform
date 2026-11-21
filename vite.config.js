import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/E-Commerce-Platform/',
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    // Fake values so tests never need real keys and never touch your real project.
    env: {
      VITE_SUPABASE_URL: 'http://localhost:54321',
      VITE_SUPABASE_ANON_KEY: 'test-publishable-key',
    },
  },
})
