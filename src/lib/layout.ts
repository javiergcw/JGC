import { matchPath } from 'react-router-dom'
import { ROUTES } from './routes'

export type LayoutVariant = 'sidebar' | 'topnav'

export type PageLayoutConfig = {
  variant: LayoutVariant
  blogEnd?: boolean
  homeTheme?: boolean
  className?: string
  mainClassName?: string
}

const PAGE_LAYOUT: Record<string, PageLayoutConfig> = {
  [ROUTES.home]: {
    variant: 'sidebar',
    homeTheme: true,
    mainClassName: 'home-main border-t lg:border-t-0 border-[#e5e5e5] min-h-screen',
  },
  [ROUTES.deploySystems]: {
    variant: 'topnav',
    className:
      'deploy-theme bg-void text-concrete selection:bg-primary selection:text-void font-display',
  },
  [ROUTES.experience]: {
    variant: 'sidebar',
    className: 'experience-page brutalist-grid antialiased',
    mainClassName: 'overflow-y-auto bg-background-dark p-6 md:p-12',
  },
  [ROUTES.services]: {
    variant: 'topnav',
    className:
      'services-theme min-h-screen flex flex-col antialiased bg-[#0A0A0A] text-[#E0E0E0]',
  },
  [ROUTES.contact]: {
    variant: 'sidebar',
    className: 'article-theme antialiased',
    mainClassName: 'bg-background-dark text-text-main font-body',
  },
  [ROUTES.blog]: {
    variant: 'sidebar',
    blogEnd: true,
    className:
      'blog-theme font-body antialiased overflow-x-hidden selection:bg-primary selection:text-background-dark',
    mainClassName: 'flex flex-col relative',
  },
}

const BLOG_POST_LAYOUT: PageLayoutConfig = {
  variant: 'sidebar',
  blogEnd: true,
  className:
    'article-theme font-body antialiased selection:bg-primary selection:text-background-dark',
  mainClassName: 'overflow-y-auto bg-background-dark text-text-main leading-relaxed',
}

export function getPageLayoutConfig(pathname: string): PageLayoutConfig {
  if (matchPath({ path: ROUTES.blogPost, end: true }, pathname)) {
    return BLOG_POST_LAYOUT
  }

  for (const [path, config] of Object.entries(PAGE_LAYOUT)) {
    if (matchPath({ path, end: true }, pathname)) {
      return config
    }
  }

  return { variant: 'sidebar' }
}
