import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { ROUTES } from '../lib/routes'

const HUB_LINKS = [
  {
    to: ROUTES.services,
    titleKey: 'home.exploreServices',
    textKey: 'home.exploreServicesText',
  },
  {
    to: ROUTES.experience,
    titleKey: 'home.exploreExperience',
    textKey: 'home.exploreExperienceText',
  },
  {
    to: ROUTES.contact,
    titleKey: 'home.exploreContact',
    textKey: 'home.exploreContactText',
  },
  {
    to: ROUTES.deploySystems,
    titleKey: 'home.exploreProjects',
    textKey: 'home.exploreProjectsText',
  },
] as const

type InternalLinksHubProps = {
  tone?: 'dark' | 'light'
  hideServices?: boolean
}

export default function InternalLinksHub({
  tone = 'dark',
  hideServices = false,
}: InternalLinksHubProps) {
  const { t } = useLanguage()
  const isLight = tone === 'light'
  const links = hideServices
    ? HUB_LINKS.filter((link) => link.to !== ROUTES.services)
    : HUB_LINKS

  return (
    <section
      className="w-full"
      aria-labelledby="internal-links-heading"
    >
      <h2
        id="internal-links-heading"
        className={`font-display font-bold text-xl tracking-tight uppercase mb-6 ${
          isLight ? 'home-section-title' : 'text-text-main'
        }`}
      >
        {t('home.hubHeading')}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`brutal-border p-3 hover:border-primary group transition-none ${
              isLight ? 'home-hub-card' : 'bg-surface/30'
            }`}
          >
            <h3 className="font-mono text-xs font-bold text-primary group-hover:underline">
              &gt; {t(link.titleKey)}
            </h3>
            <p className="font-mono text-[10px] text-muted mt-1 leading-snug hidden sm:block">
              {t(link.textKey)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
