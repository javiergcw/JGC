import FaqSection from '../components/FaqSection'
import SiteFooter from '../components/SiteFooter'
import { getServicesFaq } from '../data/faq'
import { useLanguage } from '../i18n/LanguageContext'
import { SITE } from '../lib/site'

const FULL_TIME_FOCUS = [
  {
    title: 'SYSTEMS ARCHITECTURE',
    description:
      'Design and implement scalable, resilient infrastructure. Migrations and modernization.',
  },
  {
    title: 'TECHNICAL LEADERSHIP',
    description:
      'Mentoring senior engineers, establishing rigorous CI/CD pipelines, enforcing code standards.',
  },
  {
    title: 'PERFORMANCE OPTIMIZATION',
    description:
      'Deep-dive profiling, database query optimization, reducing latency in critical paths.',
  },
] as const

const PRICING_ROW_KEYS = ['discovery', 'archAudit', 'mvpBuild', 'dbMigration'] as const

export default function Services() {
  const { locale, t } = useLanguage()
  const servicesFaq = getServicesFaq(locale)

  return (
    <>
      <main className="flex-1 flex flex-col md:flex-row split-container w-full h-full">
        <section
          className="split-column flex-1 bg-[#0A0A0A] p-6 md:p-12 border-b md:border-b-0 md:border-r border-brutal flex flex-col"
          aria-labelledby="fulltime-heading"
        >
          <div className="max-w-[600px] w-full mx-auto flex-1 flex flex-col">
            <div className="mb-12">
              <div className="inline-block px-3 py-1 border border-[#333333] mono-text text-xs text-[#737373] mb-4 uppercase rounded-sm">
                {t('services.fullTimeDir')}
              </div>
              <h2
                id="fulltime-heading"
                className="text-4xl md:text-5xl font-bold mb-4 text-[#E0E0E0] font-display uppercase"
              >
                {t('services.fullTimeTitle')}
              </h2>
              <p className="text-lg text-[#737373] leading-relaxed mb-8">
                {t('services.fullTimeBody')}
              </p>
            </div>

            <div className="space-y-8 flex-1">
              <div>
                <h3 className="text-xl text-primary border-b border-[#333333] pb-2 mb-4 font-display uppercase">
                  {t('services.coreFocus')}
                </h3>
                <ul className="space-y-4 mono-text text-sm text-[#E0E0E0]">
                  {FULL_TIME_FOCUS.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <span className="text-primary mt-1">&gt;</span>
                      <div>
                        <span className="font-bold text-[#E0E0E0]">{item.title}</span>
                        <br />
                        <span className="text-[#737373]">{item.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12">
              <a
                className="btn-brutal rounded-sm"
                href={`mailto:${SITE.contact.hire}?subject=Full-Time Inquiry`}
              >
                {t('services.hrContact')}
              </a>
            </div>
          </div>
        </section>

        <section
          className="split-column flex-1 bg-[#141414] p-6 md:p-12 flex flex-col"
          aria-labelledby="freelance-heading"
        >
          <div className="max-w-[600px] w-full mx-auto flex-1 flex flex-col">
            <div className="mb-12">
              <div className="inline-block px-3 py-1 border border-[#333333] mono-text text-xs text-[#737373] mb-4 uppercase rounded-sm bg-[#0A0A0A]">
                {t('services.freelanceDir')}
              </div>
              <h2
                id="freelance-heading"
                className="text-4xl md:text-5xl font-bold mb-4 text-[#E0E0E0] font-display uppercase"
              >
                {t('services.freelanceTitle')}
              </h2>
              <p className="text-lg text-[#737373] leading-relaxed mb-8">
                {t('services.freelanceBody')}
              </p>
            </div>

            <div className="space-y-8 flex-1">
              <div>
                <h3 className="text-xl text-primary border-b border-[#333333] pb-2 mb-4 font-display uppercase">
                  {t('services.deliverables')}
                </h3>
                <div className="border border-[#333333] rounded-sm overflow-hidden bg-[#0A0A0A] mono-text text-sm w-full">
                  <div className="grid grid-cols-12 bg-[#141414] border-b border-[#333333] text-[#737373] p-3 matrix-header text-xs">
                    <div className="col-span-5">{t('services.serviceId')}</div>
                    <div className="col-span-4">{t('services.estTime')}</div>
                    <div className="col-span-3 text-right">{t('services.pricingCol')}</div>
                  </div>
                  {PRICING_ROW_KEYS.map((key, index) => (
                    <div
                      key={key}
                      className={`grid grid-cols-12 p-3 hover:bg-[#141414] transition-colors ${
                        index < PRICING_ROW_KEYS.length - 1
                          ? 'border-b border-[#333333]'
                          : ''
                      }`}
                    >
                      <div className="col-span-5 text-[#E0E0E0]">
                        {t(`services.rows.${key}.id`)}
                      </div>
                      <div className="col-span-4 text-[#737373]">
                        {t(`services.rows.${key}.time`)}
                      </div>
                      <div className="col-span-3 text-right text-primary">
                        {t(`services.rows.${key}.rate`)}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mono-text text-xs text-[#737373] mt-2 text-right">
                  {t('services.ratesNote')}
                </p>
              </div>
            </div>

            <div className="mt-12">
              <a
                className="btn-brutal rounded-sm"
                href={`mailto:${SITE.contact.contract}?subject=Freelance Scope Proposal`}
              >
                {t('services.contract')}
              </a>
            </div>
          </div>
        </section>
      </main>

      <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-12 bg-[#0A0A0A]">
        <FaqSection title={t('services.faqTitle')} items={servicesFaq} />
        <SiteFooter variant="minimal" />
      </div>
    </>
  )
}
