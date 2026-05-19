import { KEYWORDS } from './keywords'

const rawUrl = import.meta.env.VITE_SITE_URL ?? ''
const siteUrl = rawUrl.replace(/\/$/, '')

export const SITE = {
  name: import.meta.env.VITE_SITE_NAME ?? 'SYSTEM.ROOT',
  titleSuffix: 'Full-Stack Engineer & Systems Architect',
  description:
    import.meta.env.VITE_SITE_DESCRIPTION ??
    'Full-stack engineer and systems architect specializing in distributed systems, Rust, TypeScript, AWS, and PostgreSQL. Available for full-time roles and freelance consulting worldwide.',
  url: siteUrl || undefined,
  locale: 'en_US',
  language: 'en',
  author: {
    name: import.meta.env.VITE_AUTHOR_NAME ?? 'Javier Garcia C.',
    title: 'Full-Stack Engineer / Infrastructure Architect',
  },
  business: {
    legalName: import.meta.env.VITE_BUSINESS_NAME ?? 'SYSTEM.ROOT Engineering',
    locality: import.meta.env.VITE_BUSINESS_LOCALITY ?? 'Remote',
    country: import.meta.env.VITE_BUSINESS_COUNTRY ?? 'US',
    areaServed: import.meta.env.VITE_BUSINESS_AREA_SERVED ?? 'Worldwide',
    geo: {
      '@type': 'GeoCoordinates' as const,
      latitude: import.meta.env.VITE_BUSINESS_LAT ?? '40.4168',
      longitude: import.meta.env.VITE_BUSINESS_LNG ?? '-3.7038',
    },
  },
  contact: {
    hire: import.meta.env.VITE_CONTACT_HIRE ?? 'jgarciacar20@gmail.com',
    contract: import.meta.env.VITE_CONTACT_CONTRACT ?? 'jgarciacar20@gmail.com',
  },
  keywords: KEYWORDS.global,
  social: {
    github:
      import.meta.env.VITE_SOCIAL_GITHUB ?? 'https://github.com/javiergcw',
    linkedin:
      import.meta.env.VITE_SOCIAL_LINKEDIN ??
      'https://www.linkedin.com/in/javier-garcia-carrillo-301360240/',
    instagram:
      import.meta.env.VITE_SOCIAL_INSTAGRAM ?? 'https://www.instagram.com/javigcez/',
  },
  og: {
    image: '/og-image.jpg',
    imageWidth: 1200,
    imageHeight: 630,
    imageType: 'image/jpeg',
    twitterHandle: import.meta.env.VITE_TWITTER_HANDLE,
  },
} as const

/** Normalize paths: no trailing slash (except root). */
export function normalizePath(path: string) {
  if (!path || path === '/') return '/'
  return path.replace(/\/+$/, '') || '/'
}

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path
  const withSlash = path.startsWith('/') ? path : `/${path}`
  const normalized = normalizePath(withSlash)
  if (SITE.url) return `${SITE.url}${normalized}`
  return normalized
}

/** SEO title: primary keyword first, brand last (≤ ~60 chars target). */
export function pageTitle(primary: string) {
  return `${primary} | ${SITE.name}`
}

export function metaDescription(text: string, max = 160) {
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).trimEnd()}…`
}
