import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Sun, Moon, Monitor, Menu, X, Terminal, GitBranch, FolderGit2, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { en } from '../locales/en'
import { id } from '../locales/id'



export default function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [dropdownPortfolio, setDropdownPortfolio] = useState(false)
  const [dropdownAbout, setDropdownAbout] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { lang, toggleLang } = useLanguage()
  const { theme, cycleTheme } = useTheme()
  
  const tFull = lang === 'en' ? en : id
  const t = tFull.nav

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



  const handleSubSectionClick = (path, sectionId) => {
    setDropdownPortfolio(false)
    setDropdownAbout(false)
    setMobileMenuOpen(false)
    if (location.pathname === path) {
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 250)
    } else {
      navigate(path)
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 600)
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
  const isAboutActive = location.pathname === '/about'

  return (
    <nav className={`nav-container animate-fade-in ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: 600,
          fontFamily: 'var(--font-mono)',
          letterSpacing: '-0.02em',
          color: 'var(--color-text-primary)',
          transition: 'color var(--transition-slow)',
        }}
      >
        <img 
          src="/favicon.png" 
          alt="Josapton Logo" 
          style={{ width: '20px', height: '20px', objectFit: 'contain' }}
        />
        josapton
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {/* Desktop Links */}
        <div className="desktop-nav">
          <ul className="nav-links">
            <li
              className="nav-dropdown-wrapper"
              onMouseEnter={() => setDropdownAbout(true)}
              onMouseLeave={() => setDropdownAbout(false)}
            >
              <Link 
                to="/about" 
                className={`nav-link ${isAboutActive ? 'active' : ''}`}
                onClick={() => handleNavClick('/about')}
                aria-haspopup="true"
                aria-expanded={dropdownAbout}
              >
                {t.about}
              </Link>
              {dropdownAbout && (
                <div className="nav-dropdown">
                  <div className="nav-dropdown-menu" role="menu">
                    <button className="nav-dropdown-item" onClick={() => handleSubSectionClick('/about', 'methodology')}>
                      <Terminal size={14} className="accent" /> {tFull.about.methodologyTitle}
                    </button>
                    <button className="nav-dropdown-item" onClick={() => handleSubSectionClick('/about', 'github-metrics')}>
                      <GitBranch size={14} className="accent" /> {t.githubMetrics}
                    </button>
                  </div>
                </div>
              )}
            </li>
            
            <li
              className="nav-dropdown-wrapper"
              onMouseEnter={() => setDropdownPortfolio(true)}
              onMouseLeave={() => setDropdownPortfolio(false)}
            >
              <Link 
                to="/portfolio" 
                className={`nav-link ${isPortfolioActive ? 'active' : ''}`}
                onClick={() => handleNavClick('/portfolio')}
                aria-haspopup="true"
                aria-expanded={dropdownPortfolio}
              >
                {t.portfolio}
              </Link>
              {dropdownPortfolio && (
                <div className="nav-dropdown">
                  <div className="nav-dropdown-menu" role="menu">
                    <button className="nav-dropdown-item" onClick={() => handleSubSectionClick('/portfolio', 'projects')}>
                      <FolderGit2 size={14} className="accent" /> {tFull.portfolio.featured}
                    </button>
                    <button className="nav-dropdown-item" onClick={() => handleSubSectionClick('/portfolio', 'research')}>
                      <BookOpen size={14} className="accent" /> {tFull.portfolio.publications}
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
            onClick={cycleTheme}
            className="theme-toggle"
            aria-label={`Switch theme (current: ${theme})`}
            title={`Toggle Theme (${theme})`}
          >
            {theme === 'system' ? <Monitor size={18} /> : (theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />)}
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
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: 'fixed',
                top: '4rem',
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(4px)',
                zIndex: -1
              }}
            />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mobile-menu"
            >
            <div className="mobile-menu-inner">
              <Link to="/" className="mobile-nav-link" onClick={() => handleNavClick('/')}>
                <span className="accent">$</span> {t.home}
              </Link>
              
              <Link to="/about" className={`mobile-nav-link ${isAboutActive ? 'active' : ''}`} onClick={() => handleNavClick('/about')}>
                <span className="accent">$</span> {t.about}
              </Link>
              <div className="mobile-sub-menu">
                <button className="mobile-sub-nav-link" onClick={() => handleSubSectionClick('/about', 'methodology')} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Terminal size={14} className="accent" /> {tFull.about.methodologyTitle}
                </button>
                <button className="mobile-sub-nav-link" onClick={() => handleSubSectionClick('/about', 'github-metrics')} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <GitBranch size={14} className="accent" /> {t.githubMetrics}
                </button>
              </div>

              <Link to="/portfolio" className={`mobile-nav-link ${isPortfolioActive ? 'active' : ''}`} onClick={() => handleNavClick('/portfolio')}>
                <span className="accent">$</span> {t.portfolio}
              </Link>
              <div className="mobile-sub-menu">
                <button className="mobile-sub-nav-link" onClick={() => handleSubSectionClick('/portfolio', 'projects')} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <FolderGit2 size={14} className="accent" /> {tFull.portfolio.featured}
                </button>
                <button className="mobile-sub-nav-link" onClick={() => handleSubSectionClick('/portfolio', 'research')} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <BookOpen size={14} className="accent" /> {tFull.portfolio.publications}
                </button>
              </div>
              
              <Link to="/contact" className={`mobile-nav-link ${location.pathname === '/contact' ? 'active' : ''}`} onClick={() => handleNavClick('/contact')}>
                <span className="accent">$</span> {t.contact}
              </Link>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
