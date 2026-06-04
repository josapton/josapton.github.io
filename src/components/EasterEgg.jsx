import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, X } from 'lucide-react'

const COMMANDS = {
  help: () => [
    'Available commands:',
    '  help       — Show this help message',
    '  whoami     — Display current user',
    '  neofetch   — System information',
    '  ls         — List portfolio sections',
    '  skills     — Show tech stack',
    '  projects   — List projects',
    '  cat motto  — Display motto',
    '  uptime     — System uptime',
    '  ping       — Test connectivity',
    '  clear      — Clear terminal',
    '  exit       — Close terminal',
  ],
  whoami: () => ['root (sysadmin)'],
  neofetch: () => {
    const now = new Date()
    return [
      '        ╔══════════════════╗',
      '        ║   josapton-sec   ║',
      '        ╚══════════════════╝',
      '',
      `  OS      : Portfolio OS v2.0`,
      `  Host    : josapton.github.io`,
      `  Kernel  : React 19 + Vite 8`,
      `  Shell   : /bin/devsecops`,
      `  Theme   : Cybersecurity Terminal`,
      `  Uptime  : since 2021`,
      `  Date    : ${now.toLocaleDateString()}`,
      `  Memory  : ∞ curiosity`,
    ]
  },
  ls: () => [
    'drwxr-xr-x  projects/',
    'drwxr-xr-x  research/',
    'drwxr-xr-x  publications/',
    '-rw-r--r--  resume.pdf',
    '-rw-r--r--  contact.md',
  ],
  skills: () => [
    '┌─ Languages ─────────────────────┐',
    '│ Python · JavaScript · Go · Bash │',
    '├─ Security ──────────────────────┤',
    '│ SAST · DAST · SCA · PenTest    │',
    '├─ DevOps ────────────────────────┤',
    '│ Docker · K8s · Terraform · CI/CD│',
    '├─ AI/ML ─────────────────────────┤',
    '│ TensorFlow · PyTorch · CV       │',
    '└────────────────────────────────┘',
  ],
  projects: () => [
    '  [1] SecPipeline     — DevSecOps CI/CD framework',
    '  [2] ThreatMap       — Real-time threat intelligence',
    '  [3] AgriSense AI    — ML for precision agriculture',
    '  [4] VaultGuard      — Secrets management tool',
    '  [5] InfraCode       — IaC security templates',
    '  [6] GitSentinel     — Pre-commit security hooks',
    '  [7] NetProbe        — Network vulnerability scanner',
    '  [8] DataForge       — Agricultural data ETL',
    '  [9] CodeArmor       — Static analysis toolkit',
  ],
  'cat motto': () => [
    '"Building secure, scalable systems at the intersection',
    ' of technology, data, and agriculture."',
  ],
  uptime: () => {
    const start = new Date('2021-08-02')
    const now = new Date()
    const days = Math.floor((now - start) / 86400000)
    return [`up ${days} days, since Aug 2021`]
  },
  ping: () => [
    'PING josapton.github.io (185.199.108.153): 56 data bytes',
    '64 bytes: icmp_seq=0 ttl=64 time=1.337ms',
    '64 bytes: icmp_seq=1 ttl=64 time=0.42ms',
    '--- josapton.github.io ping statistics ---',
    '2 packets transmitted, 2 received, 0% packet loss',
  ],
  sudo: () => ['[sudo] Nice try. You already have root access. 😎'],
  rm: () => ['rm: permission denied. This portfolio is protected. 🔒'],
  'rm -rf': () => ['rm: permission denied. This portfolio is protected. 🔒'],
  hack: () => ['Access denied. You ARE the hacker. 💀'],
  matrix: () => [
    '01001010 01101111 01110011 01100001 01110000 01110100 01101111 01101110',
    'Decoding... josapton',
    'Wake up, Neo... The Matrix has you.',
  ],
}

export default function EasterEgg() {
  const [active, setActive] = useState(false)
  const inputBufferRef = useRef('')
  const [messages, setMessages] = useState([])
  const bodyRef = useRef(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [messages])

  // Konami code or specific string listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (active) return

      // Tilde directly opens it
      if (e.key === '`' || e.key === '~') {
        setActive(true)
        setMessages([
          { type: 'system', text: '██ Terminal access granted.' },
          { type: 'system', text: '██ Welcome to josapton-sec mainframe.' },
          { type: 'system', text: '██ Type "help" for available commands.' },
          { type: 'system', text: '' },
        ])
        return
      }

      // Check for "sudo" sequence
      const newBuffer = (inputBufferRef.current + e.key).slice(-4)
      inputBufferRef.current = newBuffer

      if (newBuffer.toLowerCase() === 'sudo') {
        setActive(true)
        setMessages([
          { type: 'system', text: '██ Elevating privileges...' },
          { type: 'system', text: '██ Root access granted.' },
          { type: 'system', text: '██ Type "help" for available commands.' },
          { type: 'system', text: '' },
        ])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [active])

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    
    if (trimmed === 'exit') {
      setActive(false)
      return
    }

    if (trimmed === 'clear') {
      setMessages([])
      return
    }

    const handler = COMMANDS[trimmed]
    if (handler) {
      const output = handler()
      setMessages(prev => [
        ...prev,
        { type: 'user', text: `$ ${cmd}` },
        ...output.map(line => ({ type: 'system', text: line })),
        { type: 'system', text: '' },
      ])
    } else if (trimmed === '') {
      // do nothing for empty
    } else {
      setMessages(prev => [
        ...prev,
        { type: 'user', text: `$ ${cmd}` },
        { type: 'system', text: `bash: ${trimmed}: command not found. Type "help" for available commands.` },
        { type: 'system', text: '' },
      ])
    }
  }

  if (!active) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="easter-egg-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Terminal Easter Egg"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: 'rgba(10, 15, 13, 0.95)',
          backdropFilter: 'blur(10px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{
          width: '90%',
          maxWidth: '800px',
          height: '70vh',
          backgroundColor: '#0a0f0d',
          border: '1px solid var(--color-accent)',
          borderRadius: 'var(--radius)',
          boxShadow: '0 0 30px rgba(0, 255, 157, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '0.75rem 1rem',
            borderBottom: '1px solid rgba(0, 255, 157, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(0, 255, 157, 0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent)' }}>
              <Terminal size={16} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>root@josapton-sec:~</span>
            </div>
            <button
              onClick={() => setActive(false)}
              aria-label="Close terminal"
              style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div 
            ref={bodyRef}
            style={{
              padding: '1.5rem',
              flex: 1,
              overflowY: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              lineHeight: 1.6,
              color: 'var(--color-accent)'
            }}
          >
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: '0.125rem', color: msg.type === 'user' ? 'var(--color-text-primary)' : 'var(--color-accent)', whiteSpace: 'pre' }}>
                {msg.text}
              </div>
            ))}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <span style={{ color: 'var(--color-text-primary)' }}>$</span>
              <input
                autoFocus
                type="text"
                aria-label="Terminal input"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-accent)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  width: '100%'
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCommand(e.target.value)
                    e.target.value = ''
                  }
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
