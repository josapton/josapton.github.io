import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Particles from '../components/Particles'
import { useLanguage } from '../context/LanguageContext'
import { en } from '../locales/en'
import { id } from '../locales/id'

function useTypingEffect(text, speed = 80, delay = 600) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    let interval = null
    // eslint-disable-next-line
    setDisplayed('')
     
    setDone(false)
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1))
          i++
        } else {
          setDone(true)
          clearInterval(interval)
        }
      }, speed)
    }, delay)
    return () => {
      clearTimeout(timeout)
      if (interval) clearInterval(interval)
    }
  }, [text, speed, delay])

  return { displayed, done }
}

function useTypewriterRotation(words, typingSpeed = 80, deletingSpeed = 40, delayBetweenWords = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeout = null
    const currentWord = words[wordIndex]

    if (isDeleting) {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(currentWord.slice(0, displayed.length - 1))
        }, deletingSpeed)
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }, deletingSpeed)
      }
    } else {
      if (displayed.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayed(currentWord.slice(0, displayed.length + 1))
        }, typingSpeed)
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, delayBetweenWords)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords])

  return displayed
}

export default function Home() {
  const { lang } = useLanguage()
  const t = lang === 'en' ? en : id

  const { displayed: typedName, done: nameDone } = useTypingEffect('josapton', 120, 400)
  const { displayed: typedMotto, done: mottoDone } = useTypingEffect(
    t.home.description,
    25,
    1800
  )

  const rotatingInterests = [
    t.home.interests.devsecops,
    t.home.interests.cybersecurity,
    t.home.interests.software,
    t.home.interests.ai
  ]
  const currentInterest = useTypewriterRotation(rotatingInterests, 80, 40, 2500)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Grid background */}
      <div className="grid-bg" />

      {/* Subtle scan line */}
      <div className="scan-line" />

      {/* Particles */}
      <Particles quantity={90} />

      {/* Navigation */}
      <nav className="animate-fade-in" aria-label="Main navigation" style={{ marginBottom: 'auto', paddingTop: '2.5rem', zIndex: 10 }}>
        <ul style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', listStyle: 'none', padding: 0, margin: 0 }}>
          <li><Link to="/about" className="nav-link" style={{ fontSize: '0.8125rem' }}>{t.nav.about}</Link></li>
          <li><Link to="/portfolio" className="nav-link" style={{ fontSize: '0.8125rem' }}>{t.nav.portfolio}</Link></li>
          <li><Link to="/contact" className="nav-link" style={{ fontSize: '0.8125rem' }}>{t.nav.contact}</Link></li>
        </ul>
      </nav>

      {/* Center content */}
      <main style={{ zIndex: 10, textAlign: 'center', padding: '0 1.5rem', maxWidth: '680px' }}>
        {/* Status line */}
        <div className="animate-fade-in-delay-1" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          color: 'var(--color-text-muted)',
          letterSpacing: '0.05em',
        }}>
          <span className="status-dot" />
          <span style={{ textTransform: 'uppercase' }}>{t.home.available}</span>
        </div>

        {/* Hero name with typing effect */}
        <h1 className="hero-title" style={{ marginBottom: '1.25rem' }}>
          <span className="accent">#</span>{' '}
          {typedName}
          {!nameDone && <span className="cursor-blink" />}
        </h1>

        {/* Top glow line */}
        <div
          className="glow-line animate-fade-left"
          style={{ marginBottom: '1.5rem' }}
        />

        {/* Motto with typing */}
        <div style={{ minHeight: '3rem', marginBottom: '1.75rem' }}>
          <p style={{
            fontSize: '0.8125rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.8,
            fontFamily: 'var(--font-mono)',
          }}>
            {typedMotto}
            {nameDone && !mottoDone && <span className="cursor-blink" />}
          </p>
        </div>

        {/* Interest rotation */}
        <div className="animate-fade-in-delay-4" style={{
          minHeight: '2rem',
          fontSize: '0.875rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-accent)',
          letterSpacing: '0.05em',
          marginTop: '1rem',
          opacity: mottoDone ? 1 : 0, // only show after motto finishes
          transition: 'opacity 0.5s ease'
        }}>
          {'> '} {currentInterest}
          <span className="cursor-blink" />
        </div>
      </main>


      {/* Spacer */}
      <div style={{ marginTop: 'auto' }} />
    </div>
  )
}
