import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { PageLayoutConfig } from '../../lib/layout'
import WhatsAppFab from '../WhatsAppFab'
import SiteSidebar from './SiteSidebar'
import SiteTopNav from './SiteTopNav'

type SiteShellProps = {
  config: PageLayoutConfig
  children: ReactNode
}

const easeOut = [0.22, 1, 0.36, 1] as const
const layoutSpring = { type: 'spring' as const, stiffness: 400, damping: 38, mass: 0.8 }

export default function SiteShell({ config, children }: SiteShellProps) {
  const reduceMotion = useReducedMotion()
  const { variant, blogEnd = false, homeTheme = false, className = '', mainClassName = '' } =
    config

  const isTopnav = variant === 'topnav'
  const chromeTransition = reduceMotion ? { duration: 0 } : { duration: 0.4, ease: easeOut }
  const contentTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.42, ease: easeOut, delay: isTopnav ? 0.05 : 0.08 }

  const rootClass = [
    'min-h-screen w-full',
    isTopnav
      ? 'flex flex-col'
      : homeTheme
        ? 'home-theme flex flex-col lg:flex-row'
        : 'flex flex-col bg-background-dark',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const mainClass = isTopnav
    ? `flex-1 w-full ${mainClassName}`.trim()
    : `flex-1 relative min-h-screen lg:ml-[25%] ${mainClassName}`.trim()

  return (
    <LayoutGroup id="site-chrome">
    <motion.div layout className={rootClass}>
      <AnimatePresence mode="popLayout" initial={false}>
        {isTopnav ? (
          <motion.div
            key="chrome-topnav"
            className="sticky top-0 z-50 w-full shrink-0"
            initial={reduceMotion ? false : { opacity: 0, y: -32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -24 }}
            transition={chromeTransition}
          >
            <SiteTopNav />
          </motion.div>
        ) : (
          <motion.div
            key="chrome-sidebar"
            className="shrink-0"
            initial={reduceMotion ? false : { opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -32 }}
            transition={chromeTransition}
          >
            <SiteSidebar blogEnd={blogEnd} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main
        layout
        layoutScroll
        className={mainClass}
        transition={layoutSpring}
        initial={reduceMotion ? false : { opacity: 0, x: isTopnav ? 0 : 24, y: isTopnav ? 8 : 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0 }}
      >
        <motion.div
          className="min-h-full w-full"
          initial={false}
          animate={{ opacity: 1 }}
          transition={contentTransition}
        >
          {children}
        </motion.div>
      </motion.main>
    </motion.div>
      <WhatsAppFab />
    </LayoutGroup>
  )
}
