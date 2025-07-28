// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://kumaryeri.com', // Mutlaka eklenmeli!
  trailingSlash: 'never', 
  output: 'static', 
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
})
