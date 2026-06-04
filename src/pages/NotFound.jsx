import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { en } from '../locales/en'
import { id } from '../locales/id'

export default function NotFound() {
  const { lang } = useLanguage()
  const t = lang === 'en' ? en : id

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        position: 'relative',
      }}
    >
      <div className="grid-bg" />

      <main style={{ zIndex: 10, textAlign: 'center', padding: '0 1.5rem', maxWidth: '480px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 56,
          height: 56,
          borderRadius: 'var(--radius)',
          background: 'var(--color-accent-dim)',
          color: 'var(--color-accent)',
          margin: '0 auto 1.5rem',
        }}>
          <Terminal size={24} />
        </div>

        <h1 style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(2rem, 8vw, 4rem)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          lineHeight: 1,
          marginBottom: '0.75rem',
        }}>
          <span className="accent">4</span>0<span className="accent">4</span>
        </h1>

        <div className="terminal-block" style={{ marginBottom: '2rem', textAlign: 'left' }}>
          <p><span className="terminal-prompt">$</span> cd /requested-page</p>
          <p style={{ color: 'var(--color-accent-warn)' }}>bash: cd: /requested-page: No such file or directory</p>
          <p><span className="terminal-prompt">$</span> <span className="cursor-blink" /></p>
        </div>

        <p style={{
          fontSize: '0.8125rem',
          color: 'var(--color-text-secondary)',
          fontFamily: 'var(--font-mono)',
          marginBottom: '1.5rem',
          lineHeight: 1.7,
        }}>
          {t['404'].notFound}
        </p>

        <Link
          to="/"
          className="section-shortcut"
          style={{ textDecoration: 'none' }}
        >
          <Terminal size={14} className="accent" style={{ marginRight: '0.375rem' }} />
          {t['404'].returnHome}
        </Link>
      </main>
    </motion.div>
  )
}
