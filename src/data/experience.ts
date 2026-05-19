/** Role order on /experience. Copy lives in i18n (`experience.roles.*`). */
export type ExperienceRoleId =
  | 'yakka-sport'
  | 'makerstech'
  | 'yakka-labour'
  | 'nuevo-colegio'
  | 'freelance-metroapp'
  | 'zencillo'

export type DeployCaseAnchor = 'yakka-sport' | 'sae' | 'yakka-labour'

export type ExperienceRoleMeta = {
  id: ExperienceRoleId
  /** i18n key suffix: experience.roles.{roleKey} */
  roleKey: string
  featured: boolean
  deployAnchor?: DeployCaseAnchor
}

export const EXPERIENCE_ROLES: ExperienceRoleMeta[] = [
  { id: 'yakka-sport', roleKey: 'yakkaSport', featured: true, deployAnchor: 'yakka-sport' },
  { id: 'makerstech', roleKey: 'makerstech', featured: true, deployAnchor: 'sae' },
  { id: 'yakka-labour', roleKey: 'yakkaLabour', featured: true, deployAnchor: 'yakka-labour' },
  { id: 'nuevo-colegio', roleKey: 'nuevoColegio', featured: false },
  { id: 'freelance-metroapp', roleKey: 'metroapp', featured: false },
  { id: 'zencillo', roleKey: 'zencillo', featured: false },
]

export const FEATURED_ROLE_COUNT = EXPERIENCE_ROLES.filter((r) => r.featured).length

export type EducationId = 'systems-engineering' | 'software-technologist'
export type CertificationId = 'platzi-flutter-advanced' | 'platzi-flutter'

export const EDUCATION_IDS: EducationId[] = ['systems-engineering', 'software-technologist']
export const CERTIFICATION_IDS: CertificationId[] = [
  'platzi-flutter-advanced',
  'platzi-flutter',
]

export const CERTIFICATION_URLS: Record<CertificationId, string> = {
  'platzi-flutter-advanced': 'https://platzi.com/cursos/flutter-avanzado/',
  'platzi-flutter': 'https://platzi.com/cursos/flutter/',
}

export const CERTIFICATION_CREDENTIAL_IDS: Record<CertificationId, string> = {
  'platzi-flutter-advanced': '00135245-f6ed-4014-a28a-f8b3cc604afb',
  'platzi-flutter': 'fc6eeae9-d1dc-42ce-be96-764ee0c09049',
}

/** Problem-oriented groups (JTBD), aligned with home stack framing. */
export const EXPERIENCE_PROBLEM_GROUPS = [
  { id: 'product', titleKey: 'experience.problems.productTitle', itemKeys: ['p1', 'p2', 'p3'] },
  { id: 'backend', titleKey: 'experience.problems.backendTitle', itemKeys: ['b1', 'b2', 'b3'] },
  { id: 'leadership', titleKey: 'experience.problems.leadershipTitle', itemKeys: ['l1', 'l2', 'l3'] },
  { id: 'delivery', titleKey: 'experience.problems.deliveryTitle', itemKeys: ['d1', 'd2', 'd3'] },
] as const
