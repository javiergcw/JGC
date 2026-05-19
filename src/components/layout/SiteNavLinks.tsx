import { NavLink } from 'react-router-dom'
import LanguageToggle from '../LanguageToggle'
import { useLanguage } from '../../i18n/LanguageContext'
import { SITE_NAV, type SiteNavItem } from '../../lib/navigation'

type SiteNavLinksProps = {
  layout: 'vertical' | 'horizontal'
  className?: string
  /** Use on Blog route so only exact /blog matches, not posts */
  blogEnd?: boolean
  /** Show ENG | ESP after the last nav item (Blog) */
  languageToggle?: boolean
}

function linkClassName(layout: 'vertical' | 'horizontal', isActive: boolean) {
  const base = 'nav-item transition-none font-mono text-sm'
  const active = isActive ? 'nav-item-active' : 'text-muted hover:text-primary'
  if (layout === 'vertical') {
    return `${base} flex items-center gap-2 ${active}`
  }
  return `${base} uppercase tracking-wide ${active}`
}

function resolveEnd(item: SiteNavItem, blogEnd: boolean) {
  if ('end' in item && item.end) return true
  if (blogEnd && item.labelKey === 'nav.blog') return true
  return false
}

export default function SiteNavLinks({
  layout,
  className = '',
  blogEnd = false,
  languageToggle = false,
}: SiteNavLinksProps) {
  const { t } = useLanguage()

  return (
    <nav
      className={
        layout === 'vertical'
          ? `flex flex-col gap-3 ${className}`
          : `flex items-center gap-6 md:gap-9 flex-wrap justify-end ${className}`
      }
      aria-label="Main navigation"
    >
      {SITE_NAV.map((item) => (
        <NavLink
          key={item.labelKey}
          to={item.to}
          end={resolveEnd(item, blogEnd)}
          className={({ isActive }) => linkClassName(layout, isActive)}
        >
          {t(item.labelKey)}
        </NavLink>
      ))}
      {languageToggle && (
        <LanguageToggle compact={layout === 'horizontal'} />
      )}
    </nav>
  )
}
