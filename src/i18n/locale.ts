export type Locale = 'en' | 'es'

export const LOCALE_STORAGE_KEY = 'jgc-locale'
export const LOCALE_CONSENT_KEY = 'jgc-locale-consent'

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'ENG',
  es: 'ESP',
}

export function isLocale(value: string | null): value is Locale {
  return value === 'en' || value === 'es'
}

export function readStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  return isLocale(stored) ? stored : null
}

export function hasLocaleConsent(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(LOCALE_CONSENT_KEY) === '1'
}

export function persistLocale(locale: Locale) {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  localStorage.setItem(LOCALE_CONSENT_KEY, '1')
}

export function localeToHtmlLang(locale: Locale) {
  return locale === 'es' ? 'es' : 'en'
}

export function localeToOgLocale(locale: Locale) {
  return locale === 'es' ? 'es_CO' : 'en_US'
}
