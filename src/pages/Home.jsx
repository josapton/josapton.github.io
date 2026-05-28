import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Particles from '../components/Particles'

const navigation = [
  { name: 'Projects', href: '/projects' },
  { name: 'Research', href: '/research' },
  { name: 'Contact', href: '/contact' },
]

function useTypingEffect(text, speed = 80, delay = 600) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1))
          i++
        } else {
          setDone(true)
          clearInterval(interval)
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, speed, delay])

  return { displayed, done }
}

export default function Home() {
  const { displayed: typedName, done: nameDone } = useTypingEffect('josapton', 120, 400)
  const { displayed: typedMotto, done: mottoDone } = useTypingEffect(
    'Building secure, scalable systems and exploring the intersection of technology, data, and agriculture.',
    25,
    1800
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
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
      <Particles quantity={60} />

      {/* Navigation */}
      <nav className="animate-fade-in" style={{ marginBottom: 'auto', paddingTop: '2.5rem', zIndex: 10 }}>
        <ul style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="nav-link"
              style={{ fontSize: '0.8125rem' }}
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>

      {/* Center content */}
      <div style={{ zIndex: 10, textAlign: 'center', padding: '0 1.5rem', maxWidth: '680px' }}>
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
          <span style={{ textTransform: 'uppercase' }}>Available for collaboration</span>
        </div>

        {/* Hero name with typing effect */}
        <h1 className="hero-title" style={{ marginBottom: '1.25rem' }}>
          <span className="accent">{'>'}</span>{' '}
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
            {nameDone && <span className="cursor-blink" />}
          </p>
        </div>

        {/* Interest badges */}
        <div className="animate-fade-in-delay-4" style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.05em',
        }}>
          <span style={{ color: 'var(--color-accent)' }}>DevSecOps</span>
          <span style={{ color: 'var(--color-text-muted)' }}>·</span>
          <span style={{ color: 'var(--color-accent)' }}>Cybersecurity</span>
          <span style={{ color: 'var(--color-text-muted)' }}>·</span>
          <span style={{ color: 'var(--color-text-muted)' }}>Software Engineering</span>
          <span style={{ color: 'var(--color-text-muted)' }}>·</span>
          <span style={{ color: 'var(--color-text-muted)' }}>AI</span>
        </div>
      </div>


      {/* Spacer */}
      <div style={{ marginTop: 'auto' }} />
    </motion.div>
  )
}
