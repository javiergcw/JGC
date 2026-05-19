import { useMemo } from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import {
  buildArticleJsonLd,
  buildBlogJsonLd,
  resolvePageMeta,
} from '../lib/seo'
import { getContactFaq, getServicesFaq } from '../data/faq'
import {
  buildContactPageSchema,
  buildExperiencePageSchema,
  buildHomePageSchema,
  buildServicesPageSchema,
} from '../lib/schema'
import { ROUTES } from '../lib/routes'

export default function DocumentHead() {
  const { pathname } = useLocation()
  const { locale } = useLanguage()

  const meta = useMemo(() => resolvePageMeta(pathname, locale), [pathname, locale])

  const jsonLd = useMemo(() => {
    if (pathname === ROUTES.home) {
      return buildHomePageSchema(meta.description)
    }
    if (pathname === ROUTES.services) {
      return buildServicesPageSchema(meta.description, getServicesFaq(locale))
    }
    if (pathname === ROUTES.experience) {
      return buildExperiencePageSchema(meta.description, locale)
    }
    if (pathname === ROUTES.contact) {
      return buildContactPageSchema(meta.description, getContactFaq(locale))
    }
    if (pathname === ROUTES.blog) return buildBlogJsonLd()

    const match = matchPath({ path: ROUTES.blogPost, end: true }, pathname)
    if (match?.params.slug) {
      return buildArticleJsonLd(meta, match.params.slug)
    }

    return buildHomePageSchema(meta.description)
  }, [pathname, meta, locale])

  usePageMeta(meta, jsonLd)
  return null
}
