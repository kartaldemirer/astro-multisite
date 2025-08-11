// astro.config.mjs
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { siteConfig } from './src/config/kumarpuan_siteConfig.ts'

const urlLastmodMap = new Map(
  Object.values(siteConfig.pages).map(p => [
    p.canonical,
    p.dateModified || p.datePublished
  ])
)

export default defineConfig({
  site: siteConfig.siteMeta.url,
  trailingSlash: 'ignore',
  output: 'static',
  integrations: [
    sitemap({
      entryLimit: 5000,
      filter: (page) => !page.includes('/admin') && !page.includes('/draft') && !page.includes('/preview'),
      serialize: (item) => {
        const lastmod = urlLastmodMap.get(item.url) ?? item.lastmod
        const isHome = item.url === siteConfig.siteMeta.url + '/'
        return {
          ...item,
          lastmod,
          changefreq: isHome ? 'daily' : 'monthly',
          priority:  isHome ? 1.0 : 0.6,
        }
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] }
})
