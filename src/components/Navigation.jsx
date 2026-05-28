import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'

const links = [
  { name: 'Projects', href: '/projects' },
  { name: 'Research', href: '/research' },
  { name: 'Contact', href: '/contact' },
]

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
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState(getInitialTheme)
  const resolvedTheme = theme || getSystemTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        // force re-render
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

  return (
    <nav className={`nav-container animate-fade-in ${scrolled ? 'scrolled' : ''}`}>
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
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`nav-link ${location.pathname === link.href ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {resolvedTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </nav>
  )
}
