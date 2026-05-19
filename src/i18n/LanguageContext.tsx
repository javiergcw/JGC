import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import LanguagePrompt from '../components/LanguagePrompt'
import {
  hasLocaleConsent,
  localeToHtmlLang,
  persistLocale,
  readStoredLocale,
  type Locale,
} from './locale'
import { translate } from './translations'

type LanguageContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  showPrompt: boolean
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readStoredLocale() ?? 'en')
  const [showPrompt, setShowPrompt] = useState(
    () => typeof window !== 'undefined' && !hasLocaleConsent(),
  )

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    persistLocale(next)
    document.documentElement.lang = localeToHtmlLang(next)
    setShowPrompt(false)
  }, [])

  useEffect(() => {
    document.documentElement.lang = localeToHtmlLang(locale)
  }, [locale])

  const t = useCallback((key: string) => translate(locale, key), [locale])

  const value = useMemo(
    () => ({ locale, setLocale, t, showPrompt }),
    [locale, setLocale, t, showPrompt],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
      {showPrompt && <LanguagePrompt onSelect={setLocale} />}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}
