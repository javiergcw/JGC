export const ROUTES = {
  home: '/',
  deploySystems: '/deploy-systems',
  experience: '/experience',
  services: '/services',
  contact: '/contact',
  blog: '/blog',
  blogPost: '/blog/:slug',
} as const

export function blogPostPath(slug: string) {
  return `/blog/${slug}`
}

export type DeployCaseId = 'yakka-sport' | 'sae' | 'yakka-labour'

export function deployCasePath(caseId: DeployCaseId) {
  return `${ROUTES.deploySystems}#deploy-${caseId}`
}
