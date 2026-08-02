import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Fail loudly instead of silently picking a different port — a
    // different port breaks Google Sign-In (its allowed origins are
    // locked to http://localhost:5173).
    strictPort: true,
  },
})