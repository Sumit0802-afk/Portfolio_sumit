import { useEffect, useState } from 'react'
import { projects, type Project } from '../data/projects.ts'
import { profile } from '../data/profile.ts'
import { fetchRepos, type GithubRepo } from './github.ts'

const REFRESH_MS = 60 * 1000

const normalize = (url: string) => url.toLowerCase().replace(/\/+$/, '')

// Repos that should never show up as projects, by name (case-insensitive).
// Portfolio_sumit is this site itself.
const HIDDEN_REPOS = new Set(['portfolio_sumit'])

// "my_cool-repo" → "My Cool Repo"; names that already have capitals are kept.
function prettyName(name: string): string {
  if (/[A-Z]/.test(name)) return name.replace(/[-_]+/g, ' ')
  return name.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function prettyTopic(topic: string): string {
  return topic.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function repoToProject(repo: GithubRepo): Project {
  const topics = repo.topics ?? []
  const stack = [...new Set([repo.language, ...topics.map(prettyTopic)].filter(Boolean) as string[])]
  return {
    slug: `gh-${repo.name.toLowerCase()}`,
    name: prettyName(repo.name),
    tagline: repo.description ?? '',
    description: repo.description ?? 'No description on GitHub yet.',
    features: [],
    stack,
    repo: repo.html_url,
    demo: repo.homepage?.trim() || null,
    status: 'operational',
    // GitHub's social preview card. The first path segment only busts its
    // cache, so a fresh push gets a fresh image.
    image: `https://opengraph.githubassets.com/${Date.parse(repo.pushed_at)}/${repo.full_name}`,
    category: topics[0] ? prettyTopic(topics[0]) : repo.language ?? 'GitHub repo',
    auto: true,
  }
}

// The curated projects from projects.ts, followed by every other public,
// non-fork GitHub repo (most recently pushed first). Re-checks GitHub every
// minute while the tab is visible so new repos appear without a redeploy.
// If GitHub can't be reached, the curated list still renders on its own.
export function useProjects(): Project[] {
  const [extra, setExtra] = useState<Project[]>([])

  useEffect(() => {
    const username = profile.github.replace('https://github.com/', '').replace(/\/$/, '')
    const listed = new Set(projects.map((p) => normalize(p.repo)))
    let cancelled = false

    const load = () => {
      fetchRepos(username)
        .then((repos) => {
          if (cancelled) return
          const next = repos
            .filter((r) => !listed.has(normalize(r.html_url)) && !HIDDEN_REPOS.has(r.name.toLowerCase()))
            .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
            .map(repoToProject)
          // Skip the update when nothing changed, so the scroller and reveal
          // animations aren't rebuilt every minute.
          setExtra((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next))
        })
        .catch(() => {
          // Keep whatever we already had; the curated list never depends on this.
        })
    }

    load()
    const refresh = () => {
      if (document.visibilityState === 'visible') load()
    }
    const id = window.setInterval(refresh, REFRESH_MS)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      cancelled = true
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [])

  return extra.length ? [...projects, ...extra] : projects
}
