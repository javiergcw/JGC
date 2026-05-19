import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import { ROUTES } from '../../lib/routes'
import YakkaDiagram from './YakkaDiagram'

function SpecRow({
  label,
  value,
  border = false,
}: {
  label: string
  value: string
  border?: boolean
}) {
  return (
    <div className={`grid grid-cols-2 ${border ? 'border-b border-border-dark' : ''}`}>
      <div className="p-3 border-r border-border-dark font-mono-ui text-xs text-steel uppercase">
        {label}
      </div>
      <div className="p-3 font-mono-ui text-sm text-concrete">{value}</div>
    </div>
  )
}

export default function DeployFeaturedCard() {
  const { t } = useLanguage()
  const p = 'deploy.yakkaSport'

  const outcomes = [t(`${p}.outcome1`), t(`${p}.outcome2`), t(`${p}.outcome3`)]

  return (
    <article
      id="deploy-yakka-sport"
      className="group w-full border border-border-dark bg-void hover:border-primary transition-none overflow-hidden scroll-mt-24"
    >
      <div className="h-6 border-b border-border-dark bg-asphalt flex items-center justify-between px-4 font-mono-ui text-[10px] text-steel">
        <span>{t(`${p}.status`)}</span>
        <span>{t(`${p}.badge`)}</span>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-6 md:p-8 flex flex-col border-b lg:border-b-0 lg:border-r border-border-dark">
          <p className="font-mono-ui text-[10px] text-primary uppercase tracking-widest mb-3">
            {t('deploy.featuredLabel')}
          </p>
          <h2 className="text-2xl font-bold font-display text-concrete mb-2 tracking-tight group-hover:text-primary">
            {t(`${p}.title`)}
          </h2>
          <p className="font-mono-ui text-xs text-steel mb-4">{t(`${p}.role`)}</p>
          <p className="font-mono-ui text-[10px] text-primary uppercase tracking-widest mb-2">
            {t('deploy.theJobLabel')}
          </p>
          <p className="text-concrete/90 font-body text-sm mb-5 leading-relaxed">{t(`${p}.theJob`)}</p>
          <p className="text-concrete/80 font-body text-base mb-6 leading-relaxed">
            {t(`${p}.description`)}
          </p>
          <div className="mb-8 border border-border-dark bg-asphalt p-4">
            <p className="font-mono-ui text-[10px] text-steel uppercase tracking-widest mb-3">
              {t('deploy.outcomesLabel')}
            </p>
            <ul className="space-y-2 list-none">
              {outcomes.map((line) => (
                <li key={line} className="flex gap-2 font-mono-ui text-xs text-concrete">
                  <span className="text-primary shrink-0">&gt;</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8 border border-border-dark bg-asphalt">
            <SpecRow label={t('common.stack')} value={t(`${p}.stack`)} />
            <SpecRow label={t('common.infrastructure')} value={t(`${p}.infrastructure`)} border />
            <SpecRow label={t('common.dataStore')} value={t(`${p}.dataStore`)} border />
            <SpecRow label={t('common.delivery')} value={t(`${p}.delivery`)} />
          </div>
          <Link
            to={ROUTES.contact}
            className="inline-flex items-center gap-2 border border-primary text-primary px-4 py-2 font-display text-sm font-bold uppercase hover:bg-primary hover:text-void transition-none w-fit"
          >
            {t('deploy.ctaSimilar')}
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="hidden md:flex w-full lg:w-1/2 bg-asphalt p-8 items-center justify-center relative min-h-[400px]">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          <div className="relative w-full max-w-sm aspect-square text-concrete">
            <YakkaDiagram />
          </div>
          <p className="absolute bottom-4 right-4 font-mono-ui text-[10px] text-steel">
            {t('deploy.figure')}
          </p>
        </div>
      </div>
    </article>
  )
}
