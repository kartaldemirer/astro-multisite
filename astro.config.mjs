// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://kumaryeri.com', // Mutlaka eklenmeli!
  trailingSlash: 'ignore', 
  output: 'static', 
  integrations: [sitemap({
      filter: (page) => !page.includes('/admin'), // örnek filtre
    }),],
  vite: {
    plugins: [tailwindcss()]
  }
})
