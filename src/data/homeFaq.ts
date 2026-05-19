import type { Locale } from '../i18n/locale'
import type { FaqItem } from './faq'

const HOME_FAQ_EN: FaqItem[] = [
  {
    question: 'Full-time, freelance, or both?',
    answer:
      'No active full-time role now. Freelance (audits, MVPs, migrations) is open immediately; remote full-time from Jun 2026. Details on Services.',
  },
  {
    question: 'Remote or in-person?',
    answer:
      'Remote by default. In-person only in Barranquilla or Santa Marta, Colombia, when it helps the project.',
  },
]

const HOME_FAQ_ES: FaqItem[] = [
  {
    question: '¿Full-time, freelance o ambos?',
    answer:
      'Sin rol full-time activo ahora. Freelance (auditorías, MVPs, migraciones) ya; full-time remoto desde jun 2026. Detalle en Servicios.',
  },
  {
    question: '¿Remoto o presencial?',
    answer:
      'Remoto por defecto. Presencial solo en Barranquilla o Santa Marta (Colombia) si aporta al proyecto.',
  },
]

export function getHomeFaq(locale: Locale): FaqItem[] {
  return locale === 'es' ? HOME_FAQ_ES : HOME_FAQ_EN
}
