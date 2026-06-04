import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, BookOpen, Activity, Star } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { en } from '../locales/en'
import { id } from '../locales/id'

export default function GithubStats() {
  const { lang } = useLanguage()
  const t = lang === 'en' ? en : id
  
  const [stats, setStats] = useState({
    repos: 0,
    followers: 0,
    stars: 0,
    loading: true,
    error: false
  })

  useEffect(() => {
    const fetchGithubStats = async () => {
      // Check cache first
      const cached = sessionStorage.getItem('github-stats')
      if (cached) {
        try {
          const parsed = JSON.parse(cached)
          if (Date.now() - parsed.timestamp < 300000) { // 5 min cache
            setStats({ ...parsed.data, loading: false, error: false })
            return
          }
        } catch { /* ignore bad cache */ }
      }

      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/josapton'),
          fetch('https://api.github.com/users/josapton/repos?per_page=100')
        ])
        if (!profileRes.ok || !reposRes.ok) throw new Error('Failed to fetch')
        
        const data = await profileRes.json()
        const reposData = await reposRes.json()
        const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0)

        const statsData = {
          repos: data.public_repos,
          followers: data.followers,
          stars: totalStars,
        }

        // Cache result
        sessionStorage.setItem('github-stats', JSON.stringify({
          data: statsData,
          timestamp: Date.now()
        }))

        setStats({ ...statsData, loading: false, error: false })
      } catch {
        setStats({
          repos: 12,
          followers: '10+',
          stars: '...',
          loading: false,
          error: true
        })
      }
    }

    fetchGithubStats()
  }, [])

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '0.75rem',
      marginBottom: '2rem'
    }}>
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
          <Activity size={14} className="accent" />
          {t.github.liveActivity}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
            {stats.loading ? '...' : 'Active'}
          </span>
        </div>
      </motion.div>

      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
          <BookOpen size={14} className="accent" />
          {t.github.repos}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
            {stats.loading ? '...' : stats.repos}
          </span>
        </div>
      </motion.div>
      
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
          <Star size={14} className="accent" />
          {t.github.stars}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
            {stats.loading ? '...' : stats.stars}
          </span>
        </div>
      </motion.div>

      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
          <Users size={14} className="accent" />
          {t.github.followers}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
            {stats.loading ? '...' : stats.followers}
          </span>
        </div>
      </motion.div>
    </div>
  )
}
