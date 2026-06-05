import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, GitBranch, ChevronUp } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import GithubStats from '../components/GithubStats'
import ScrollProgress from '../components/ScrollProgress'
import { useLanguage } from '../context/LanguageContext'
import { en } from '../locales/en'
import { id } from '../locales/id'

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

export default function About() {
  const { lang } = useLanguage()
  const t = lang === 'en' ? en : id

  const [showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="page-container">
      <div className="grid-bg" />
      <ScrollProgress />
      <Navigation />
      
      <main className="page-content">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="page-title" style={{ marginBottom: '0.625rem' }}>
            <span className="accent">~/</span> {t.about.title}<span className="cursor-blink" />
          </h1>
          <p className="page-description">
            {t.about.description}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => {
                const el = document.getElementById('methodology')
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="section-shortcut"
            >
              <Terminal size={14} className="accent" style={{ marginRight: '0.375rem' }} /> {t.about.methodologyTitle}
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('github-metrics')
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="section-shortcut"
            >
              <GitBranch size={14} className="accent" style={{ marginRight: '0.375rem' }} /> {t.nav.githubMetrics}
            </button>
          </div>
        </motion.div>

        <motion.div
          style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '4rem' }}
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* Methodology Section */}
          <motion.section variants={item} id="methodology" style={{ scrollMarginTop: '6rem' }}>
            <h2 className="section-title" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Terminal size={20} className="accent" />
              {t.about.methodologyTitle}
            </h2>
            <div className="card-featured" style={{ position: 'relative' }}>
              <p style={{
                fontSize: '0.95rem',
                lineHeight: 1.6,
                color: 'var(--color-text-secondary)',
                margin: 0
              }}>
                {t.about.methodologyBody}
              </p>
            </div>
          </motion.section>

          {/* GitHub Metrics */}
          <motion.section variants={item} id="github-metrics" style={{ scrollMarginTop: '6rem' }}>
            <h2 className="section-title" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <GitBranch size={20} className="accent" />
              {t.nav.githubMetrics}
            </h2>
            <GithubStats />
          </motion.section>

        </motion.div>
      </main>

      <Footer />

      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            className="back-to-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            aria-label="Back to top"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
