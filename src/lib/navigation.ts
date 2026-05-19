import { ROUTES } from './routes'

export const SITE_VERSION = 'v1.0.0 // INITIALIZED'

export const SITE_STATS = {
  loc: 'LOC: 45,902',
  uptime: 'UPTIME: 99.99%',
} as const

/** Shared site navigation — labels via i18n `nav.*` keys. */
export const SITE_NAV = [
  { labelKey: 'nav.home', to: ROUTES.home, end: true as const },
  { labelKey: 'nav.projects', to: ROUTES.deploySystems, end: true as const },
  { labelKey: 'nav.experience', to: ROUTES.experience, end: true as const },
  { labelKey: 'nav.services', to: ROUTES.services, end: true as const },
  { labelKey: 'nav.contact', to: ROUTES.contact, end: true as const },
  { labelKey: 'nav.blog', to: ROUTES.blog },
] as const

export type SiteNavItem = (typeof SITE_NAV)[number]
