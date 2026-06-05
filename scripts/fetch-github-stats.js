import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const USERNAME = 'josapton'
// eslint-disable-next-line no-undef
const TOKEN = process.env.GITHUB_TOKEN // Injected by GitHub Actions

async function fetchJSON(url) {
  try {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-Stats-Fetcher'
    }
    if (TOKEN) headers['Authorization'] = `token ${TOKEN}`

    const response = await fetch(url, { headers })
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error(`Error fetching ${url}:`, error)
    return null
  }
}

async function main() {
  console.log(`Fetching advanced GitHub stats for ${USERNAME}...`)

  const [commitsReq, prsReq, issuesReq, reviewsReq, reposReq] = await Promise.all([
    fetchJSON(`https://api.github.com/search/commits?q=author:${USERNAME}`),
    fetchJSON(`https://api.github.com/search/issues?q=author:${USERNAME}+type:pr`),
    fetchJSON(`https://api.github.com/search/issues?q=author:${USERNAME}+type:issue`),
    fetchJSON(`https://api.github.com/search/issues?q=reviewed-by:${USERNAME}`),
    fetchJSON(`https://api.github.com/users/${USERNAME}/repos?per_page=100`)
  ])

  const commits = commitsReq?.total_count || 0
  const prs = prsReq?.total_count || 0
  const issues = issuesReq?.total_count || 0
  const reviews = reviewsReq?.total_count || 0
  
  // Calculate Deep Language Breakdown (including Forks)
  const languageCounts = {}
  const repos = reposReq || []
  
  for (const repo of repos) {
    // If it's a fork, only count it if the user has pushed to it after forking
    if (repo.fork) {
      const isModified = new Date(repo.pushed_at) > new Date(repo.created_at)
      if (!isModified) continue // Skip untouched forks
    }

    let primaryLang = repo.language
    
    // If language is null (common for forks), deeply fetch it via languages_url
    if (!primaryLang && repo.languages_url) {
      const langs = await fetchJSON(repo.languages_url)
      if (langs && Object.keys(langs).length > 0) {
        // Find language with most bytes
        primaryLang = Object.keys(langs).reduce((a, b) => langs[a] > langs[b] ? a : b)
      }
    }

    if (primaryLang) {
      languageCounts[primaryLang] = (languageCounts[primaryLang] || 0) + 1
    }
  }

  const totalLangRepos = Object.values(languageCounts).reduce((a, b) => a + b, 0)
  const languageBreakdown = Object.entries(languageCounts)
    .map(([language, count]) => ({
      name: language,
      percentage: Math.round((count / totalLangRepos) * 100)
    }))
    .sort((a, b) => b.percentage - a.percentage)

  const stats = {
    totalCommits: commits,
    totalPullRequests: prs,
    totalIssues: issues,
    totalCodeReviews: reviews,
    languageBreakdown: languageBreakdown, // The deep calculated one
    lastUpdated: new Date().toISOString()
  }

  const outputPath = path.join(__dirname, '../public/github-stats-advanced.json')
  fs.writeFileSync(outputPath, JSON.stringify(stats, null, 2))
  
  console.log('Successfully saved stats to public/github-stats-advanced.json')
  console.log(stats)
}

main()
