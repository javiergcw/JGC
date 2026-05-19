import type { FaqItem } from '../data/faq'
import type { Locale } from '../i18n/locale'
import { translate } from '../i18n/translations'
import { PRICING_OFFERS } from '../data/services'
import { absoluteUrl, SITE } from './site'
import { ROUTES } from './routes'

const ORG_ID = `${absoluteUrl('/')}#organization`
const PERSON_ID = `${absoluteUrl('/')}#person`
const LOCAL_BUSINESS_ID = `${absoluteUrl('/')}#localbusiness`

export function buildOrganization() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.business.legalName,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/og-image.svg'),
    description: SITE.description,
    email: SITE.contact.hire,
    founder: { '@id': PERSON_ID },
    sameAs: [SITE.social.github, SITE.social.linkedin, SITE.social.instagram].filter(
      Boolean,
    ),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'recruiting',
        email: SITE.contact.hire,
        availableLanguage: ['English', 'Spanish'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: SITE.contact.contract,
        availableLanguage: ['English', 'Spanish'],
      },
    ],
  }
}

export function buildLocalBusiness() {
  return {
    '@type': 'ProfessionalService',
    '@id': LOCAL_BUSINESS_ID,
    additionalType: 'https://schema.org/LocalBusiness',
    name: SITE.business.legalName,
    description: SITE.description,
    url: absoluteUrl('/'),
    image: absoluteUrl('/og-image.svg'),
    email: SITE.contact.hire,
    priceRange: '$$$',
    areaServed: SITE.business.areaServed,
    address: {
      '@type': 'PostalAddress',
      addressCountry: SITE.business.country,
      addressLocality: SITE.business.locality,
    },
    geo: SITE.business.geo,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      opens: '09:00',
      closes: '18:00',
    },
    parentOrganization: { '@id': ORG_ID },
    employee: { '@id': PERSON_ID },
  }
}

export function buildPerson() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.author.name,
    jobTitle: SITE.author.title,
    email: SITE.contact.hire,
    url: absoluteUrl('/'),
    worksFor: { '@id': ORG_ID },
    knowsAbout: SITE.keywords,
    sameAs: [SITE.social.github, SITE.social.linkedin, SITE.social.instagram].filter(
      Boolean,
    ),
  }
}

export function buildWebPage(path: string, name: string, description: string) {
  return {
    '@type': 'WebPage',
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { '@id': `${absoluteUrl('/')}#website` },
    about: { '@id': ORG_ID },
    inLanguage: SITE.language,
  }
}

export function buildServiceOfferings() {
  return PRICING_OFFERS.map((offer) => ({
    '@type': 'Service',
    '@id': `${absoluteUrl(ROUTES.services)}#${offer.id.toLowerCase()}`,
    name: offer.name,
    description: offer.description,
    provider: { '@id': ORG_ID },
    areaServed: SITE.business.areaServed,
    offers: {
      '@type': 'Offer',
      price: offer.price === '0' ? undefined : offer.price,
      priceCurrency: offer.currency,
      description: offer.priceNote,
      url: absoluteUrl(ROUTES.services),
    },
  }))
}

export function buildFaqPage(path: string, faqs: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function buildBreadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function buildHomePageSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${absoluteUrl('/')}#website`,
        url: absoluteUrl('/'),
        name: SITE.name,
        description,
        inLanguage: SITE.language,
        publisher: { '@id': ORG_ID },
      },
      buildOrganization(),
      buildLocalBusiness(),
      buildPerson(),
      buildWebPage(ROUTES.home, SITE.name, description),
    ],
  }
}

export function buildServicesPageSchema(description: string, faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganization(),
      buildLocalBusiness(),
      buildPerson(),
      buildWebPage(ROUTES.services, 'Engineering Services', description),
      ...buildServiceOfferings(),
      buildFaqPage(ROUTES.services, faqs),
      buildBreadcrumbs([
        { name: 'Home', path: ROUTES.home },
        { name: 'Services', path: ROUTES.services },
      ]),
    ],
  }
}

function buildAvailabilityItemList(locale: Locale) {
  const lines = [
    'availability.lineCurrent',
    'availability.lineFreelance',
    'availability.lineFullTime',
  ] as const

  return {
    '@type': 'ItemList',
    '@id': `${absoluteUrl(ROUTES.experience)}#availability`,
    name: translate(locale, 'availability.headline'),
    itemListElement: lines.map((key, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: translate(locale, key),
    })),
  }
}

export function buildExperiencePageSchema(description: string, locale: Locale = 'en') {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganization(),
      buildPerson(),
      {
        '@type': 'ProfilePage',
        '@id': `${absoluteUrl(ROUTES.experience)}#profile`,
        url: absoluteUrl(ROUTES.experience),
        name: 'Experience & Education',
        description,
        mainEntity: { '@id': PERSON_ID },
      },
      buildAvailabilityItemList(locale),
      buildWebPage(ROUTES.experience, 'Experience & Education', description),
      buildBreadcrumbs([
        { name: 'Home', path: ROUTES.home },
        { name: 'Experience', path: ROUTES.experience },
      ]),
    ],
  }
}

export function buildContactPageSchema(description: string, faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganization(),
      buildLocalBusiness(),
      buildPerson(),
      buildWebPage(ROUTES.contact, 'Contact', description),
      {
        '@type': 'ContactPage',
        '@id': `${absoluteUrl(ROUTES.contact)}#contactpage`,
        url: absoluteUrl(ROUTES.contact),
        name: 'Contact',
        description,
        mainEntity: { '@id': ORG_ID },
      },
      buildFaqPage(ROUTES.contact, faqs),
      buildBreadcrumbs([
        { name: 'Home', path: ROUTES.home },
        { name: 'Contact', path: ROUTES.contact },
      ]),
    ],
  }
}
