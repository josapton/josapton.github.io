import { motion } from 'framer-motion'
import { Mail, Download } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { useLanguage } from '../context/LanguageContext'
import { en } from '../locales/en'
import { id } from '../locales/id'

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const socials = [
  {
    icon: <GithubIcon />,
    href: 'https://github.com/josapton',
    label: 'GitHub',
    handle: 'josapton',
  },
  {
    icon: <Mail size={20} />,
    href: 'mailto:jokosaptono1337@gmail.com',
    label: 'Email',
    handle: 'jokosaptono1337@gmail.com',
  },
  {
    icon: <LinkedinIcon />,
    href: 'https://linkedin.com/in/jokosaptono',
    label: 'LinkedIn',
    handle: 'jokosaptono',
  },
]

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.08 } } },
  item: { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } },
}

export default function Contact() {
  const { lang } = useLanguage()
  const t = lang === 'en' ? en : id


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="page-container"
    >
      <div className="grid-bg" />
      <Navigation />

      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '6rem 1.5rem 4rem',
      }}>
        <motion.div
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="page-title" style={{ marginBottom: '0.625rem' }}>
            <span className="accent">//</span> {t.contact.title}<span className="cursor-blink" />
          </h1>
          <p className="page-description" style={{ marginBottom: '1.5rem', margin: '0 auto 1.5rem auto', textAlign: 'center' }}>
            {t.contact.description}
          </p>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="section-shortcut"
            style={{ textDecoration: 'none', display: 'inline-flex', padding: '0.5rem 1rem' }}
          >
            <Download size={14} className="accent" style={{ marginRight: '0.375rem' }} />
            {t.contact.downloadResume}
          </a>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%', maxWidth: '800px', alignItems: 'center' }}>
          
          <motion.div
            style={{ width: '100%' }}
            variants={stagger.container}
            initial="hidden"
            animate="show"
          >
            <div className="contact-grid">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="card contact-card"
                  variants={stagger.item}
                  whileHover={{ y: -3 }}
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <div className="icon-wrapper">
                    {social.icon}
                  </div>
                  <div className="label">{social.label}</div>
                  <div className="handle">{social.handle}</div>
                </motion.a>
              ))}
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </motion.div>
  )
}
