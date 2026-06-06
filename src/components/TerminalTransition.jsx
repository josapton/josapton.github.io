import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TerminalTransition({ children }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // When this component mounts (which happens on every route change because of AnimatePresence key in App.jsx),
    // it will start with loading = true, then switch to false after a brief delay.
    const timer = setTimeout(() => {
      setLoading(false)
    }, 450) // 450ms is enough to read the loading text
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="terminal-loader"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--color-bg)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              color: 'var(--color-text-muted)',
            }}
          >
            <span className="terminal-prompt">$</span>&nbsp;loading...<span className="cursor-blink" style={{ width: '6px', height: '1.2em', marginLeft: '4px' }} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: loading ? 0 : 1, y: loading ? 10 : 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  )
}
