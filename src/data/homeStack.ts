/** Problem-oriented stack groups for the home page (JTBD framing). */
export const HOME_STACK_GROUPS = [
  {
    id: 'product',
    titleKey: 'home.stackGroup1Title',
    descKey: 'home.stackGroup1Desc',
    items: ['Flutter', 'Next.js', 'App flavors / white-label'],
  },
  {
    id: 'backend',
    titleKey: 'home.stackGroup2Title',
    descKey: 'home.stackGroup2Desc',
    items: ['Golang', 'NestJS', 'PostgreSQL', 'REST APIs'],
  },
  {
    id: 'delivery',
    titleKey: 'home.stackGroup3Title',
    descKey: 'home.stackGroup3Desc',
    items: ['Docker', 'Firebase', 'Supabase', 'CI/CD'],
  },
  {
    id: 'discovery',
    titleKey: 'home.stackGroup4Title',
    descKey: 'home.stackGroup4Desc',
    items: ['Jobs to be Done', 'Lean Startup', 'Business Model Canvas'],
  },
] as const

export const HOME_PROOF_STATS = [
  { valueKey: 'home.proof1Value', labelKey: 'home.proof1Label' },
  { valueKey: 'home.proof2Value', labelKey: 'home.proof2Label' },
  { valueKey: 'home.proof3Value', labelKey: 'home.proof3Label' },
  { valueKey: 'home.proof4Value', labelKey: 'home.proof4Label' },
] as const
