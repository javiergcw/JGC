import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { ROUTES } from '../lib/routes'
import { SITE } from '../lib/site'

const FOOTER_LINKS = [
  { labelKey: 'nav.home', descKey: 'footer.home', to: ROUTES.home },
  { labelKey: 'nav.services', descKey: 'footer.services', to: ROUTES.services },
  { labelKey: 'nav.experience', descKey: 'footer.experience', to: ROUTES.experience },
  { labelKey: 'nav.contact', descKey: 'footer.contact', to: ROUTES.contact },
  { labelKey: 'nav.projects', descKey: 'footer.projects', to: ROUTES.deploySystems },
  { labelKey: 'nav.blog', descKey: 'footer.blog', to: ROUTES.blog },
] as const

type SiteFooterProps = {
  variant?: 'home' | 'default' | 'minimal'
  exclude?: readonly string[]
}

const HOME_FOOTER_EXCLUDE: string[] = [ROUTES.home, ROUTES.services]

export default function SiteFooter({
  variant = 'default',
  exclude = [],
}: SiteFooterProps) {
  const { t } = useLanguage()
  const hidden = new Set([
    ...(variant === 'home' ? HOME_FOOTER_EXCLUDE : []),
    ...exclude,
  ])
  const footerLinks = FOOTER_LINKS.filter((link) => !hidden.has(link.to))
  const showNav = variant !== 'minimal' && footerLinks.length > 0

  return (
    <footer
      className={`border-t font-mono text-xs ${
        variant === 'home'
          ? 'home-footer mt-auto pt-16'
          : variant === 'minimal'
            ? 'mt-12 pt-8 border-border-color text-muted'
            : 'mt-16 py-12 px-6 md:px-10 border-border-color text-muted'
      }`}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Site navigation and contact
      </h2>

      {showNav && (
      <nav
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 max-w-4xl"
        aria-label="Footer navigation"
      >
        {footerLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`group border p-3 hover:border-primary hover:text-primary transition-none ${
              variant === 'home'
                ? 'home-footer-card'
                : 'border-border-color bg-surface/50'
            }`}
          >
            <span
              className={`block font-bold uppercase mb-1 group-hover:text-primary ${
                variant === 'home' ? '' : 'text-text-main'
              }`}
            >
              {t(link.labelKey)}
            </span>
            <span className="text-[10px] text-muted">{t(link.descKey)}</span>
          </Link>
        ))}
      </nav>
      )}

      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <p>
          © {new Date().getFullYear()} {SITE.name} · {SITE.author.name}
        </p>
        <p>
          <a href={`mailto:${SITE.contact.hire}`} className="hover:text-primary">
            {SITE.contact.hire}
          </a>
        </p>
      </div>
    </footer>
  )
}
