import { useEffect } from 'react'
import { Navigate, Route, useLocation, useNavigate } from 'react-router-dom'
import { LEGACY_REDIRECTS } from '../lib/sitemap'

/** Removes trailing slashes (except root) for canonical URL consistency. */
export function TrailingSlashNormalizer() {
  const { pathname, search, hash } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname.length > 1 && pathname.endsWith('/')) {
      navigate(`${pathname.replace(/\/+$/, '')}${search}${hash}`, {
        replace: true,
      })
    }
  }, [pathname, search, hash, navigate])

  return null
}

export function legacyRedirectRoutes() {
  return Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
    <Route key={from} path={from} element={<Navigate to={to} replace />} />
  ))
}

