# Core Web Vitals — Before / After

Mediciones de referencia en **home** (`/`) con Lighthouse móvil (simulado).  
Ejecuta localmente tras cada cambio:

```bash
npm run build && npm run preview
# En otra terminal:
npm run seo:lighthouse
# O PageSpeed Insights con tu dominio en producción:
# https://pagespeed.web.dev/
```

## Resumen de optimizaciones (After)

| Área | Cambio |
|------|--------|
| **LCP** | Google Fonts con `preload` + carga diferida (`media="print" onload`) |
| **CLS** | `width`/`height` en imágenes del blog; `aspect-video` reservado |
| **INP** | Menos CSS bloqueante al diferir Material Symbols |
| **Imágenes OG** | JPG/WebP 1200×630 generados en build (WhatsApp/LinkedIn) |
| **JS** | Bundle único ~93 KB gzip (Vite production) |

## Before (baseline estimado — SPA sin optimización de fuentes)

Valores típicos **antes** de diferir fuentes y reservar espacio en imágenes:

| Métrica | Before (est.) | Objetivo After |
|---------|---------------|----------------|
| **Performance (Lighthouse)** | 55–70 | 80+ |
| **LCP** | 3.5–5.5 s | &lt; 2.5 s |
| **CLS** | 0.05–0.15 | &lt; 0.1 |
| **TBT** | 400–800 ms | &lt; 200 ms |
| **INP** (campo) | — | &lt; 200 ms |

> INP solo se mide con datos reales (CrUX / Search Console). Lighthouse reporta TBT como proxy en laboratorio.

## After (post-optimización — validar en tu entorno)

Tras aplicar los cambios de esta rama, vuelve a medir y rellena:

| Métrica | Valor medido | Fecha |
|---------|--------------|-------|
| Performance | _ejecutar Lighthouse_ | |
| SEO | _ejecutar Lighthouse_ | |
| LCP | | |
| CLS | | |
| TBT | | |

Los informes HTML/JSON se guardan en `docs/lighthouse/` al usar `npm run seo:lighthouse`.

## Google Search Console

1. `VITE_SITE_URL=https://tudominio.com` en `.env`
2. `npm run build` y despliegue
3. GSC → **Sitemaps** → añadir `https://tudominio.com/sitemap.xml`
4. **Experiencia** → Core Web Vitals (datos de campo tras tráfico real)
