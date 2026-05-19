import { matchPath } from 'react-router-dom'
import { BLOG_POSTS, getBlogPost } from '../data/blogPosts'
import { CONTACT_FAQ, SERVICES_FAQ } from '../data/faq'
import { KEYWORDS } from './keywords'
import { blogPostPath, ROUTES } from './routes'
import type { Locale } from '../i18n/locale'
import { PAGE_META_ES } from '../i18n/seoMeta'
import { absoluteUrl, metaDescription, pageTitle, SITE } from './site'

export type PageMeta = {
  title: string
  description: string
  path: string
  keywords?: readonly string[]
  ogType?: 'website' | 'article'
  ogImage?: string
  noindex?: boolean
  h1?: string
  article?: {
    publishedTime: string
    modifiedTime?: string
    section?: string
    tags?: string[]
  }
}

const PAGE_META: Record<string, PageMeta> = {
  [ROUTES.home]: {
    path: ROUTES.home,
    title: pageTitle('Full-Stack Engineer — Production Systems'),
    description: metaDescription(
      'Hire Javier Garcia C. for production mobile, web, and APIs. No active full-time role — open for freelance now and full-time remote from Jun 2026. Flutter, Golang, Next.js, PostgreSQL.',
    ),
    keywords: [...KEYWORDS.global, ...KEYWORDS.home],
    ogType: 'website',
    h1: 'Production systems for teams that need mobile, web, and APIs to scale',
  },
  [ROUTES.services]: {
    path: ROUTES.services,
    title: pageTitle('Engineering Services & Freelance Consulting'),
    description: metaDescription(
      'Full-time engineering and freelance consulting: architecture audits, MVP builds, and database migrations. Free discovery call; custom quotes. Remote worldwide.',
    ),
    keywords: [...KEYWORDS.global, ...KEYWORDS.services],
    ogType: 'website',
    h1: 'Engineering Services — Full-Time & Freelance',
  },
  [ROUTES.experience]: {
    path: ROUTES.experience,
    title: pageTitle('Professional Experience'),
    description: metaDescription(
      'Open for work: no active full-time role (Yakka Sport delivered Jul 2026). Freelance audits & MVPs now; full-time remote from Jun 2026. JTBD timeline — Yakka, MAKERSTECH/SAE, Australia & Colombia.',
    ),
    keywords: [
      ...KEYWORDS.global,
      ...KEYWORDS.experience,
      ...KEYWORDS.education,
    ],
    ogType: 'website',
    h1: 'Professional Experience',
  },
  [ROUTES.contact]: {
    path: ROUTES.contact,
    title: pageTitle('Contact — Hire Full-Stack Engineer'),
    description: metaDescription(
      'Contact for full-time (from Jun 2026) or freelance. WhatsApp +57 302 415 8002 for fast replies; email for hiring and scoped projects.',
    ),
    keywords: [...KEYWORDS.global, ...KEYWORDS.contact],
    ogType: 'website',
    h1: 'Contact & Inquiries',
  },
  [ROUTES.deploySystems]: {
    path: ROUTES.deploySystems,
    title: pageTitle('Deployed Systems — Yakka & SAE'),
    description: metaDescription(
      'Production portfolio: Yakka Sport Jobs multi-brand platform (Flutter flavors, Next.js, Golang, PostgreSQL), Yakka Labour mobile, and Activos por Colombia (SAE) Actibox suite via MAKERSTECH.',
    ),
    keywords: [...KEYWORDS.global, ...KEYWORDS.projects],
    ogType: 'website',
    h1: 'Deployed Systems — production architecture & outcomes',
  },
  [ROUTES.blog]: {
    path: ROUTES.blog,
    title: pageTitle('Technical Engineering Blog'),
    description: metaDescription(
      'Technical articles on distributed caches in Rust, PostgreSQL at scale, microservices architecture, and type-safe APIs with tRPC.',
    ),
    keywords: [...KEYWORDS.global, ...KEYWORDS.blog],
    ogType: 'website',
    h1: 'Technical Logs & Engineering Articles',
  },
}

const BLOG_DESCRIPTIONS: Record<
  string,
  {
    description: string
    articleTitle: string
    tags: string[]
    ogImage?: string
  }
> = {
  'architecting-distributed-caches-in-rust': {
    articleTitle: 'Building a Distributed Cache in Rust',
    description:
      'How we built a custom high-throughput distributed cache in Rust with consistent hashing, gossip protocol, slab allocation, and Kubernetes deployment.',
    tags: ['Rust', 'Distributed Systems', 'Architecture', 'Caching'],
    ogImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCGeICtLu0zOoT_KAdxWhBx-2LiYpwwniijmT5JHpUk2Ln6Vp1nZT2_zmvFg7YbAjIpWxm4cACRR-mTUtNxlYMdGFIxFabgvK0QlDpPihm1W4sue9NXIoOSDYYmJ6JnLm5yTssrRbQTaKjhU0QpPPPqLyLrr1HpCVzRvQnxycPd9RHWU3owAKAF2wmeZi-pr1OF5qVxBuHV4mJVPoEHdkZOkfHuFfmlLxJqwZJ30q0R-4TmC7ld7rrbUFCwZTlGMevTsaES-4w43_hQ',
  },
  'postgresql-partitioning-at-scale': {
    articleTitle: 'PostgreSQL Partitioning at Scale',
    description:
      'Strategies for PostgreSQL partitioning, schema design, and resolving locking issues under heavy concurrent load.',
    tags: ['PostgreSQL', 'Databases', 'Performance'],
  },
  'why-i-abandoned-microservices': {
    articleTitle: 'Why I Abandoned Microservices (For Now)',
    description:
      'A practical perspective on when microservices help and when a modular monolith is the better engineering trade-off.',
    tags: ['Microservices', 'Architecture', 'Engineering'],
  },
  'building-type-safe-api-trpc': {
    articleTitle: 'Building a Type-Safe API with tRPC',
    description:
      'End-to-end type safety with tRPC: API design patterns for TypeScript backends and React clients.',
    tags: ['TypeScript', 'tRPC', 'API Design'],
  },
}

export function resolvePageMeta(pathname: string, locale: Locale = 'en'): PageMeta {
  const metaByLocale = locale === 'es' ? PAGE_META_ES : PAGE_META
  const staticMeta = metaByLocale[pathname] ?? PAGE_META[pathname]
  if (staticMeta) return staticMeta

  const match = matchPath({ path: ROUTES.blogPost, end: true }, pathname)
  const slug = match?.params.slug
  if (slug) {
    const post = getBlogPost(slug)
    const extras = BLOG_DESCRIPTIONS[slug]
    if (post && extras) {
      return {
        path: blogPostPath(slug),
        title: pageTitle(extras.articleTitle),
        description: metaDescription(extras.description),
        keywords: [...KEYWORDS.global, ...KEYWORDS.blog, ...extras.tags],
        ogType: 'article',
        noindex: false,
        h1: extras.articleTitle,
        ogImage: extras.ogImage,
        article: {
          publishedTime: post.date,
          section: 'Engineering',
          tags: extras.tags,
        },
      }
    }
  }

  return {
    path: pathname,
    title: pageTitle('Page Not Found'),
    description: SITE.description,
    noindex: true,
  }
}

export { SERVICES_FAQ, CONTACT_FAQ }

export function buildArticleJsonLd(meta: PageMeta, slug: string) {
  const post = getBlogPost(slug)
  const extras = BLOG_DESCRIPTIONS[slug]
  if (!post || !extras) return null

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${absoluteUrl(meta.path)}#article`,
        headline: extras.articleTitle,
        description: meta.description,
        url: absoluteUrl(meta.path),
        datePublished: post.date,
        dateModified: post.date,
        author: {
          '@type': 'Person',
          name: SITE.author.name,
          url: absoluteUrl('/'),
        },
        publisher: { '@id': `${absoluteUrl('/')}#organization` },
        inLanguage: SITE.language,
        keywords: extras.tags.join(', '),
        articleSection: 'Engineering',
        mainEntityOfPage: absoluteUrl(meta.path),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: absoluteUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: absoluteUrl(ROUTES.blog),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: extras.articleTitle,
            item: absoluteUrl(meta.path),
          },
        ],
      },
    ],
  }
}

export function buildBlogJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${absoluteUrl(ROUTES.blog)}#blog`,
    url: absoluteUrl(ROUTES.blog),
    name: `${SITE.name} Technical Logs`,
    description: PAGE_META[ROUTES.blog].description,
    inLanguage: SITE.language,
    author: { '@id': `${absoluteUrl('/')}#person` },
    blogPost: BLOG_POSTS.map((post) => ({
      '@type': 'BlogPosting',
      headline:
        BLOG_DESCRIPTIONS[post.slug]?.articleTitle ?? post.title,
      url: absoluteUrl(blogPostPath(post.slug)),
      datePublished: post.date,
    })),
  }
}

export { getSitemapEntries, LEGACY_REDIRECTS } from './sitemap'
