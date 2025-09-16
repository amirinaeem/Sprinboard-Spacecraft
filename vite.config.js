import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Sprinboard-Spacecraft/',  // must match your repo name exactly
})
