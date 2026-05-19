import type { Locale } from '../i18n/locale'

export type FaqItem = {
  question: string
  answer: string
}

const SERVICES_FAQ_EN: FaqItem[] = [
  {
    question: 'Do you work full-time or freelance?',
    answer:
      'Both. I am open to embedded full-time roles focused on architecture and technical leadership, and to fixed-scope freelance engagements such as audits, MVP builds, and database migrations.',
  },
  {
    question: 'What technologies do you specialize in?',
    answer:
      'Rust, TypeScript, distributed systems, AWS, PostgreSQL, Redis, Docker, and Kubernetes. I design backends for throughput, reliability, and operability.',
  },
  {
    question: 'How does the architecture audit engagement work?',
    answer:
      'After a free discovery call, a fixed-scope 1–2 week review of topology, bottlenecks, and risks—with actionable recommendations and a prioritized plan. Custom quote based on your stack and scope.',
  },
  {
    question: 'What is included in an MVP build?',
    answer:
      'A production-oriented MVP delivered in 4–8 weeks: core backend APIs, infrastructure baseline, CI/CD, and documentation. Ideal for validating product-market fit with solid foundations.',
  },
  {
    question: 'Are you available for remote work?',
    answer:
      'Yes. I work with distributed teams across time zones and integrate into existing engineering cultures remotely.',
  },
]

const SERVICES_FAQ_ES: FaqItem[] = [
  {
    question: '¿Trabajas tiempo completo o freelance?',
    answer:
      'Ambos. Roles full-time embebidos en arquitectura y liderazgo técnico, y proyectos freelance acotados: auditorías, MVPs y migraciones de bases de datos.',
  },
  {
    question: '¿En qué tecnologías te especializas?',
    answer:
      'Rust, TypeScript, sistemas distribuidos, AWS, PostgreSQL, Redis, Docker y Kubernetes. Diseño backends orientados a rendimiento, fiabilidad y operación.',
  },
  {
    question: '¿Cómo funciona la auditoría de arquitectura?',
    answer:
      'Tras una reunión de discovery gratuita, revisión acotada de 1–2 semanas de topología, cuellos de botella y riesgos, con recomendaciones y plan priorizado. Cotización a medida según stack y alcance.',
  },
  {
    question: '¿Qué incluye un MVP?',
    answer:
      'MVP orientado a producción en 4–8 semanas: APIs backend, baseline de infraestructura, CI/CD y documentación. Ideal para validar producto con bases sólidas.',
  },
  {
    question: '¿Trabajas en remoto?',
    answer:
      'Sí. Colaboro con equipos distribuidos en distintas zonas horarias e integro culturas de ingeniería existentes de forma remota.',
  },
]

const CONTACT_FAQ_EN: FaqItem[] = [
  {
    question: 'What is the best way to reach you for full-time roles?',
    answer:
      'WhatsApp is fastest for a first ping; email works too (jgarciacar20@gmail.com) with the role, team context, and timeline. Email replies in about 2 business days.',
  },
  {
    question: 'How do I propose a freelance project?',
    answer:
      'Send a short note on WhatsApp or email with what you are trying to solve. We book a free discovery call to understand the problem—no cost, no commitment. After that, a fixed scope or timeline if it makes sense.',
  },
  {
    question: 'When can you start?',
    answer: 'Full-time remote and selective freelance from June 2026.',
  },
]

const CONTACT_FAQ_ES: FaqItem[] = [
  {
    question: '¿Cuál es la mejor forma de contactarte para roles full-time?',
    answer:
      'WhatsApp suele ser lo más rápido para el primer mensaje; también email (jgarciacar20@gmail.com) con el rol, contexto del equipo y plazos. Por correo, respuesta en ~2 días hábiles.',
  },
  {
    question: '¿Cómo propongo un proyecto freelance?',
    answer:
      'Un mensaje breve por WhatsApp o email con qué necesitas resolver. Agendamos una reunión de discovery sin costo para entender el tema—sin compromiso. Después, alcance y plazos si encaja.',
  },
  {
    question: '¿Cuándo puedes empezar?',
    answer: 'Full-time remoto y freelance selectivo desde junio de 2026.',
  },
]

export function getServicesFaq(locale: Locale): FaqItem[] {
  return locale === 'es' ? SERVICES_FAQ_ES : SERVICES_FAQ_EN
}

export function getContactFaq(locale: Locale): FaqItem[] {
  return locale === 'es' ? CONTACT_FAQ_ES : CONTACT_FAQ_EN
}

/** @deprecated Use getServicesFaq(locale) */
export const SERVICES_FAQ = SERVICES_FAQ_EN

/** @deprecated Use getContactFaq(locale) */
export const CONTACT_FAQ = CONTACT_FAQ_EN
