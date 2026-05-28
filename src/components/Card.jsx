import { ExternalLink } from 'lucide-react'

export default function Card({
  title,
  description,
  tags = [],
  href,
  featured = false,
  icon,
  children,
}) {
  const Wrapper = href ? 'a' : 'div'
  const wrapperProps = href
    ? {
        href,
        target: href.startsWith('http') ? '_blank' : undefined,
        rel: href.startsWith('http') ? 'noopener noreferrer' : undefined,
      }
    : {}

  return (
    <Wrapper
      className={featured ? 'card-featured' : 'card'}
      {...wrapperProps}
      style={{ display: 'block', cursor: href ? 'pointer' : 'default' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.625rem', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', minWidth: 0 }}>
          {icon && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-accent-dim)',
              color: 'var(--color-accent)',
              flexShrink: 0,
            }}>
              {icon}
            </div>
          )}
          <h3 style={{
            fontSize: featured ? '1.0625rem' : '0.9375rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
            fontFamily: 'var(--font-mono)',
          }}>
            {title}
          </h3>
        </div>
        {href && (
          <ExternalLink
            size={13}
            style={{
              color: 'var(--color-text-muted)',
              flexShrink: 0,
              marginTop: 3,
              opacity: 0.6,
            }}
          />
        )}
      </div>

      {description && (
        <p style={{
          fontSize: '0.8125rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.65,
          marginBottom: tags.length > 0 ? '0.75rem' : 0,
        }}>
          {description}
        </p>
      )}

      {tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
          {tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}

      {children}
    </Wrapper>
  )
}
