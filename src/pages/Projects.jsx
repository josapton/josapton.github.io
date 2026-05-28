import { motion } from 'framer-motion'
import { Shield, Terminal, Bot, Lock, Radar, Server, Database, Code, GitBranch } from 'lucide-react'
import Navigation from '../components/Navigation'
import Card from '../components/Card'

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

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.04 } } },
  item: { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } },
}

export default function Projects() {
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
          <h1 className="page-title"><span className="accent">//</span> Projects<span className="cursor-blink" /></h1>
          <p className="page-description">
            Tools and systems focused on security automation, infrastructure hardening, and intelligent data pipelines.
          </p>
        </motion.div>

        {/* Featured */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          style={{ marginBottom: '1rem' }}
        >
          <div className="section-label">Featured</div>
          <Card {...featured} featured />
        </motion.div>

        {/* Top row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
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
      </div>
    </motion.div>
  )
}
