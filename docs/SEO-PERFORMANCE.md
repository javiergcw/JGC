# SEO & Core Web Vitals — Guía de implementación

> **Stack:** Vite + React (SPA). El sitemap se genera en **build**, no en runtime como Next.js.

## 6. Sitemap dinámico y robots.txt

- **Origen de datos:** `src/lib/sitemap.ts` → `getSitemapEntries()` (rutas estáticas + posts del blog con `lastmod` real).
- **Generación:** plugin `vite-plugin-seo.ts` en cada `npm run build` → `dist/sitemap.xml` y `dist/robots.txt`.
- **Google Search Console:**
  1. Despliega con `VITE_SITE_URL=https://tudominio.com` en `.env`
  2. Verifica la propiedad del dominio
  3. Envía: `https://tudominio.com/sitemap.xml`

## 7–8. URLs canónicas, redirecciones y normalización

| Mecanismo | Implementación |
|-----------|----------------|
| **Canonical** | `usePageMeta` → `<link rel="canonical">` por ruta (sin trailing slash) |
| **301 hosting** | `public/_redirects` (Netlify) + `vercel.json` + `dist/_redirects` en build |
| **301 cliente** | `legacyRedirectRoutes()` en React Router |
| **Trailing slash** | `TrailingSlashNormalizer` elimina `/` final |
| **URLs legacy** | `/servicios` → `/services`, `/contacto` → `/contact`, `/projects` → `/deploy-systems`, etc. |

## 9–10. Core Web Vitals (optimizaciones aplicadas)

| Métrica | Cambio | Impacto esperado |
|---------|--------|------------------|
| **LCP** | Fuentes con `preload` + carga no bloqueante (`media="print" onload`) | Menos bloqueo del render |
| **CLS** | `width`/`height` en imágenes del blog; `aspect-video` | Reserva de espacio |
| **INP** | Menos CSS bloqueante al diferir Material Symbols | Mejor interactividad inicial |

### Medir before/after

```bash
# Después de build
npm run seo:lighthouse
# o manualmente:
npm run build && npm run preview
# PageSpeed: https://pagespeed.web.dev/
# Lighthouse en Chrome DevTools → Lighthouse
```

Guarda capturas en `docs/lighthouse/` para comparar iteraciones.  
Plantilla before/after: [`docs/lighthouse/METRICS.md`](./lighthouse/METRICS.md).

## 11–12. Imágenes

- **OG social:** `og-image.jpg` / `.webp` / `.png` generados en build (1200×630) desde `public/og-image.svg` vía **sharp**.
- **Blog:** `loading="lazy"`, `decoding="async"`, dimensiones explícitas, `alt` descriptivo.
- **Recomendación:** sustituir diagrama externo por asset local en WebP en `public/images/`.

## 13. Tarjetas sociales (WhatsApp, LinkedIn, X)

Meta tags por ruta vía `usePageMeta`:

- `og:title`, `og:description`, `og:image` (1200×630 JPG)
- `og:image:width`, `og:image:height`, `og:image:type`, `og:image:secure_url`
- `twitter:card=summary_large_image`

**Probar:**

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- WhatsApp: pegar URL en un chat (usa OG de Facebook)

## 14–15. Arquitectura de información y enlaces internos

```
/ (Inicio)
├── /services (Servicios)
├── /experience (Experiencia + Formación)
├── /contact (Contacto)
├── /deploy-systems (Proyectos)
└── /blog → /blog/:slug
```

- **Componentes:** `InternalLinksHub`, `SiteFooter` con grid de enlaces.
- **Enlaces cruzados:** Experience ↔ Services ↔ Contact en cada página clave.

## Variables de entorno

Copia `.env.example` → `.env` antes de producción.
