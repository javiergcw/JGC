import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DocumentHead from './components/DocumentHead'
import {
  legacyRedirectRoutes,
  TrailingSlashNormalizer,
} from './components/RouteNormalization'
import SiteLayoutRoute from './components/layout/SiteLayoutRoute'
import DeploySystems from './pages/DeploySystems'
import Experience from './pages/Experience'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Services from './pages/Services'
import { ROUTES } from './lib/routes'

function App() {
  return (
    <BrowserRouter>
      <TrailingSlashNormalizer />
      <DocumentHead />
      <Routes>
        {legacyRedirectRoutes()}
        <Route element={<SiteLayoutRoute />}>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.deploySystems} element={<DeploySystems />} />
          <Route path={ROUTES.experience} element={<Experience />} />
          <Route path={ROUTES.services} element={<Services />} />
          <Route path={ROUTES.contact} element={<Contact />} />
          <Route path={ROUTES.blog} element={<Blog />} />
          <Route path={ROUTES.blogPost} element={<BlogPost />} />
        </Route>
        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
