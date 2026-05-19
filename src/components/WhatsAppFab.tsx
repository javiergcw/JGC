import { useLanguage } from '../i18n/LanguageContext'
import { whatsappUrl } from '../lib/whatsapp'

export default function WhatsAppFab() {
  const { locale, t } = useLanguage()
  const prefill =
    locale === 'es'
      ? 'Hola Javier — quiero hablar sobre un proyecto.'
      : 'Hi Javier — I would like to discuss a project.'

  return (
    <a
      href={whatsappUrl(prefill)}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-5 z-[70] flex items-center gap-2 border-2 border-primary bg-[#0A0A0A] text-primary px-3 py-2.5 shadow-[4px_4px_0_0_var(--color-primary)] hover:bg-primary hover:text-[#0A0A0A] hover:shadow-none transition-none"
      aria-label={t('whatsapp.fabLabel')}
    >
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
      </span>
      <span className="material-symbols-outlined text-xl leading-none" aria-hidden>
        chat
      </span>
      <span className="font-mono text-[10px] uppercase tracking-widest hidden sm:inline">
        {t('whatsapp.fabTag')}
      </span>
    </a>
  )
}
