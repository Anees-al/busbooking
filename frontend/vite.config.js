import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  
    server: {
    host: '0.0.0.0', // This tells Vite to listen to all devices on your Wi-Fi
    port: 5173
  }
  
})
