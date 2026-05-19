export const PRICING_OFFERS = [
  {
    id: 'DISCOVERY',
    name: 'Project discovery call',
    description:
      'Video call to understand goals, constraints, and context before any quote. No cost, no commitment.',
    price: '0',
    currency: 'USD',
    priceNote: 'Free',
  },
  {
    id: 'ARCH_AUDIT',
    name: 'Architecture Audit',
    description:
      'Fixed-scope review of system topology, bottlenecks, and risk areas with a prioritized remediation plan.',
    price: '0',
    currency: 'USD',
    priceNote: 'Custom quote after discovery',
  },
  {
    id: 'MVP_BUILD',
    name: 'MVP Build',
    description:
      'Production-oriented MVP with core APIs, infrastructure baseline, CI/CD, and documentation.',
    price: '0',
    currency: 'USD',
    priceNote: 'Custom quote after discovery',
  },
  {
    id: 'DB_MIGRATION',
    name: 'Database Migration',
    description:
      'Schema redesign and migration execution for PostgreSQL and distributed data stores.',
    price: '0',
    currency: 'USD',
    priceNote: 'Custom quote after discovery',
  },
] as const
