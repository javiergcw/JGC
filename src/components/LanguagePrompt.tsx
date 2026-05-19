import { useLanguage } from '../i18n/LanguageContext'
import { LOCALE_LABELS, type Locale } from '../i18n/locale'

type LanguagePromptProps = {
  onSelect: (locale: Locale) => void
}

export default function LanguagePrompt({ onSelect }: LanguagePromptProps) {
  const { t } = useLanguage()

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background-dark/90 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-prompt-title"
    >
      <div className="w-full max-w-md border border-border-color bg-surface p-6 md:p-8 shadow-none">
        <p className="font-mono text-[10px] text-primary uppercase tracking-widest mb-4">
          &gt; {t('language.promptInit')}
        </p>
        <h2
          id="language-prompt-title"
          className="font-display text-xl md:text-2xl font-bold text-text-main uppercase tracking-tight mb-2"
        >
          {t('language.promptTitle')}
        </h2>
        <p className="font-display text-lg text-muted mb-4">
          {t('language.promptSubtitle')}
        </p>
        <p className="font-mono text-xs text-muted mb-8">{t('language.promptHint')}</p>
        <div className="flex gap-3">
          {(['en', 'es'] as Locale[]).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => onSelect(code)}
              className="flex-1 mono-text text-sm border border-border-color py-3 uppercase tracking-widest text-text-main hover:border-primary hover:text-primary transition-none"
            >
              {code === 'en' ? t('language.english') : t('language.spanish')}{' '}
              <span className="text-muted">({LOCALE_LABELS[code]})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
