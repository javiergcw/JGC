import { BLOG_POSTS } from '../data/blogPosts'
import { blogPostPath, ROUTES } from './routes'

export type SitemapEntry = {
  path: string
  changefreq: 'weekly' | 'monthly' | 'yearly'
  priority: number
  lastmod?: string
}

const STATIC_ENTRIES: SitemapEntry[] = [
  { path: ROUTES.home, changefreq: 'weekly', priority: 1.0 },
  { path: ROUTES.services, changefreq: 'monthly', priority: 0.9 },
  { path: ROUTES.experience, changefreq: 'monthly', priority: 0.9 },
  { path: ROUTES.contact, changefreq: 'monthly', priority: 0.85 },
  { path: ROUTES.deploySystems, changefreq: 'monthly', priority: 0.8 },
  { path: ROUTES.blog, changefreq: 'weekly', priority: 0.75 },
]

export function getSitemapEntries(): SitemapEntry[] {
  const blogEntries: SitemapEntry[] = BLOG_POSTS.map((post) => ({
    path: blogPostPath(post.slug),
    changefreq: 'monthly' as const,
    priority: post.hasContent ? 0.7 : 0.4,
    lastmod: post.date,
  }))

  return [...STATIC_ENTRIES, ...blogEntries]
}

export const LEGACY_REDIRECTS: Record<string, string> = {
  '/projects': ROUTES.deploySystems,
  '/project': ROUTES.deploySystems,
  '/servicios': ROUTES.services,
  '/servicio': ROUTES.services,
  '/experiencia': ROUTES.experience,
  '/formacion': ROUTES.experience,
  '/formación': ROUTES.experience,
  '/contacto': ROUTES.contact,
  '/about': ROUTES.home,
  '/index.html': ROUTES.home,
}
