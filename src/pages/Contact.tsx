import { Link } from 'react-router-dom'
import FaqSection from '../components/FaqSection'
import { getContactFaq } from '../data/faq'
import { useLanguage } from '../i18n/LanguageContext'
import { ROUTES } from '../lib/routes'
import { SITE } from '../lib/site'
import { whatsappUrl } from '../lib/whatsapp'

export default function Contact() {
  const { locale, t } = useLanguage()
  const contactFaq = getContactFaq(locale)
  const waPrefill =
    locale === 'es'
      ? 'Hola Javier — quiero hablar sobre un proyecto.'
      : 'Hi Javier — I would like to discuss a project.'

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 pb-28">
      <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted mb-8">
        <Link to={ROUTES.home} className="hover:text-primary nav-item">
          {t('common.home')}
        </Link>
        <span className="mx-2 text-border-dark">/</span>
        <span className="text-text-main">{t('contact.breadcrumb')}</span>
      </nav>

      <header className="mb-10 border-b border-border-dark pb-8">
        <p className="font-mono text-xs text-primary uppercase tracking-widest mb-3">
          {t('contact.channel')}
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-text-main mb-4">
          {t('contact.title')}
        </h1>
        <p className="text-muted text-lg leading-relaxed max-w-2xl mb-6">{t('contact.body')}</p>

        <aside
          className="border border-border-dark bg-surface/80 p-4 sm:p-5 max-w-2xl"
          aria-labelledby="contact-jtbd-heading"
        >
          <p
            id="contact-jtbd-heading"
            className="font-mono text-[10px] text-primary uppercase tracking-widest mb-2"
          >
            {t('contact.jtbdLabel')}
          </p>
          <p className="font-body text-sm text-text-main/85 leading-relaxed">
            {t('contact.jtbdBody')}
          </p>
        </aside>
      </header>

      <section
        className="mb-12 border-2 border-primary p-6 bg-[#0A0A0A]"
        aria-labelledby="whatsapp-heading"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h2
            id="whatsapp-heading"
            className="font-display text-xl text-primary uppercase tracking-tight"
          >
            {t('whatsapp.title')}
          </h2>
          <span className="font-mono text-[9px] text-muted uppercase tracking-widest border border-border-dark px-2 py-0.5">
            {t('whatsapp.tag')}
          </span>
        </div>
        <p className="text-text-main/90 text-sm leading-relaxed mb-2">{t('whatsapp.body')}</p>
        <p className="font-mono text-xs text-primary mb-4">{t('whatsapp.hint')}</p>
        <a
          href={whatsappUrl(waPrefill)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm font-bold text-[#0A0A0A] bg-primary border border-primary px-4 py-3 hover:bg-transparent hover:text-primary transition-none uppercase tracking-wider"
        >
          <span className="material-symbols-outlined text-lg">chat</span>
          {t('whatsapp.cta')}
        </a>
        <p className="font-mono text-[10px] text-muted mt-3">{t('whatsapp.display')}</p>
      </section>

      <section className="mb-12" aria-labelledby="hire-heading">
        <h2
          id="hire-heading"
          className="font-display text-xl text-primary border-b border-border-dark pb-2 mb-6 uppercase"
        >
          {t('contact.hireTitle')}
        </h2>
        <p className="text-muted mb-4 leading-relaxed">{t('contact.hireBody')}</p>
        <a
          href={`mailto:${SITE.contact.hire}?subject=Full-Time%20Engineering%20Role`}
          className="inline-flex font-mono text-sm font-bold text-primary border border-primary px-4 py-3 hover:bg-primary hover:text-background-dark transition-none"
        >
          {t('contact.hireCta')} — {SITE.contact.hire}
        </a>
      </section>

      <section className="mb-12" aria-labelledby="contract-heading">
        <h2
          id="contract-heading"
          className="font-display text-xl text-primary border-b border-border-dark pb-2 mb-6 uppercase"
        >
          {t('contact.contractTitle')}
        </h2>
        <p className="text-muted mb-4 leading-relaxed">
          {t('contact.contractBodyBefore')}{' '}
          <Link to={ROUTES.services} className="text-primary hover:underline">
            {t('contact.contractBodyLink')}
          </Link>
          {t('contact.contractBodyAfter')}
        </p>
        <a
          href={`mailto:${SITE.contact.contract}?subject=Freelance%20Scope%20Proposal`}
          className="inline-flex font-mono text-sm font-bold text-primary border border-primary px-4 py-3 hover:bg-primary hover:text-background-dark transition-none"
        >
          {t('contact.contractCta')} — {SITE.contact.contract}
        </a>
        <p className="font-mono text-[10px] text-muted mt-4">{t('contact.emailNote')}</p>
      </section>

      <FaqSection title={t('contact.faqTitle')} items={contactFaq} />
    </div>
  )
}
