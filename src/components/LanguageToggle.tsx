import { LOCALE_LABELS, type Locale } from '../i18n/locale'
import { useLanguage } from '../i18n/LanguageContext'

type LanguageToggleProps = {
  className?: string
  compact?: boolean
}

export default function LanguageToggle({
  className = '',
  compact = false,
}: LanguageToggleProps) {
  const { locale, setLocale, t } = useLanguage()

  function buttonClass(active: boolean) {
    return [
      'px-2 py-1 transition-none uppercase tracking-widest',
      active
        ? 'bg-primary text-background-dark'
        : 'text-muted hover:text-primary',
    ].join(' ')
  }

  return (
    <div
      className={`inline-flex items-center border border-border-color font-mono ${
        compact ? 'text-[9px]' : 'text-[10px]'
      } ${className}`}
      role="group"
      aria-label={t('language.toggleLabel')}
    >
      {(['en', 'es'] as Locale[]).map((code, index) => (
        <span key={code} className="flex items-center">
          {index > 0 && (
            <span className="text-border-color px-0.5 select-none" aria-hidden>
              |
            </span>
          )}
          <button
            type="button"
            className={buttonClass(locale === code)}
            onClick={() => setLocale(code)}
            aria-pressed={locale === code}
          >
            {LOCALE_LABELS[code]}
          </button>
        </span>
      ))}
    </div>
  )
}
