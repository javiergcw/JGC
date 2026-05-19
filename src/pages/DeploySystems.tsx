import { Link } from 'react-router-dom'
import DeployFeaturedCard from '../components/deploy/DeployFeaturedCard'
import DeployRelatedCard from '../components/deploy/DeployRelatedCard'
import DeploySaeSuite from '../components/deploy/DeploySaeSuite'
import SiteFooter from '../components/SiteFooter'
import { useLanguage } from '../i18n/LanguageContext'
import { ROUTES } from '../lib/routes'

export default function DeploySystems() {
  const { t } = useLanguage()

  return (
    <>
      <div className="w-full border-b border-border-dark px-4 md:px-10 lg:px-40 py-8">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-concrete tracking-tighter text-4xl md:text-5xl font-bold leading-tight min-w-72 font-display">
            {t('deploy.title')}
          </h1>
          <p className="font-body text-concrete/80 text-base md:text-lg mt-4 max-w-3xl leading-relaxed">
            {t('deploy.subtitle')}
          </p>
          <p className="font-mono-ui text-sm text-primary mt-4 max-w-3xl leading-relaxed border-l-2 border-primary pl-4">
            {t('deploy.jtbdLine')}
          </p>
        </div>
      </div>

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-10 lg:px-40 py-12">
        <div className="flex flex-col gap-12">
          <DeployFeaturedCard />
          <DeploySaeSuite />
          <DeployRelatedCard />

          <nav
            className="flex flex-wrap gap-4 pt-4 border-t border-border-dark font-mono-ui text-xs uppercase tracking-widest"
            aria-label="Related pages"
          >
            <Link to={ROUTES.contact} className="text-primary hover:underline">
              {t('deploy.ctaSimilar')}
            </Link>
            <Link to={ROUTES.experience} className="text-steel hover:text-primary">
              {t('deploy.ctaExperience')}
            </Link>
            <Link to={ROUTES.services} className="text-steel hover:text-primary">
              {t('deploy.ctaServices')}
            </Link>
          </nav>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
