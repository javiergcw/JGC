import { motion } from 'framer-motion'
import { SITE } from '../../lib/site'
import { SITE_STATS, SITE_VERSION } from '../../lib/navigation'
import SiteNavLinks from './SiteNavLinks'

type SiteSidebarProps = {
  blogEnd?: boolean
}

export default function SiteSidebar({ blogEnd = false }: SiteSidebarProps) {
  return (
    <>
      <header className="lg:hidden brutal-border border-b border-x-0 border-t-0 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0A0A0A] z-20 sticky top-0">
        <div className="flex flex-col">
          <motion.p
            layoutId="site-brand"
            className="font-display font-bold text-text-main tracking-tighter uppercase"
          >
            {SITE.name}
          </motion.p>
          <p className="font-mono text-xs text-muted">{SITE_VERSION}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <SiteNavLinks
            layout="horizontal"
            className="gap-4"
            blogEnd={blogEnd}
            languageToggle
          />
        </div>
      </header>

      <aside className="hidden lg:flex w-[25%] brutal-border border-r border-y-0 border-l-0 min-h-screen flex-col justify-between p-6 bg-[#0A0A0A] z-20 fixed left-0 top-0 bottom-0">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            <motion.p
              layoutId="site-brand"
              className="font-display font-bold text-text-main text-xl tracking-[-0.05em] uppercase"
            >
              {SITE.name}
            </motion.p>
            <p className="font-mono text-xs text-muted mt-1">{SITE_VERSION}</p>
          </div>
          <SiteNavLinks layout="vertical" blogEnd={blogEnd} languageToggle />
        </div>
        <div className="flex flex-col gap-4">
          <div className="font-mono text-xs text-muted flex flex-col gap-2">
            <p>{SITE_STATS.loc}</p>
            <p>{SITE_STATS.uptime}</p>
          </div>
        </div>
      </aside>
    </>
  )
}
