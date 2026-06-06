import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Printer, ZoomIn, ZoomOut } from 'lucide-react'
import ResumeContent from './ResumeContent'

export default function ResumeViewer() {
  const [open, setOpen] = useState(false)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    const handleOpen = () => {
      setZoom(1)
      setOpen(true)
    }
    window.addEventListener('open-resume', handleOpen)
    return () => window.removeEventListener('open-resume', handleOpen)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])


  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="resume-modal-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(10, 15, 13, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Toolbar */}
          <div className="resume-toolbar" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            backgroundColor: 'transparent',
            borderBottom: '1px solid rgba(0, 255, 157, 0.1)'
          }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                <span className="accent">~/</span> CV_JOSAPTON.md
              </span>
            </div>

            <div className="resume-toolbar-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="resume-zoom-controls" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '0.25rem', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} aria-label="Zoom Out" style={{ background: 'none', border: 'none', color: 'var(--color-text-primary)', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}>
                  <ZoomOut size={16} />
                </button>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', width: '40px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                  {Math.round(zoom * 100)}%
                </span>
                <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} aria-label="Zoom In" style={{ background: 'none', border: 'none', color: 'var(--color-text-primary)', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}>
                  <ZoomIn size={16} />
                </button>
              </div>

              <button 
                onClick={() => window.print()}
                className="resume-print-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: 'rgba(0, 255, 157, 0.1)',
                  color: 'var(--color-accent)',
                  border: '1px solid var(--color-accent)',
                  borderRadius: 'var(--radius)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                <Printer size={16} /> <span className="resume-print-text">Print / PDF</span>
              </button>
              
              <button 
                onClick={() => setOpen(false)} 
                aria-label="Close" 
                style={{ marginLeft: '1rem', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Document Area */}
          <div className="resume-scroll-container" style={{
            flex: 1,
            overflow: 'auto',
            display: 'flex',
            justifyContent: 'center',
            padding: '2rem'
          }}>
            <div style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              transition: 'transform 0.2s ease-out'
            }} className="resume-scale-wrapper">
              <ResumeContent />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
