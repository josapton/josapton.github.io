import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Terminal, Bot, Lock, Radar, Server, Database, Code, GitBranch, ShieldCheck, Brain, Workflow, Microscope, BookOpen, FileText, ChevronUp } from 'lucide-react'
import Navigation from '../components/Navigation'
import Card from '../components/Card'
import Footer from '../components/Footer'
import GithubStats from '../components/GithubStats'
import ScrollProgress from '../components/ScrollProgress'
import { useLanguage } from '../context/LanguageContext'
import { en } from '../locales/en'
import { id } from '../locales/id'

/* ==================== PROJECTS DATA ==================== */
const featured = {
  title: 'SecPipeline',
  description: 'An automated DevSecOps pipeline framework that integrates SAST, DAST, SCA, and container scanning into CI/CD workflows. Built with security-first principles to shift security left in the development lifecycle.',
  tags: ['DevSecOps', 'CI/CD', 'Security Automation', 'Docker'],
  href: 'https://github.com/josapton',
  icon: <Shield size={16} />,
}

const topProjects = [
  {
    title: 'ThreatMap',
    description: 'Real-time threat intelligence dashboard that aggregates and visualizes cybersecurity threat data from multiple OSINT feeds.',
    tags: ['Cybersecurity', 'Python', 'React'],
    href: 'https://github.com/josapton',
    icon: <Radar size={16} />,
  },
  {
    title: 'AgriSense AI',
    description: 'Machine learning platform for precision agriculture — crop disease detection and yield prediction using satellite imagery and IoT sensor data.',
    tags: ['AI/ML', 'TensorFlow', 'IoT'],
    href: 'https://github.com/josapton',
    icon: <Bot size={16} />,
  },
]

const projects = [
  {
    title: 'VaultGuard',
    description: 'Secrets management tool with HSM integration and automated rotation policies for cloud-native environments.',
    tags: ['Security', 'Go', 'K8s'],
    href: 'https://github.com/josapton',
    icon: <Lock size={16} />,
  },
  {
    title: 'InfraCode',
    description: 'Infrastructure-as-Code templates with built-in security compliance checks for AWS, GCP, and Azure.',
    tags: ['IaC', 'Terraform', 'CloudSec'],
    href: 'https://github.com/josapton',
    icon: <Server size={16} />,
  },
  {
    title: 'GitSentinel',
    description: 'Git pre-commit hooks framework for detecting secrets, vulnerabilities, and compliance violations before code push.',
    tags: ['DevSecOps', 'Git', 'Python'],
    href: 'https://github.com/josapton',
    icon: <GitBranch size={16} />,
  },
  {
    title: 'NetProbe',
    description: 'Network vulnerability scanner with automated penetration testing capabilities and detailed reporting.',
    tags: ['PenTest', 'Networking', 'Python'],
    href: 'https://github.com/josapton',
    icon: <Terminal size={16} />,
  },
  {
    title: 'DataForge',
    description: 'ETL pipeline for agricultural data processing — integrates weather APIs, soil databases, and market data.',
    tags: ['Data', 'Spark', 'API'],
    href: 'https://github.com/josapton',
    icon: <Database size={16} />,
  },
  {
    title: 'CodeArmor',
    description: 'Static analysis toolkit for identifying security anti-patterns in source code with auto-fix suggestions.',
    tags: ['SAST', 'AST', 'Security'],
    href: 'https://github.com/josapton',
    icon: <Code size={16} />,
  },
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="page-container"
    >
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
            <span className="accent">//</span> {t.portfolio.title}<span className="cursor-blink" />
          </h1>
          <p className="page-description">
            {t.portfolio.description}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button 
              onClick={() => scrollToSection('projects')}
              className="section-shortcut"
            >
              <span className="accent">{'>'}</span> {t.nav.projects}
            </button>
            <button 
              onClick={() => scrollToSection('research')}
              className="section-shortcut"
            >
              <span className="accent">{'>'}</span> {t.nav.research}
            </button>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <GithubStats />
          </div>
        </motion.div>

        {/* ==================== PROJECTS SECTION ==================== */}
        <section id="projects" style={{ marginBottom: '4rem', scrollMarginTop: '6rem' }}>
          <h2 className="section-title">
            <span className="accent">{'>'}</span> {t.nav.projects}
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            <div className="section-label">{t.portfolio.featured}</div>
            <Card {...featured} featured />
          </motion.div>

          {/* Top row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginTop: '0.75rem', marginBottom: '0.75rem' }}>
            {topProjects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.12 + i * 0.04 }}
              >
                <Card {...p} />
              </motion.div>
            ))}
          </div>

          <div className="section-divider" />

          {/* Grid */}
          <motion.div
            className="grid-projects"
            variants={stagger.container}
            initial="hidden"
            animate="show"
          >
            {projects.map((p) => (
              <motion.div key={p.title} variants={stagger.item}>
                <Card {...p} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        <div className="section-divider" style={{ margin: '3rem 0' }} />

        {/* ==================== RESEARCH SECTION ==================== */}
        <section id="research" style={{ scrollMarginTop: '6rem' }}>
          <h2 className="section-title">
            <span className="accent">{'>'}</span> {t.nav.research}
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
            <h3 style={{ fontSize: '0.875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)', marginBottom: '1.25rem', marginTop: '2rem' }}>
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
    </motion.div>
  )
}
