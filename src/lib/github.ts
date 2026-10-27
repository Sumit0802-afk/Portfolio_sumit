// All data here comes from GitHub's public REST API and a public,
// CORS-enabled contribution-calendar provider (github-contributions-api.jogruber.de).
// Nothing is fabricated — if a fetch fails, callers get an error and must show
// an explicit "unavailable" state rather than inventing numbers.

export interface GithubUser {
  login: string
  name: string | null
  bio: string | null
  avatar_url: string
  html_url: string
  followers: number
  following: number
  public_repos: number
  created_at: string
}

export interface GithubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics?: string[]
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  pushed_at: string
  fork: boolean
}

export interface GithubEvent {
  id: string
  type: string
  repo: { name: string; url: string }
  created_at: string
  payload: Record<string, unknown>
}

export interface ContributionDay {
  date: string
  count: number
  level: number
}

export interface ContributionData {
  days: ContributionDay[]
  total: number
}

const CACHE_TTL_MS = 60 * 1000 // 1 minute — fresh enough that GitHub changes show up almost at once

// In production (Vercel), GitHub REST calls go through our own /api/gh proxy
// (api/gh.ts) so a GITHUB_TOKEN can be added server-side to raise the shared
// rate limit from 60/hr to 5000/hr. In local dev there's no serverless runtime
// serving /api, so we call api.github.com directly. If a VITE_GITHUB_TOKEN is
// set in .env.local (gitignored, dev-only — never shipped in the prod build
// since prod always uses the proxy instead), that request is authenticated
// too, so local development also gets the 5000/hr limit instead of 60/hr.
const DEV_TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string | undefined

function githubApiUrl(path: string): string {
  return import.meta.env.PROD ? `/api/gh?path=${encodeURIComponent(path)}` : `https://api.github.com/${path}`
}

async function getJson<T>(cacheKey: string, url: string): Promise<T> {
  try {
    const cached = sessionStorage.getItem(`gh:${cacheKey}`)
    if (cached) {
      const { data, savedAt } = JSON.parse(cached) as { data: T; savedAt: number }
      if (Date.now() - savedAt < CACHE_TTL_MS) return data
    }
  } catch {
    // sessionStorage can throw in private browsing — fall through to a live fetch
  }

  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  if (!import.meta.env.PROD && DEV_TOKEN) headers.Authorization = `Bearer ${DEV_TOKEN}`

  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`GitHub request failed (${res.status})`)
  const data = (await res.json()) as T

  try {
    sessionStorage.setItem(`gh:${cacheKey}`, JSON.stringify({ data, savedAt: Date.now() }))
  } catch {
    // storage full or unavailable — caching is a nice-to-have, not required
  }

  return data
}

export function fetchUser(username: string): Promise<GithubUser> {
  const path = `users/${username}`
  return getJson<GithubUser>(path, githubApiUrl(path))
}

export async function fetchRepos(username: string): Promise<GithubRepo[]> {
  const path = `users/${username}/repos?per_page=100&sort=updated`
  const repos = await getJson<GithubRepo[]>(path, githubApiUrl(path))
  return repos.filter((r) => !r.fork)
}

export function fetchEvents(username: string): Promise<GithubEvent[]> {
  const path = `users/${username}/events/public?per_page=30`
  return getJson<GithubEvent[]>(path, githubApiUrl(path))
}

export async function fetchContributions(username: string): Promise<ContributionData> {
  const url = `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
  const data = await getJson<{ total: Record<string, number>; contributions: ContributionDay[] }>(url, url)
  const total = data.total?.lastYear ?? data.contributions.reduce((sum, d) => sum + d.count, 0)
  return { days: data.contributions, total }
}

export function computeStreaks(days: ContributionDay[]): { current: number; longest: number } {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date))
  let longest = 0
  let running = 0
  for (const d of sorted) {
    if (d.count > 0) {
      running += 1
      longest = Math.max(longest, running)
    } else {
      running = 0
    }
  }

  let current = 0
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].count > 0) current += 1
    else break
  }

  return { current, longest }
}

export function monthlyTotals(days: ContributionDay[]): { label: string; count: number }[] {
  const buckets = new Map<string, number>()
  for (const d of days) {
    const month = d.date.slice(0, 7)
    buckets.set(month, (buckets.get(month) ?? 0) + d.count)
  }
  const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return [...buckets.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, count]) => ({ label: MONTH_NAMES[Number(key.slice(5, 7)) - 1], count }))
}

export function weekdayTotals(days: ContributionDay[]): { label: string; count: number }[] {
  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const totals = new Array(7).fill(0)
  for (const d of days) {
    const dow = new Date(`${d.date}T00:00:00Z`).getUTCDay()
    totals[dow] += d.count
  }
  return DAY_NAMES.map((label, i) => ({ label, count: totals[i] }))
}

export function languageDistribution(repos: GithubRepo[]): { language: string; count: number; pct: number }[] {
  const counts = new Map<string, number>()
  for (const r of repos) {
    if (!r.language) continue
    counts.set(r.language, (counts.get(r.language) ?? 0) + 1)
  }
  const total = [...counts.values()].reduce((a, b) => a + b, 0)
  return [...counts.entries()]
    .sort(([, a], [, b]) => b - a)
    .map(([language, count]) => ({ language, count, pct: total ? Math.round((count / total) * 100) : 0 }))
}

export function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}
