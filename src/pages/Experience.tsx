import { Link } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter'
import {
  CERTIFICATION_CREDENTIAL_IDS,
  CERTIFICATION_IDS,
  CERTIFICATION_URLS,
  EDUCATION_IDS,
  EXPERIENCE_PROBLEM_GROUPS,
  EXPERIENCE_ROLES,
  type ExperienceRoleMeta,
} from '../data/experience'
import { useLanguage } from '../i18n/LanguageContext'
import { deployCasePath, ROUTES } from '../lib/routes'

const EDUCATION_KEYS: Record<(typeof EDUCATION_IDS)[number], string> = {
  'systems-engineering': 'systemsEngineering',
  'software-technologist': 'softwareTechnologist',
}

const CERT_KEYS: Record<(typeof CERTIFICATION_IDS)[number], string> = {
  'platzi-flutter-advanced': 'platziFlutterAdvanced',
  'platzi-flutter': 'platziFlutter',
}

function OutcomesList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 list-none">
      {items.map((line) => (
        <li key={line} className="flex gap-2 font-mono-ui text-xs text-concrete">
          <span className="text-primary shrink-0">&gt;</span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  )
}

function FeaturedRoleCard({ role }: { role: ExperienceRoleMeta }) {
  const { t } = useLanguage()
  const base = `experience.roles.${role.roleKey}`

  const outcomes = [
    t(`${base}.outcome1`),
    t(`${base}.outcome2`),
    t(`${base}.outcome3`),
  ]

  const caseLabel =
    role.roleKey === 'makerstech'
      ? t(`${base}.caseLabel`)
      : t('experience.viewCase')

  return (
    <div className="relative mb-16 pl-4 md:pl-8 lg:pl-12">
      <div className="hidden md:block timeline-node past lg:left-[-6px] md:left-[-6px]" />
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-8 mb-4 lg:absolute lg:right-[calc(100%-24px)] lg:top-0 lg:text-right lg:w-48 lg:mb-0 lg:pr-8">
        <span className="mono-text text-sm block text-muted">{t(`${base}.period`)}</span>
      </div>
      <div className="bg-surface border border-border-color p-6 interactive-border transition-all duration-0">
        <h2 className="heading text-xl md:text-2xl text-text-main mb-1">{t(`${base}.title`)}</h2>
        <p className="mono-text text-muted text-sm">{t(`${base}.company`)}</p>
        <p className="mono-text text-xs text-muted mt-1 mb-1">{t(`${base}.meta`)}</p>
        <p className="mono-text text-xs text-primary mb-5">{t(`${base}.stack`)}</p>

        <p className="mono-text text-[10px] text-primary uppercase tracking-widest mb-2">
          {t('experience.theJobLabel')}
        </p>
        <p className="font-body text-sm text-text-main/90 leading-relaxed mb-5">{t(`${base}.theJob`)}</p>

        <div className="mb-5 border border-border-color bg-background-dark/40 p-4">
          <p className="mono-text text-[10px] text-muted uppercase tracking-widest mb-3">
            {t('experience.outcomesLabel')}
          </p>
          <OutcomesList items={outcomes} />
        </div>

        {role.deployAnchor && (
          <Link
            to={deployCasePath(role.deployAnchor)}
            className="mono-text text-xs text-primary hover:underline uppercase tracking-widest inline-flex items-center gap-1"
          >
            &gt; {caseLabel} →
          </Link>
        )}
      </div>
    </div>
  )
}

function CompactRoleCard({ role }: { role: ExperienceRoleMeta }) {
  const { t } = useLanguage()
  const base = `experience.roles.${role.roleKey}`

  return (
    <div className="border border-border-color bg-surface/80 p-4 interactive-border transition-all duration-0">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
        <div>
          <h3 className="heading text-base text-text-main">{t(`${base}.title`)}</h3>
          <p className="mono-text text-xs text-muted">{t(`${base}.company`)}</p>
        </div>
        <span className="mono-text text-[10px] text-muted shrink-0">{t(`${base}.period`)}</span>
      </div>
      <p className="mono-text text-[10px] text-primary mb-2">{t(`${base}.stack`)}</p>
      <p className="font-body text-sm text-text-main/80 leading-snug flex gap-2">
        <span className="text-primary font-mono shrink-0">&gt;</span>
        {t(`${base}.outcome`)}
      </p>
    </div>
  )
}

export default function Experience() {
  const { t } = useLanguage()

  const featuredRoles = EXPERIENCE_ROLES.filter((r) => r.featured)
  const compactRoles = EXPERIENCE_ROLES.filter((r) => !r.featured)

  return (
    <>
      <header className="mb-10 border-b border-border-color pb-6 max-w-5xl">
        <h1 className="heading text-4xl md:text-5xl lg:text-6xl text-text-main font-bold">
          {t('experience.title')}
        </h1>
        <p className="font-body text-text-main/85 text-base md:text-lg mt-4 max-w-3xl leading-relaxed">
          {t('experience.subtitle')}
        </p>
        <p className="mono-text text-sm text-primary mt-4 max-w-3xl leading-relaxed border-l-2 border-primary pl-4">
          {t('experience.jtbdLine')}
        </p>

        <aside
          className="mt-6 border-2 border-primary bg-surface p-5 md:p-6 max-w-3xl"
          aria-labelledby="experience-availability-heading"
        >
          <p
            id="experience-availability-heading"
            className="mono-text text-[10px] text-primary uppercase tracking-widest mb-2"
          >
            {t('availability.label')}
          </p>
          <p className="heading text-xl md:text-2xl text-text-main font-bold mb-4">
            {t('availability.headline')}
          </p>
          <ul className="space-y-3 list-none mb-5" aria-label={t('availability.headline')}>
            {(
              [
                'availability.lineCurrent',
                'availability.lineFreelance',
                'availability.lineFullTime',
              ] as const
            ).map((key) => (
              <li key={key} className="flex gap-3 font-body text-sm text-text-main/90">
                <span
                  className="mt-1.5 w-2 h-2 shrink-0 bg-primary"
                  aria-hidden
                />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
          <Link
            to={ROUTES.contact}
            className="mono-text text-xs text-primary hover:underline uppercase tracking-widest inline-flex items-center gap-1"
          >
            &gt; {t('availability.cta')} →
          </Link>
        </aside>
      </header>

      <section aria-labelledby="timeline-heading" className="relative max-w-5xl">
        <h2 id="timeline-heading" className="sr-only">
          {t('experience.timelineSr')}
        </h2>
        <div className="relative md:pl-8 lg:pl-[33%]">
          <div className="hidden md:block timeline-axis lg:left-[33%] md:left-0 transform lg:-translate-x-1/2" />

          {featuredRoles.map((role) => (
            <FeaturedRoleCard key={role.id} role={role} />
          ))}
        </div>

        <div className="mt-4 pt-8 border-t border-border-color">
          <h2 className="mono-text text-xs text-muted uppercase tracking-widest mb-4">
            {t('experience.compactSection')}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {compactRoles.map((role) => (
              <CompactRoleCard key={role.id} role={role} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="mt-20 border-t border-border-color pt-12 max-w-5xl"
        aria-labelledby="education-heading"
      >
        <h2
          id="education-heading"
          className="heading text-3xl md:text-4xl text-text-main font-bold mb-8"
        >
          {t('common.education')}
        </h2>
        <div className="space-y-6">
          {EDUCATION_IDS.map((id) => {
            const key = EDUCATION_KEYS[id]
            const base = `experience.education.${key}`
            return (
              <div
                key={id}
                className="bg-surface border border-border-color p-6 interactive-border transition-all duration-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <h3 className="heading text-lg md:text-xl text-text-main">
                    {t(`${base}.degree`)}
                  </h3>
                  <span className="mono-text text-sm text-muted shrink-0">
                    {t(`${base}.period`)}
                  </span>
                </div>
                <p className="mono-text text-sm text-primary mb-1">{t(`${base}.field`)}</p>
                <p className="mono-text text-sm text-muted">{t(`${base}.institution`)}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section
        className="mt-20 border-t border-border-color pt-12 max-w-5xl"
        aria-labelledby="certifications-heading"
      >
        <h2
          id="certifications-heading"
          className="heading text-3xl md:text-4xl text-text-main font-bold mb-8"
        >
          {t('common.certifications')}
        </h2>
        <div className="space-y-6">
          {CERTIFICATION_IDS.map((id) => {
            const key = CERT_KEYS[id]
            const base = `experience.certifications.${key}`
            const url = CERTIFICATION_URLS[id]
            const credentialId = CERTIFICATION_CREDENTIAL_IDS[id]
            return (
              <div
                key={id}
                className="bg-surface border border-border-color p-6 interactive-border transition-all duration-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <h3 className="heading text-lg md:text-xl text-text-main">
                    {t(`${base}.title`)}
                  </h3>
                  <span className="mono-text text-sm text-muted shrink-0">
                    {t(`${base}.issued`)}
                  </span>
                </div>
                <p className="mono-text text-sm text-muted mb-3">
                  // {t(`${base}.issuer`).toUpperCase()}
                </p>
                <p className="mono-text text-xs text-muted mb-4">
                  ID: <span className="text-text-main">{credentialId}</span>
                </p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-text text-xs text-primary hover:underline uppercase tracking-widest"
                >
                  &gt; {t('common.viewCredential')}
                </a>
              </div>
            )
          })}
        </div>
      </section>

      <section
        className="mt-20 border-t border-border-color pt-12"
        aria-labelledby="problems-heading"
      >
        <h2
          id="problems-heading"
          className="heading text-3xl md:text-4xl text-text-main font-bold mb-8 max-w-5xl"
        >
          {t('experience.problemsTitle')}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 max-w-5xl">
          {EXPERIENCE_PROBLEM_GROUPS.map((group) => (
            <div
              key={group.id}
              className="border border-border-color bg-surface p-5 interactive-border"
            >
              <h3 className="mono-text text-xs text-primary uppercase tracking-widest mb-3">
                {t(group.titleKey)}
              </h3>
              <ul className="space-y-2 list-none">
                {group.itemKeys.map((itemKey) => (
                  <li
                    key={itemKey}
                    className="font-body text-sm text-text-main/85 flex gap-2"
                  >
                    <span className="text-primary font-mono shrink-0">·</span>
                    {t(`experience.problems.${itemKey}`)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16 max-w-5xl pb-12">
        <SiteFooter exclude={[ROUTES.home, ROUTES.services, ROUTES.experience]} />
      </div>
    </>
  )
}
