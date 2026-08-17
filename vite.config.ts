import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Ścieżki relatywne — ta sama paczka działa i w katalogu głównym domeny,
  // i w podkatalogu (GitHub Pages), i z pliku lokalnego.
  base: './',
  plugins: [react(), tailwindcss()],
  server: { port: 5180 },
})
