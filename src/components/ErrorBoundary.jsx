import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#0a0f0d',
          color: '#ff4d4d',
          fontFamily: 'var(--font-mono, monospace)',
          padding: '2rem',
          textAlign: 'center',
          border: '4px solid #ff4d4d'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            [FATAL] KERNEL PANIC
          </h1>
          <p style={{ fontSize: '1rem', marginBottom: '2rem', maxWidth: '600px', opacity: 0.8 }}>
            Unhandled exception in user space. The interface has crashed to prevent memory corruption.
          </p>
          <div style={{
            background: 'rgba(255, 77, 77, 0.1)',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '2rem',
            maxWidth: '800px',
            overflowX: 'auto',
            textAlign: 'left'
          }}>
            <code style={{ fontSize: '0.875rem' }}>
              {this.state.error?.toString()}
            </code>
          </div>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'transparent',
              border: '1px solid #ff4d4d',
              color: '#ff4d4d',
              fontFamily: 'var(--font-mono, monospace)',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 77, 77, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent'
            }}
          >
            Reboot System
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
