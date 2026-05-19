import { ROUTES } from '../lib/routes'

export type DeployedProject = {
  id: string
  status: string
  uptime: string
  title: string
  description: string
  specs: {
    stack: string
    infrastructure: string
    dataStore: string
    delivery: string
  }
  tags: string[]
  cta: {
    label: string
    to: string
  }
  diagram: 'yakka' | 'message-queue'
  figureLabel: string
}

export const DEPLOYED_PROJECTS: DeployedProject[] = [
  {
    id: 'yakka',
    status: 'STATUS: DELIVERED',
    uptime: 'MULTI-BRAND',
    title: 'SYS.01 // YAKKA PLATFORM',
    description:
      'Multi-brand product platform with Flutter flavors (mobile + web per marca), a Next.js operations panel, and a Golang API backed by PostgreSQL. Each flavor ships MOBILE and WEB builds—theme, assets, bundle IDs, and environment config—without forking the codebase per client.',
    specs: {
      stack: 'Flutter, Next.js, Golang, PostgreSQL',
      infrastructure: 'Docker, CI/CD per flavor',
      dataStore: 'PostgreSQL',
      delivery: 'White-label / per-brand builds',
    },
    tags: ['Mobile', 'Flavors', 'Full-Stack'],
    cta: {
      label: 'Contact',
      to: ROUTES.contact,
    },
    diagram: 'yakka',
    figureLabel: 'FIG 1.0 - YAKKA TOPOLOGY',
  },
]
