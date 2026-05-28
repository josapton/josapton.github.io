import { motion } from 'framer-motion'
import { ShieldCheck, Brain, Workflow, Server, BookOpen, FileText, Microscope } from 'lucide-react'
import Navigation from '../components/Navigation'
import Card from '../components/Card'

const researchAreas = [
  {
    title: 'DevSecOps Pipeline Automation',
    description: 'Methods to embed security testing seamlessly into CI/CD pipelines without slowing down developer velocity. Policy-as-code, automated compliance, and shift-left strategies.',
    tags: ['DevSecOps', 'CI/CD', 'Policy-as-Code'],
    icon: <ShieldCheck size={16} />,
    href: 'https://owasp.org/www-project-devsecops-guideline/',
  },
  {
    title: 'Threat Detection & Incident Response',
    description: 'AI-driven approaches to real-time threat detection, anomaly identification in network traffic, and automated incident response orchestration.',
    tags: ['Cybersecurity', 'Threat Intel', 'SOAR'],
    icon: <Microscope size={16} />,
    href: 'https://attack.mitre.org/',
  },
  {
    title: 'AI/ML for Precision Agriculture',
    description: 'Deep learning and computer vision for crop health monitoring, pest detection, and yield optimization using drone and satellite imagery.',
    tags: ['AI', 'Computer Vision', 'Agriculture'],
    icon: <Brain size={16} />,
    href: 'https://www.fao.org/digital-agriculture/en/',
  },
  {
    title: 'Zero-Trust Architecture',
    description: 'Designing zero-trust patterns for distributed systems with microsegmentation, service mesh security, and cryptographic protocol implementation.',
    tags: ['Zero Trust', 'Architecture', 'Cryptography'],
    icon: <Server size={16} />,
    href: 'https://www.nist.gov/publications/zero-trust-architecture',
  },
]

const publications = [
  {
    title: 'Automating Security in Modern DevOps Workflows',
    venue: 'Research Interest',
    year: '2025',
    description: 'A framework for integrating automated security scanning into containerized deployment pipelines with minimal developer friction.',
    tags: ['DevSecOps', 'Containers'],
    icon: <FileText size={16} />,
    href: 'https://owasp.org/www-project-devsecops-guideline/',
  },
  {
    title: 'Machine Learning for Agricultural Data Analytics',
    venue: 'Research Interest',
    year: '2025',
    description: 'Survey of ML techniques applied to crop prediction and resource optimization in smart farming ecosystems.',
    tags: ['AI', 'Agriculture'],
    icon: <BookOpen size={16} />,
    href: 'https://www.fao.org/digital-agriculture/en/',
  },
  {
    title: 'Zero-Trust Network Architecture for Cloud-Native Apps',
    venue: 'Research Interest',
    year: '2024',
    description: 'Design patterns and implementation strategies for zero-trust security in Kubernetes-based environments.',
    tags: ['Cybersecurity', 'Cloud'],
    icon: <Workflow size={16} />,
    href: 'https://www.nist.gov/publications/zero-trust-architecture',
  },
]

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.06 } } },
  item: { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } },
}

export default function Research() {
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

      <div className="page-content">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="page-title"><span className="accent">//</span> Research<span className="cursor-blink" /></h1>
          <p className="page-description">
            Exploring the intersection of security, artificial intelligence, and agriculture — building knowledge at the boundary of technology and real-world impact.
          </p>
        </motion.div>

        {/* Research Areas */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
        >
          <div className="section-label">Research Areas</div>
        </motion.div>

        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}
          variants={stagger.container}
          initial="hidden"
          animate="show"
        >
          {researchAreas.map((area) => (
            <motion.div key={area.title} variants={stagger.item}>
              <Card {...area} />
            </motion.div>
          ))}
        </motion.div>

        <div className="section-divider" />

        {/* Publications */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="section-label">Publications & Interests</div>
        </motion.div>

        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          {publications.map((pub) => (
            <motion.div key={pub.title} variants={stagger.item}>
              <a
                href={pub.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                style={{ display: 'block', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 34,
                    height: 34,
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-accent-dim)',
                    color: 'var(--color-accent)',
                    flexShrink: 0,
                  }}>
                    {pub.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                      <h3 style={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        letterSpacing: '-0.01em',
                      }}>
                        {pub.title}
                      </h3>
                      <span style={{
                        fontSize: '0.6875rem',
                        color: 'var(--color-text-muted)',
                        fontFamily: 'var(--font-mono)',
                      }}>
                        {pub.venue} · {pub.year}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '0.8125rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '0.625rem',
                    }}>
                      {pub.description}
                    </p>
                    <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                      {pub.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
