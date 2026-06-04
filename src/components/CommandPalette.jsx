import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Home, Briefcase, Mail, Moon, Sun, Globe, FileText } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { en } from '../locales/en'
import { id } from '../locales/id'

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  
  const { lang, toggleLang } = useLanguage()
  const t = lang === 'en' ? en.cmd : id.cmd

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle on Ctrl+K, Cmd+K, or Alt+K
      if ((e.ctrlKey || e.metaKey || e.altKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      
      // Close on Escape
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100)
    } else {
      setSearch('')
      setSelectedIndex(0)
    }
  }, [open])

  // Helper to trigger action and close
  const execute = (action) => {
    action()
    setOpen(false)
  }

  // Define commands
  const commands = [
    {
      group: t.navigation,
      items: [
        { id: 'home', label: t.goHome, icon: <Home size={16} />, action: () => navigate('/') },
        { id: 'portfolio', label: t.goPortfolio, icon: <Briefcase size={16} />, action: () => navigate('/portfolio') },
        { id: 'contact', label: t.goContact, icon: <Mail size={16} />, action: () => navigate('/contact') },
      ]
    },
    {
      group: t.actions,
      items: [
        { 
          id: 'theme', 
          label: t.toggleTheme, 
          icon: document.documentElement.getAttribute('data-theme') === 'light' ? <Moon size={16} /> : <Sun size={16} />, 
          action: () => {
            const current = document.documentElement.getAttribute('data-theme')
            const next = current === 'dark' ? 'light' : 'dark'
            document.documentElement.setAttribute('data-theme', next)
            localStorage.setItem('theme', next)
          } 
        },
        { 
          id: 'lang', 
          label: t.toggleLang + ` (${lang === 'en' ? 'ID' : 'EN'})`, 
          icon: <Globe size={16} />, 
          action: toggleLang 
        },
        {
          id: 'resume',
          label: t.downloadResume || 'Download Resume',
          icon: <FileText size={16} />,
          action: () => window.open('/resume.pdf', '_blank')
        }
      ]
    }
  ]

  // Filter commands
  const filteredCommands = commands.map(group => ({
    ...group,
    items: group.items.filter(item => item.label.toLowerCase().includes(search.toLowerCase()))
  })).filter(group => group.items.length > 0)

  // Flat list of all visible items for keyboard navigation
  const flatItems = filteredCommands.flatMap(group => group.items)

  // Reset selection when search changes
  useEffect(() => {
    // eslint-disable-next-line
    setSelectedIndex(0)
  }, [search])

  // Keyboard navigation within the palette
  const handleInputKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % flatItems.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + flatItems.length) % flatItems.length)
    } else if (e.key === 'Enter' && flatItems.length > 0) {
      e.preventDefault()
      execute(flatItems[selectedIndex].action)
    }
  }, [flatItems, selectedIndex])

  if (!open) return null

  // Track the global index across groups for highlighting
  let globalIndex = -1

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
        style={{
          position: 'fixed',
          top: 0, left: 0, width: '100%', height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: '10vh'
        }}
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          style={{
            width: '90%',
            maxWidth: '600px',
            backgroundColor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,255,157,0.1)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header / Input */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>
            <Search size={20} style={{ color: 'var(--color-text-muted)', marginRight: '0.75rem' }} />
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder={t.placeholder}
              aria-label="Search commands"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem'
              }}
            />
            <button 
              onClick={() => setOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
                borderRadius: '4px',
                padding: '0.25rem',
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer'
              }}
            >
              ESC
            </button>
          </div>

          {/* Results list */}
          <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '0.5rem' }}>
            {filteredCommands.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>
                {t.noResults}
              </div>
            ) : (
              filteredCommands.map((group) => (
                <div key={group.group} style={{ marginBottom: '0.5rem' }}>
                  <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
                    {group.group}
                  </div>
                  {group.items.map((item) => {
                    globalIndex++
                    const currentIndex = globalIndex
                    const isSelected = currentIndex === selectedIndex
                    return (
                      <button
                        key={item.id}
                        onClick={() => execute(item.action)}
                        onMouseEnter={() => setSelectedIndex(currentIndex)}
                        data-index={currentIndex}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.75rem',
                          background: isSelected ? 'var(--color-accent-dim)' : 'transparent',
                          border: 'none',
                          borderRadius: 'var(--radius-sm)',
                          color: isSelected ? 'var(--color-accent)' : 'var(--color-text-primary)',
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8125rem',
                          transition: 'all 0.1s ease'
                        }}
                      >
                        <div style={{ color: isSelected ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}>
                          {item.icon}
                        </div>
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              ))
            )}
          </div>
          
          {/* Footer */}
          <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
            <div>
              <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--color-border)', marginRight: '4px' }}>↑</span>
              <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--color-border)', marginRight: '8px' }}>↓</span>
              {t.toNavigate || 'to navigate'}
            </div>
            <div>
              <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--color-border)', marginRight: '4px' }}>↵</span>
              {t.toSelect || 'to select'}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
