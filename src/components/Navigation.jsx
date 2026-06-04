import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { en } from '../locales/en'
import { id } from '../locales/id'

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getInitialTheme() {
  const stored = localStorage.getItem('theme')
  if (stored === 'dark' || stored === 'light') return stored
  return null // will follow system
}

export default function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState(getInitialTheme)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const resolvedTheme = theme || getSystemTheme()
  const { lang, toggleLang } = useLanguage()
  const t = lang === 'en' ? en.nav : id.nav

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line
    setMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.removeItem('theme')
    }
  }, [theme])

  // Listen for system preference changes when no manual theme
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (!theme) {
        setTheme(null)
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  const toggleTheme = () => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(next)
  }

  const handleSubSectionClick = (sectionId) => {
    setDropdownOpen(false)
    setMobileMenuOpen(false)
    if (location.pathname === '/portfolio') {
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 250)
    } else {
      navigate('/portfolio')
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 400)
    }
  }

  const handleNavClick = (path) => {
    setMobileMenuOpen(false)
    if (location.pathname === path) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 250)
    }
  }

  const isPortfolioActive = location.pathname === '/portfolio'

  return (
    <nav className={`nav-container animate-fade-in ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
      <Link
        to="/"
        style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          fontFamily: 'var(--font-mono)',
          letterSpacing: '-0.02em',
          color: 'var(--color-text-primary)',
          transition: 'color var(--transition-slow)',
        }}
      >
        josapton
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {/* Desktop Links */}
        <div className="desktop-nav">
          <ul className="nav-links">
            <li
              className="nav-dropdown-wrapper"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link 
                to="/portfolio" 
                className={`nav-link ${isPortfolioActive ? 'active' : ''}`}
                onClick={() => handleNavClick('/portfolio')}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                {t.portfolio}
              </Link>
              {dropdownOpen && (
                <div className="nav-dropdown">
                  <div className="nav-dropdown-menu" role="menu">
                    <button className="nav-dropdown-item" onClick={() => handleSubSectionClick('projects')}>
                      <span className="accent">{'>'}</span> {t.projects}
                    </button>
                    <button className="nav-dropdown-item" onClick={() => handleSubSectionClick('research')}>
                      <span className="accent">{'>'}</span> {t.research}
                    </button>
                  </div>
                </div>
              )}
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
                onClick={() => handleNavClick('/contact')}
              >
                {t.contact}
              </Link>
            </li>
          </ul>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            className="theme-toggle"
            onClick={toggleLang}
            aria-label={lang === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
            style={{ 
              fontSize: '0.75rem', 
              fontFamily: 'var(--font-mono)', 
              fontWeight: 600, 
              color: 'var(--color-text-primary)' 
            }}
            title={lang === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
          >
            {lang === 'en' ? 'EN' : 'ID'}
          </button>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {resolvedTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mobile-menu"
          >
            <div className="mobile-menu-inner">
              <Link to="/" className="mobile-nav-link" onClick={() => handleNavClick('/')}>
                <span className="accent">{'>'}</span> {t.home}
              </Link>
              <Link to="/portfolio" className={`mobile-nav-link ${isPortfolioActive ? 'active' : ''}`} onClick={() => handleNavClick('/portfolio')}>
                <span className="accent">{'>'}</span> {t.portfolio}
              </Link>
              <div className="mobile-sub-menu">
                <button className="mobile-sub-nav-link" onClick={() => handleSubSectionClick('projects')}>
                  - {t.projects}
                </button>
                <button className="mobile-sub-nav-link" onClick={() => handleSubSectionClick('research')}>
                  - {t.research}
                </button>
              </div>
              <Link to="/contact" className={`mobile-nav-link ${location.pathname === '/contact' ? 'active' : ''}`} onClick={() => handleNavClick('/contact')}>
                <span className="accent">{'>'}</span> {t.contact}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
