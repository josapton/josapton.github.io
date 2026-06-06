import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ScrollToTop from './components/ScrollToTop'
import EasterEgg from './components/EasterEgg'
import CommandPalette from './components/CommandPalette'
import ResumeViewer from './components/ResumeViewer'
import ScrollProgress from './components/ScrollProgress'
import OfflineBanner from './components/OfflineBanner'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import TerminalTransition from './components/TerminalTransition'
import { ThemeProvider } from './context/ThemeContext'

// Lazy load pages for code splitting (Item #8)
const About = lazy(() => import('./pages/About'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function AnimatedRoutes() {
  const location = useLocation()

  useEffect(() => {
    let title = 'root@josapton:~'
    if (location.pathname !== '/') {
      const path = location.pathname.replace(/\/$/, '')
      title += path
    }
    document.title = title
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<TerminalTransition><Home /></TerminalTransition>} />
        <Route path="/about" element={<TerminalTransition><About /></TerminalTransition>} />
        <Route path="/portfolio" element={<TerminalTransition><Portfolio /></TerminalTransition>} />
        <Route path="/contact" element={<TerminalTransition><Contact /></TerminalTransition>} />
        <Route path="*" element={<TerminalTransition><NotFound /></TerminalTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <ScrollToTop />
          <ScrollProgress />
          <OfflineBanner />
          <EasterEgg />
          <CommandPalette />
          <ResumeViewer />

          <Suspense fallback={
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              color: 'var(--color-text-muted)',
              background: 'var(--color-bg-primary)'
            }}>
              Loading system modules...
            </div>
          }>
            <AnimatedRoutes />
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  )
}
