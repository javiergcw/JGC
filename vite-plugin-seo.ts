import type { Plugin } from 'vite'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { getSitemapEntries, LEGACY_REDIRECTS } from './src/lib/sitemap'

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

async function generateOgImages(publicDir: string, outDir: string) {
  const svgPath = resolve(publicDir, 'og-image.svg')
  if (!existsSync(svgPath)) return

  try {
    const sharp = (await import('sharp')).default
    const svgBuffer = readFileSync(svgPath)

    await sharp(svgBuffer)
      .resize(1200, 630, { fit: 'cover' })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(resolve(outDir, 'og-image.jpg'))

    await sharp(svgBuffer)
      .resize(1200, 630, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(resolve(outDir, 'og-image.webp'))

    await sharp(svgBuffer)
      .resize(1200, 630, { fit: 'cover' })
      .png()
      .toFile(resolve(outDir, 'og-image.png'))
  } catch (err) {
    console.warn('[seo-files] Could not generate og-image JPG/WebP:', err)
  }
}

export function seoFilesPlugin(siteUrl: string): Plugin {
  const base = siteUrl.replace(/\/$/, '')

  return {
    name: 'seo-files',
    apply: 'build',
    async closeBundle() {
      const outDir = resolve(process.cwd(), 'dist')
      const publicDir = resolve(process.cwd(), 'public')
      const buildDate = new Date().toISOString().slice(0, 10)
      const entries = getSitemapEntries()

      const urls = entries
        .map((entry) => {
          const lastmod = entry.lastmod ?? buildDate
          return `  <url>
    <loc>${escapeXml(`${base}${entry.path}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(2)}</priority>
  </url>`
        })
        .join('\n')

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

      const redirectRules = Object.entries(LEGACY_REDIRECTS)
        .map(([from, to]) => `${from} ${to} 301`)
        .join('\n')

      const robots = `# Generated at build — https://www.robotstxt.org/
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${base}/sitemap.xml
`

      writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap, 'utf-8')
      writeFileSync(resolve(outDir, 'robots.txt'), robots, 'utf-8')
      writeFileSync(resolve(outDir, '_redirects'), `${redirectRules}\n`, 'utf-8')

      await generateOgImages(publicDir, outDir)
      await generateOgImages(publicDir, publicDir)
    },
  }
}
