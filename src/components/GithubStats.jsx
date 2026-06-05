import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code, AlertCircle, GitCommit, GitPullRequest, Eye, Calendar } from 'lucide-react'
import { GitHubCalendar } from 'react-github-calendar'
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
    forks: 0,
    topLanguage: '',
    languageBreakdown: [],
    gists: 0,
    openIssues: 0,
    lastActiveDiffDays: null,
    advanced: {
      totalCommits: 0,
      totalPullRequests: 0,
      totalIssues: 0,
      totalCodeReviews: 0,
      lastUpdated: null
    },
    loading: true,
    error: false
  })

  useEffect(() => {
    const fetchGithubStats = async () => {
      const cached = sessionStorage.getItem('github-stats-v3')
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
        const [profileRes, reposRes, advancedRes] = await Promise.all([
          fetch('https://api.github.com/users/josapton'),
          fetch('https://api.github.com/users/josapton/repos?per_page=100'),
          fetch('/github-stats-advanced.json').catch(() => null)
        ])
        if (!profileRes.ok || !reposRes.ok) throw new Error('Failed to fetch profile')
        
        const data = await profileRes.json()
        const reposData = await reposRes.json()
        
        let advancedData = { totalCommits: 0, totalPullRequests: 0, totalIssues: 0, totalCodeReviews: 0, lastUpdated: null }
        if (advancedRes && advancedRes.ok) {
          try {
            advancedData = await advancedRes.json()
          } catch { /* ignore */ }
        }
        
        let totalStars = 0
        let totalForks = 0
        let totalOpenIssues = 0
        let latestPush = null
        const languageCounts = {}

        reposData.forEach(repo => {
          totalStars += repo.stargazers_count
          totalForks += repo.forks_count
          totalOpenIssues += repo.open_issues_count
          
          if (repo.language) {
            languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1
          }

          if (repo.pushed_at) {
            const pushDate = new Date(repo.pushed_at).getTime()
            if (!latestPush || pushDate > latestPush) {
              latestPush = pushDate
            }
          }
        })

        // Process language breakdown
        const topLang = Object.keys(languageCounts).reduce((a, b) => languageCounts[a] > languageCounts[b] ? a : b, '')
        const totalLangRepos = Object.values(languageCounts).reduce((a, b) => a + b, 0)
        
        const languageBreakdown = advancedData.languageBreakdown || Object.entries(languageCounts)
          .map(([language, count]) => ({
            name: language,
            percentage: Math.round((count / totalLangRepos) * 100)
          }))
          .sort((a, b) => b.percentage - a.percentage)

        let diffDays = null
        if (latestPush) {
          const diffTime = Math.abs(Date.now() - latestPush)
          diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
        }

        const statsData = {
          repos: data.public_repos,
          followers: data.followers,
          stars: totalStars,
          forks: totalForks,
          topLanguage: topLang || 'N/A',
          languageBreakdown: languageBreakdown,
          gists: data.public_gists,
          openIssues: totalOpenIssues,
          lastActiveDiffDays: diffDays,
          advanced: advancedData
        }

        sessionStorage.setItem('github-stats-v3', JSON.stringify({
          data: statsData,
          timestamp: Date.now()
        }))

        setStats({ ...statsData, loading: false, error: false })
      } catch {
        const fallbackStats = {
          repos: '10+',
          followers: '15+',
          stars: '30+',
          forks: '5+',
          topLanguage: 'JavaScript',
          languageBreakdown: [
            { name: 'JavaScript', percentage: 50 },
            { name: 'TypeScript', percentage: 30 },
            { name: 'Python', percentage: 20 }
          ],
          gists: '5+',
          openIssues: 'N/A',
          lastActiveDiffDays: 0,
          advanced: { totalCommits: '500+', totalPullRequests: '20+', totalIssues: '10+', totalCodeReviews: '5+' }
        }
        setStats({ ...fallbackStats, loading: false, error: true, isFallback: true })
      }
    }

    fetchGithubStats()
  }, [])



  const advancedCards = [
    { id: 'commits', icon: GitCommit, label: t.github.totalCommits || 'Total Commits', value: stats.advanced.totalCommits },
    { id: 'prs', icon: GitPullRequest, label: t.github.totalPRs || 'Pull Requests', value: stats.advanced.totalPullRequests },
    { id: 'issues_raised', icon: AlertCircle, label: t.github.totalIssues || 'Issues Raised', value: stats.advanced.totalIssues },
    { id: 'reviews', icon: Eye, label: t.github.totalReviews || 'Code Reviews', value: stats.advanced.totalCodeReviews },
  ]

  // Color theme for github calendar based on our CSS variables
  const calendarTheme = {
    light: ['#1a1f1d', '#004d2e', '#00804d', '#00b36b', '#00e68a'],
    dark: ['#1a1f1d', '#004d2e', '#00804d', '#00b36b', '#00e68a']
  }

  // GitHub official language colors
  const githubColors = {
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    SCSS: '#c6538c',
    TypeScript: '#3178c6',
    'Jupyter Notebook': '#DA5B0B',
    'C++': '#f34b7d',
    C: '#555555',
    Java: '#b07219',
    PHP: '#4F5D95',
    Go: '#00ADD8',
    Rust: '#dea584',
    Ruby: '#701516',
    'C#': '#178600',
    Shell: '#89e051',
    Vue: '#41b883',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB'
  }

  // Extended fallback palette
  const fallbackColors = [
    'var(--color-accent)', 
    'var(--color-accent-dim)', 
    'var(--color-accent-secondary)', 
    '#34d399', '#10b981', '#059669',
    'var(--color-text-muted)',
    '#475569', '#334155', '#1e293b'
  ]

  const getLangColor = (langName, idx) => {
    if (githubColors[langName]) return githubColors[langName]
    return fallbackColors[idx % fallbackColors.length]
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
      
      {stats.isFallback && (
        <div className="animate-fade-in" style={{ 
          padding: '0.75rem 1rem', 
          background: 'rgba(255, 170, 0, 0.1)', 
          borderLeft: '2px solid var(--color-accent-warn, #ffaa00)', 
          color: 'var(--color-accent-warn, #ffaa00)', 
          fontSize: '0.75rem', 
          fontFamily: 'var(--font-mono)',
          borderRadius: '0 var(--radius-sm) var(--radius-sm) 0'
        }}>
          {'>'} [WARN] GitHub API rate limit exceeded. Displaying baseline historical data.
        </div>
      )}


      {/* 2. Advanced Stat Cards */}
      {!stats.loading && stats.advanced.totalCommits > 0 && (
        <>
          <div className="grid-stats" style={{ marginTop: '1rem' }}>
          {advancedCards.map((card, index) => (
            <motion.div 
              key={card.id}
              className="card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) }}
              style={{ 
                padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem',
                border: '1px solid var(--color-accent-dim)' // Highlight these advanced stats slightly
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                <card.icon size={14} className="accent" />
                {card.label}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
                  {card.value}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        </>
      )}

      {/* 3. Language Breakdown Progress Bar */}
      {!stats.loading && stats.languageBreakdown.length > 0 && (
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
            <Code size={14} className="accent" /> {t.github.languageBreakdown}
          </div>
          
          <div style={{ display: 'flex', height: '8px', width: '100%', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'var(--color-bg-secondary)' }}>
            {stats.languageBreakdown.map((lang, idx) => (
              <div 
                key={lang.name} 
                style={{ 
                  width: `${lang.percentage}%`, 
                  backgroundColor: getLangColor(lang.name, idx),
                  transition: 'width 1s ease-in-out'
                }} 
                title={`${lang.name} ${lang.percentage}%`}
              />
            ))}
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
            {stats.languageBreakdown.map((lang, idx) => (
              <div key={lang.name} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                <span style={{ 
                  display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%',
                  backgroundColor: getLangColor(lang.name, idx)
                }} />
                <span style={{ color: 'var(--color-text-primary)' }}>{lang.name}</span>
                <span style={{ color: 'var(--color-text-muted)' }}>{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 4. GitHub Contributions Calendar */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowX: 'auto' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
          <Calendar size={14} className="accent" /> {t.github.contributions}
        </div>
        <div style={{ minWidth: '700px' }}>
          <GitHubCalendar 
            username="josapton" 
            colorScheme="dark"
            theme={calendarTheme}
            fontSize={12}
            blockSize={12}
            blockMargin={4}
            hideColorLegend={false}
            hideTotalCount={false}
          />
        </div>
      </motion.div>

    </div>
  )
}
