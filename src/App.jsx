import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ScrollToTop from './components/ScrollToTop'
import EasterEgg from './components/EasterEgg'
import CommandPalette from './components/CommandPalette'
import Home from './pages/Home'

// Lazy load pages for code splitting (Item #8)
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <EasterEgg />
      <CommandPalette />
      <Suspense fallback={
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8125rem',
          color: 'var(--color-text-muted)',
        }}>
          <span className="terminal-prompt">$</span>&nbsp;loading...
        </div>
      }>
        <AnimatedRoutes />
      </Suspense>
    </BrowserRouter>
  )
}
