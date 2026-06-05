import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Lock, Radar, Server, ShieldCheck, Brain, Workflow, Microscope, BookOpen, FileText, ChevronUp, FolderGit2 } from 'lucide-react'
import Navigation from '../components/Navigation'
import Card from '../components/Card'
import Footer from '../components/Footer'
import ScrollProgress from '../components/ScrollProgress'
import { useLanguage } from '../context/LanguageContext'
import { en } from '../locales/en'
import { id } from '../locales/id'

const caseStudies = [
  {
    title: 'SecPipeline (DevSecOps Framework)',
    problem: 'Manual security testing created bottlenecks in the deployment cycle, causing either delayed releases or vulnerable code reaching production.',
    solution: 'Designed and implemented an automated pipeline integrating SAST, DAST, and SCA tools directly into GitHub Actions and Jenkins. Built custom webhooks to block builds on critical vulnerabilities.',
    impact: 'Reduced mean-time-to-remediation (MTTR) by 40% and achieved 100% scanning coverage across 50+ microservices without slowing down developer velocity.',
    tags: ['DevSecOps', 'CI/CD', 'Docker', 'GitHub Actions'],
    href: 'https://github.com/josapton',
    icon: <Shield size={20} />,
  },
  {
    title: 'ThreatMap (OSINT Aggregator)',
    problem: 'Security analysts were spending 15+ hours weekly manually correlating threat data from multiple disjointed OSINT feeds.',
    solution: 'Developed a real-time data ingestion engine using Python and Apache Kafka to aggregate, normalize, and visualize global threat indicators (IoCs) on a React-based interactive map.',
    impact: 'Accelerated incident triage by 60% and provided the SOC team with a centralized, single-pane-of-glass view for emerging zero-day vulnerabilities.',
    tags: ['Python', 'React', 'Kafka', 'OSINT'],
    href: 'https://github.com/josapton',
    icon: <Radar size={20} />,
  },
  {
    title: 'VaultGuard (Secrets Management)',
    problem: 'Hardcoded secrets and decentralized API keys exposed the infrastructure to lateral movement attacks and credential stuffing.',
    solution: 'Architected an enterprise-grade secrets management solution integrating HashiCorp Vault with Kubernetes mutating admission webhooks to inject secrets at runtime.',
    impact: 'Eliminated 100% of hardcoded secrets across 3 environments and enforced automated 30-day credential rotation policies.',
    tags: ['Go', 'Kubernetes', 'HashiCorp Vault'],
    href: 'https://github.com/josapton',
    icon: <Lock size={20} />,
  }
]

/* ==================== RESEARCH DATA ==================== */
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

/* ==================== ANIMATIONS ==================== */
const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.04 } } },
  item: { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } },
}

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/* ==================== COMPONENT ==================== */
export default function Portfolio() {
  const { lang } = useLanguage()
  const t = lang === 'en' ? en : id
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="page-container">
      <div className="grid-bg" />
      <ScrollProgress />
      <Navigation />

      <main className="page-content">
        {/* Page Header */}
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="page-title" style={{ marginBottom: '0.625rem' }}>
            <span className="accent">~/</span> {t.portfolio.title}<span className="cursor-blink" />
          </h1>
          <p className="page-description">
            {t.portfolio.description}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => scrollToSection('projects')}
              className="section-shortcut"
            >
              <FolderGit2 size={14} className="accent" style={{ marginRight: '0.375rem' }} /> {t.portfolio.featured}
            </button>
            <button 
              onClick={() => scrollToSection('research')}
              className="section-shortcut"
            >
              <BookOpen size={14} className="accent" style={{ marginRight: '0.375rem' }} /> {t.portfolio.publications}
            </button>
          </div>
        </motion.div>

        {/* ==================== CASE STUDIES SECTION ==================== */}
        <section id="projects" style={{ marginBottom: '4rem', scrollMarginTop: '6rem' }}>
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center' }}>
            <FolderGit2 size={20} className="accent" style={{ marginRight: '0.5rem' }} /> {t.portfolio.featured}
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {caseStudies.map((study) => (
              <motion.div
                key={study.title}
                variants={stagger.item}
                initial="hidden"
                animate="show"
                className="card-featured"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                }}
              >
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', margin: 0, color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className="accent">{study.icon}</span>
                    {study.title}
                  </h3>
                  <a href={study.href} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="View Project">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>// Problem</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>{study.problem}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>// Solution</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>{study.solution}</p>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <h4 style={{ fontSize: '0.875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>// Impact</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--color-text-primary)', fontWeight: '500', lineHeight: 1.6, margin: 0 }}>{study.impact}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  {study.tags.map(tag => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </section>

        <div className="section-divider" style={{ margin: '3rem 0' }} />
        <section id="research" style={{ scrollMarginTop: '6rem' }}>
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center' }}>
            <BookOpen size={20} className="accent" style={{ marginRight: '0.5rem' }} /> {t.portfolio.publications}
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            <div className="section-label">{t.portfolio.researchAreas}</div>
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
            <h3 className="section-label" style={{ marginBottom: '1.25rem', marginTop: '2rem' }}>
              {t.portfolio.publications}
            </h3>
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
        </section>
      </main>
      <Footer />

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <ChevronUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
