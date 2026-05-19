import { useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { localeToHtmlLang, localeToOgLocale } from '../i18n/locale'
import type { PageMeta } from '../lib/seo'
import { absoluteUrl, SITE } from '../lib/site'

function setMeta(
  attribute: 'name' | 'property',
  key: string,
  content: string | undefined,
) {
  if (!content) return
  const selector = `meta[${attribute}="${key}"]`
  let el = document.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attribute, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string | undefined, attrs?: Record<string, string>) {
  if (!href) return
  const selector =
    rel === 'canonical'
      ? 'link[rel="canonical"]'
      : `link[rel="${rel}"]`
  let el = document.querySelector<HTMLLinkElement>(selector)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, v)
    }
  }
}

function setJsonLd(id: string, data: object | null) {
  const selector = `script[data-seo-jsonld="${id}"]`
  const existing = document.querySelector(selector)
  if (!data) {
    existing?.remove()
    return
  }
  const el = existing ?? document.createElement('script')
  el.setAttribute('type', 'application/ld+json')
  el.setAttribute('data-seo-jsonld', id)
  el.textContent = JSON.stringify(data)
  if (!existing) document.head.appendChild(el)
}

export function usePageMeta(meta: PageMeta, jsonLd?: object | null) {
  const { locale } = useLanguage()

  useEffect(() => {
    const canonical = absoluteUrl(meta.path)
    const ogImagePath = meta.ogImage ?? SITE.og.image
    const ogImage = absoluteUrl(ogImagePath)
    const isExternalOg = /^https?:\/\//i.test(ogImagePath)
    const keywords = meta.keywords?.join(', ') ?? SITE.keywords.join(', ')

    document.title = meta.title
    document.documentElement.lang = localeToHtmlLang(locale)

    setMeta('name', 'description', meta.description)
    setMeta('name', 'keywords', keywords)
    setMeta('name', 'author', SITE.author.name)
    setMeta('name', 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow')
    setMeta('name', 'googlebot', meta.noindex ? 'noindex, nofollow' : 'index, follow')

    setLink('canonical', canonical)

    // Open Graph — WhatsApp, LinkedIn, Facebook
    setMeta('property', 'og:title', meta.title)
    setMeta('property', 'og:description', meta.description)
    setMeta('property', 'og:type', meta.ogType ?? 'website')
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:site_name', SITE.name)
    setMeta('property', 'og:locale', localeToOgLocale(locale))
    setMeta('property', 'og:image', ogImage)
    setMeta('property', 'og:image:secure_url', ogImage.startsWith('https') ? ogImage : undefined)
    if (!isExternalOg) {
      setMeta('property', 'og:image:width', String(SITE.og.imageWidth))
      setMeta('property', 'og:image:height', String(SITE.og.imageHeight))
      setMeta('property', 'og:image:type', SITE.og.imageType)
    }
    setMeta(
      'property',
      'og:image:alt',
      meta.ogType === 'article' ? meta.title : `${SITE.name} — ${SITE.titleSuffix}`,
    )

    // Twitter / X
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', meta.title)
    setMeta('name', 'twitter:description', meta.description)
    setMeta('name', 'twitter:image', ogImage)
    setMeta('name', 'twitter:image:alt', `${SITE.name} — ${SITE.titleSuffix}`)
    if (SITE.og.twitterHandle) {
      setMeta('name', 'twitter:site', SITE.og.twitterHandle)
      setMeta('name', 'twitter:creator', SITE.og.twitterHandle)
    }

    if (meta.article) {
      setMeta('property', 'article:published_time', meta.article.publishedTime)
      setMeta(
        'property',
        'article:modified_time',
        meta.article.modifiedTime ?? meta.article.publishedTime,
      )
      setMeta('property', 'article:section', meta.article.section)
    }

    setJsonLd('page', jsonLd ?? null)
  }, [meta, jsonLd, locale])
}
