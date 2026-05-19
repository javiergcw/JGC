import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { getPageLayoutConfig } from '../../lib/layout'
import SiteShell from './SiteShell'

const easeOut = [0.22, 1, 0.36, 1] as const

export default function SiteLayoutRoute() {
  const location = useLocation()
  const config = getPageLayoutConfig(location.pathname)
  const reduceMotion = useReducedMotion()

  const pageTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.26, ease: easeOut }

  return (
    <SiteShell config={config}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
          transition={pageTransition}
          className="min-h-full w-full"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </SiteShell>
  )
}
