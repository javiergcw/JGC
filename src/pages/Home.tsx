import { Link } from 'react-router-dom'
import HomeFaqCompact from '../components/home/HomeFaqCompact'
import InternalLinksHub from '../components/InternalLinksHub'
import { getHomeFaq } from '../data/homeFaq'
import { useLanguage } from '../i18n/LanguageContext'
import { ROUTES } from '../lib/routes'
import { SITE } from '../lib/site'

const STACK_ITEMS = [
  { icon: 'phone_android', name: 'Flutter' },
  { icon: 'code', name: 'Golang' },
  { icon: 'web', name: 'Next.js' },
  { icon: 'database', name: 'PostgreSQL' },
  { icon: 'deployed_code', name: 'Docker' },
  { icon: 'hub', name: 'NestJS' },
  { icon: 'auto_awesome', name: 'AI-First' },
  { icon: 'psychology', name: 'JTBD' },
] as const

export default function Home() {
  const { locale, t } = useLanguage()
  const homeFaq = getHomeFaq(locale)

  return (
    <>
      <div
        className="home-status-bar fixed z-40 flex justify-end pointer-events-none max-lg:top-[5.25rem] max-lg:left-0 max-lg:right-0 sm:max-lg:top-16 lg:top-0 lg:left-[25%] lg:right-0"
        role="status"
        aria-live="polite"
      >
        <div className="pointer-events-auto p-4 brutal-border border-t-0 border-r-0 border-l border-b bg-[#0A0A0A] flex items-center gap-3 w-auto max-w-[calc(100vw-1rem)]">
          <div className="w-2 h-2 bg-accent-green rounded-full animate-blink shrink-0" />
          <p className="font-mono text-xs sm:text-sm text-text-main whitespace-nowrap overflow-hidden text-ellipsis">
            {t('availability.statusBar')}
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-10 lg:p-16 pt-14 flex flex-col gap-16 lg:gap-20 relative z-0 max-w-4xl">
        <section aria-labelledby="hero-heading">
          <h1
            id="hero-heading"
            className="home-hero-title font-display font-bold text-4xl sm:text-5xl lg:text-[64px] leading-tight sm:leading-none tracking-[-0.05em] uppercase"
          >
            <span className="block">{t('home.hero1')}</span>
            <span className="block">{t('home.hero2')}</span>
            <span className="block">{t('home.hero3')}</span>
          </h1>
          <p className="home-body-text mt-6 font-body max-w-2xl text-base sm:text-lg leading-relaxed">
            {t('home.heroBody')}
          </p>

          <aside
            className="home-jtbd brutal-border border-[#e5e5e5] bg-[#fafafa] p-4 sm:p-5 mt-6 max-w-2xl"
            aria-labelledby="jtbd-heading"
          >
            <p
              id="jtbd-heading"
              className="font-mono text-[10px] text-primary uppercase tracking-widest mb-2"
            >
              {t('home.jtbdLabel')}
            </p>
            <p className="home-body-text font-body text-sm sm:text-base leading-relaxed text-[#404040]">
              {t('home.jtbdBody')}
            </p>
          </aside>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <Link
              to={ROUTES.contact}
              className="bg-primary text-[#0A0A0A] font-bold px-5 py-2.5 uppercase tracking-wider hover:bg-white transition-none brutal-border border-primary font-mono text-xs"
            >
              {t('home.ctaFullTime')}
            </Link>
            <Link
              to={ROUTES.services}
              className="brutal-border border-[#e5e5e5] px-5 py-2.5 font-mono text-xs text-[#0a0a0a] uppercase tracking-wider hover:border-primary hover:text-primary transition-none bg-white"
            >
              {t('home.ctaFreelance')}
            </Link>
            <Link
              to={ROUTES.deploySystems}
              className="font-mono text-xs text-[#737373] uppercase hover:text-primary transition-none py-2.5"
            >
              {t('home.ctaProjects')} →
            </Link>
          </div>

          <nav
            className="flex flex-wrap gap-3 mt-5 font-mono text-[10px] text-[#737373] uppercase tracking-widest"
            aria-label="Social profiles"
          >
            <a
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              {t('home.socialLinkedin')}
            </a>
            <span aria-hidden>·</span>
            <a
              href={SITE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              {t('home.socialGithub')}
            </a>
            <span aria-hidden>·</span>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              {t('home.socialInstagram')}
            </a>
          </nav>
        </section>

        <section className="max-w-3xl w-full" aria-label="Profile terminal">
          <div className="home-terminal brutal-border bg-[#141414] flex flex-col w-full">
            <div className="brutal-border border-x-0 border-t-0 border-b flex items-center gap-2 px-4 py-2 bg-[#0A0A0A]">
              <div className="w-3 h-3 brutal-border bg-border-color" />
              <div className="w-3 h-3 brutal-border bg-border-color" />
              <div className="w-3 h-3 brutal-border bg-border-color" />
              <span className="font-mono text-xs text-muted ml-auto">root@system:~</span>
            </div>
            <div className="p-6 font-mono text-sm text-text-main leading-relaxed">
              <p>
                <span className="text-primary">{t('home.terminalPrompt')}</span> {t('home.terminalFile')}
              </p>
              <p className="mt-2 text-muted">{'{'}</p>
              <p className="pl-4 text-muted">
                &quot;role&quot;:{' '}
                <span className="text-accent-green">&quot;{t('home.terminalRole')}&quot;</span>,
              </p>
              <p className="pl-4 text-muted">
                &quot;experience&quot;:{' '}
                <span className="text-accent-green">&quot;{t('home.terminalExperience')}&quot;</span>,
              </p>
              <p className="pl-4 text-muted">
                &quot;focus&quot;: <span className="text-accent-green">{t('home.terminalFocus')}</span>,
              </p>
              <p className="pl-4 text-muted">
                &quot;philosophy&quot;:{' '}
                <span className="text-accent-green">
                  &quot;{t('home.terminalPhilosophy')}&quot;
                </span>
                ,
              </p>
              <p className="pl-4 text-muted">
                &quot;teams&quot;:{' '}
                <span className="text-accent-green">&quot;{t('home.terminalTeams')}&quot;</span>,
              </p>
              <p className="pl-4 text-muted">
                &quot;current_status&quot;:{' '}
                <span className="text-accent-green">&quot;{t('availability.terminalLine')}&quot;</span>
              </p>
              <p className="text-muted">{'}'}</p>
              <p className="mt-4">
                <span className="text-primary">{t('home.terminalPrompt')}</span>{' '}
                <span className="animate-blink">_</span>
              </p>
            </div>
          </div>
        </section>

        <section className="w-full" aria-labelledby="stack-heading">
          <div className="flex items-center gap-4 mb-6">
            <h2
              id="stack-heading"
              className="home-section-title font-display font-bold text-xl tracking-[-0.05em] uppercase"
            >
              {t('home.stackTitle')}
            </h2>
            <div className="h-px bg-[#e5e5e5] flex-1" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-[-1px] border border-[#e5e5e5] border-b-0 border-r-0">
            {STACK_ITEMS.map((item) => (
              <div
                key={item.name}
                className="home-stack-item stack-item brutal-border border-t-0 border-l-0 p-6 flex flex-col gap-4 cursor-crosshair group"
              >
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                <div className="font-mono text-sm font-bold uppercase">{item.name}</div>
              </div>
            ))}
          </div>
        </section>

        <InternalLinksHub tone="light" />

        <HomeFaqCompact title={t('home.faqTitle')} items={homeFaq} />

        <div
          id="contact"
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4"
        >
          <p className="home-end-label font-mono text-xs">{t('home.endLabel')}</p>
          <Link
            to={ROUTES.contact}
            className="bg-primary text-[#0A0A0A] font-bold px-6 py-3 uppercase tracking-wider hover:bg-white transition-none brutal-border border-primary text-center font-mono text-sm"
          >
            {t('home.ctaContact')}
          </Link>
        </div>
      </div>
    </>
  )
}
