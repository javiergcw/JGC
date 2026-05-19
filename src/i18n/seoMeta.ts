import type { PageMeta } from '../lib/seo'
import { pageTitle, metaDescription } from '../lib/site'
import { KEYWORDS } from '../lib/keywords'
import { ROUTES } from '../lib/routes'
/** Spanish page titles & descriptions for document head. */
export const PAGE_META_ES: Record<string, PageMeta> = {
  [ROUTES.home]: {
    path: ROUTES.home,
    title: pageTitle('Ingeniero Full-Stack — Sistemas en producción'),
    description: metaDescription(
      'Contrata a Javier Garcia C. para móvil, web y APIs en producción. Sin rol full-time activo — freelance ya y full-time remoto desde jun 2026. Flutter, Golang, Next.js, PostgreSQL.',
    ),
    keywords: [...KEYWORDS.global, ...KEYWORDS.home],
    ogType: 'website',
    h1: 'Sistemas en producción para equipos que escalan móvil, web y APIs',
  },
  [ROUTES.services]: {
    path: ROUTES.services,
    title: pageTitle('Servicios de ingeniería y consultoría'),
    description: metaDescription(
      'Ingeniería full-time y consultoría freelance: auditorías, MVPs y migraciones. Reunión de discovery gratuita; cotización a medida. Remoto.',
    ),
    keywords: [...KEYWORDS.global, ...KEYWORDS.services],
    ogType: 'website',
    h1: 'Servicios de ingeniería',
  },
  [ROUTES.experience]: {
    path: ROUTES.experience,
    title: pageTitle('Experiencia profesional'),
    description: metaDescription(
      'Disponible: sin rol full-time activo (Yakka Sport entregado jul 2026). Freelance auditorías y MVPs ya; full-time remoto desde jun 2026. Trayectoria JTBD — Yakka, MAKERSTECH/SAE, Australia y Colombia.',
    ),
    keywords: [...KEYWORDS.global, ...KEYWORDS.experience, ...KEYWORDS.education],
    ogType: 'website',
    h1: 'Experiencia profesional',
  },
  [ROUTES.contact]: {
    path: ROUTES.contact,
    title: pageTitle('Contacto — Contratar ingeniero'),
    description: metaDescription(
      'Contacto full-time (desde jun 2026) o freelance. WhatsApp +57 302 415 8002 para respuesta rápida; email para contratación y proyectos.',
    ),
    keywords: [...KEYWORDS.global, ...KEYWORDS.contact],
    ogType: 'website',
    h1: 'Contacto',
  },
  [ROUTES.deploySystems]: {
    path: ROUTES.deploySystems,
    title: pageTitle('Portafolio de sistemas desplegados'),
    description: metaDescription(
      'Portafolio: Yakka Sport Jobs (Flutter flavors, Next.js, Golang, PostgreSQL), Yakka Labour móvil y suite Actibox para Activos por Colombia (SAE) — MAKERSTECH.',
    ),
    keywords: [...KEYWORDS.global, ...KEYWORDS.projects],
    ogType: 'website',
    h1: 'Sistemas desplegados',
  },
  [ROUTES.blog]: {
    path: ROUTES.blog,
    title: pageTitle('Blog técnico'),
    description: metaDescription(
      'Artículos sobre arquitectura de software, sistemas distribuidos y backend de alto rendimiento.',
    ),
    keywords: [...KEYWORDS.global, ...KEYWORDS.blog],
    ogType: 'website',
    h1: 'Blog técnico',
  },
}
