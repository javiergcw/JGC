import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import { ROUTES } from '../../lib/routes'
import SaeEcosystemDiagram from './SaeEcosystemDiagram'

const IMPACT_KEYS = ['impact1', 'impact2', 'impact3', 'impact4'] as const
const MODULE_KEYS = ['module1', 'module2', 'module3'] as const

export default function DeploySaeSuite() {
  const { t } = useLanguage()
  const p = 'deploy.sae'

  return (
    <article
      id="deploy-sae"
      className="group w-full border border-border-dark bg-void hover:border-primary transition-none overflow-hidden scroll-mt-24"
    >
      <div className="h-6 border-b border-border-dark bg-asphalt flex items-center justify-between px-4 font-mono-ui text-[10px] text-steel">
        <span>{t(`${p}.status`)}</span>
        <span>{t(`${p}.badge`)}</span>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-[42%] p-6 md:p-8 flex flex-col border-b lg:border-b-0 lg:border-r border-border-dark">
          <p className="font-mono-ui text-[10px] text-primary uppercase tracking-widest mb-3">
            {t('deploy.clientLabel')}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold font-display text-concrete mb-2 tracking-tight group-hover:text-primary leading-tight">
            {t(`${p}.title`)}
          </h2>
          <p className="font-mono-ui text-xs text-steel mb-5">{t(`${p}.role`)}</p>
          <p className="text-concrete font-body text-sm md:text-base mb-6 leading-snug max-w-md">
            {t(`${p}.hook`)}
          </p>

          <div className="grid grid-cols-2 gap-2 mb-5">
            {IMPACT_KEYS.map((key) => (
              <div
                key={key}
                className="border border-border-dark bg-asphalt p-3 group-hover:border-primary/40 transition-none"
              >
                <p className="font-display text-lg md:text-xl font-bold text-primary leading-none mb-1">
                  {t(`${p}.${key}Stat`)}
                </p>
                <p className="font-mono-ui text-[9px] text-steel uppercase tracking-wide leading-snug">
                  {t(`${p}.${key}Label`)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {MODULE_KEYS.map((key) => (
              <span
                key={key}
                className="font-mono-ui text-[9px] uppercase tracking-wider border border-border-dark px-2 py-1 text-concrete/90"
              >
                {t(`${p}.${key}`)}
              </span>
            ))}
          </div>

          <p className="font-mono-ui text-[10px] text-muted mb-6">
            {t(`${p}.stack`)} · {t(`${p}.delivery`)}
          </p>

          <Link
            to={ROUTES.contact}
            className="inline-flex items-center gap-2 border border-primary text-primary px-4 py-2 font-display text-sm font-bold uppercase hover:bg-primary hover:text-void transition-none w-fit"
          >
            {t('deploy.ctaSimilar')}
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="flex w-full lg:w-[58%] bg-asphalt p-6 md:p-10 items-center justify-center relative min-h-[320px] md:min-h-[420px]">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          <div className="relative w-full max-w-md aspect-[4/3] text-concrete">
            <SaeEcosystemDiagram />
          </div>
          <p className="absolute bottom-4 right-4 font-mono-ui text-[10px] text-steel">
            {t('deploy.figureSae')}
          </p>
        </div>
      </div>
    </article>
  )
}
