import { useLanguage } from '../../i18n/LanguageContext'

export default function DeployRelatedCard() {
  const { t } = useLanguage()
  const p = 'deploy.yakkaLabour'

  const outcomes = [t(`${p}.outcome1`), t(`${p}.outcome2`), t(`${p}.outcome3`)]

  return (
    <article
      id="deploy-yakka-labour"
      className="w-full border border-border-dark bg-asphalt/50 scroll-mt-24"
    >
      <div className="px-4 py-2 border-b border-border-dark flex justify-between font-mono-ui text-[10px] text-steel">
        <span>{t('deploy.relatedLabel')}</span>
        <span>{t(`${p}.period`)}</span>
      </div>
      <div className="p-6 md:p-8">
        <h2 className="font-display text-xl font-bold text-concrete mb-1">{t(`${p}.title`)}</h2>
        <p className="font-mono-ui text-xs text-primary mb-4">{t(`${p}.role`)}</p>
        <p className="font-body text-sm text-concrete/80 leading-relaxed mb-5">{t(`${p}.summary`)}</p>
        <ul className="space-y-2 list-none mb-6">
          {outcomes.map((line) => (
            <li key={line} className="flex gap-2 font-mono-ui text-xs text-steel">
              <span className="text-primary shrink-0">&gt;</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <p className="font-mono-ui text-[10px] text-muted">{t(`${p}.stack`)}</p>
      </div>
    </article>
  )
}
