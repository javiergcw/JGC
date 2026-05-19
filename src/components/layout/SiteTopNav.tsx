import { motion } from 'framer-motion'
import { SITE } from '../../lib/site'
import SiteLogo from './SiteLogo'
import SiteNavLinks from './SiteNavLinks'

export default function SiteTopNav() {
  return (
    <header className="w-full flex items-center justify-between whitespace-nowrap border-b border-border-dark px-4 md:px-10 lg:px-40 py-3 bg-asphalt sticky top-0 z-50">
      <div className="flex items-center gap-4 text-text-main min-w-0">
        <SiteLogo />
        <motion.p
          layoutId="site-brand"
          className="font-display text-lg font-bold leading-tight tracking-[-0.05em] uppercase truncate"
        >
          {SITE.name}
        </motion.p>
      </div>
      <div className="hidden md:flex flex-1 justify-end items-center min-w-0">
        <SiteNavLinks layout="horizontal" languageToggle />
      </div>
      <button
        type="button"
        className="md:hidden text-text-main hover:text-primary"
        aria-label="Open menu"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>
    </header>
  )
}
