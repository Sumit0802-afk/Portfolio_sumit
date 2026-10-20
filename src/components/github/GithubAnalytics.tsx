import React, { useEffect, useState } from 'react'
import Heading from '../ui/Heading.tsx'
import ContributionHeatmap from './ContributionHeatmap.tsx'
import BarChart from './BarChart.tsx'
import RepoGrid from './RepoGrid.tsx'
import ActivityFeed from './ActivityFeed.tsx'
import {
  fetchUser, fetchRepos, fetchEvents, fetchContributions,
  computeStreaks, monthlyTotals, weekdayTotals, languageDistribution,
  type GithubUser, type GithubRepo, type GithubEvent, type ContributionData,
} from '../../lib/github.ts'
import { profile } from '../../data/profile.ts'

type Status = 'loading' | 'ready' | 'error'

interface State {
  user: GithubUser | null
  repos: GithubRepo[]
  events: GithubEvent[]
  contributions: ContributionData | null
  status: Status
  refreshedAt: Date | null
}

const initialState: State = { user: null, repos: [], events: [], contributions: null, status: 'loading', refreshedAt: null }

function Kpi({ label, value, loading }: { label: string; value: string | number | null; loading: boolean }) {
  return (
    <div className="p-4 rounded-[12px] border border-border bg-bg-raised">
      {loading ? (
        <div className="h-7 w-14 rounded bg-white/[0.06] animate-pulse mb-1.5" />
      ) : (
        <div className="text-white text-2xl font-semibold font-mono">
          {value === null ? '—' : value}
        </div>
      )}
      <div className="text-muted text-[11px] mt-1 uppercase tracking-wide font-mono">{label}</div>
    </div>
  )
}

export default function GithubAnalytics() {
  const username = profile.github.replace('https://github.com/', '').replace(/\/$/, '')
  const [state, setState] = useState<State>(initialState)

  const load = () => {
    setState((s) => ({ ...s, status: 'loading' }))
    Promise.all([fetchUser(username), fetchRepos(username), fetchEvents(username), fetchContributions(username)])
      .then(([user, repos, events, contributions]) => {
        setState({ user, repos, events, contributions, status: 'ready', refreshedAt: new Date() })
      })
      .catch(() => {
        setState((s) => ({ ...s, status: 'error' }))
      })
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { user, repos, events, contributions, status, refreshedAt } = state
  const loading = status === 'loading'

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0)
  const streaks = contributions ? computeStreaks(contributions.days) : { current: 0, longest: 0 }
  const months = contributions ? monthlyTotals(contributions.days) : []
  const weekdays = contributions ? weekdayTotals(contributions.days) : []
  const languages = languageDistribution(repos)

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <span className="eyebrow">GitHub analytics</span>
          <Heading tag="h2" align="left" className="font-serif text-[clamp(28px,3.4vw,40px)] font-semibold text-white">
            My GitHub, live.
          </Heading>
          <p className="text-muted text-[15px] mt-2 max-w-[520px]">
            A live look at the code I write, the projects I build, and the progress I make.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <img src={user.avatar_url} alt={user.login} className="w-10 h-10 rounded-full border border-border" />
          )}
          <div>
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-ink text-sm font-medium hover:text-accent flex items-center gap-1.5">
              @{username} <span aria-hidden="true">↗</span>
            </a>
            <span className="block font-mono text-[10.5px] text-muted mt-0.5">
              {status === 'error'
                ? 'Sync failed'
                : refreshedAt
                  ? `Synced ${refreshedAt.toLocaleTimeString()}`
                  : 'Syncing…'}
            </span>
          </div>
        </div>
      </div>

      {status === 'error' && (
        <div className="p-6 rounded-[14px] border border-border bg-bg-raised text-center mb-8">
          <p className="text-muted text-sm mb-3">Couldn't reach GitHub's API right now — this may be a rate limit.</p>
          <button type="button" onClick={load} className="btn btn-outline">Retry</button>
        </div>
      )}

      {status !== 'error' && (
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <Kpi label="Contributions" value={contributions?.total ?? null} loading={loading} />
            <Kpi label="Repositories" value={user?.public_repos ?? null} loading={loading} />
            <Kpi label="Stars" value={repos.length ? totalStars : (loading ? null : 0)} loading={loading} />
            <Kpi label="Followers" value={user?.followers ?? null} loading={loading} />
            <Kpi label="Following" value={user?.following ?? null} loading={loading} />
            <Kpi label="Longest streak" value={contributions ? `${streaks.longest}d` : null} loading={loading} />
          </div>

          <div className="p-5 sm:p-6 rounded-[16px] border border-border bg-bg-raised">
            {loading ? (
              <div className="h-[160px] rounded bg-white/[0.04] animate-pulse" />
            ) : contributions ? (
              <ContributionHeatmap days={contributions.days} total={contributions.total} />
            ) : (
              <p className="text-muted text-sm">Contribution data unavailable.</p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="p-5 sm:p-6 rounded-[16px] border border-border bg-bg-raised">
              <span className="font-mono text-xs uppercase tracking-wide text-muted block mb-4">Monthly contributions</span>
              {loading ? (
                <div className="h-[140px] rounded bg-white/[0.04] animate-pulse" />
              ) : months.length ? (
                <BarChart data={months} />
              ) : (
                <p className="text-muted text-sm">No contribution data.</p>
              )}
            </div>

            <div className="p-5 sm:p-6 rounded-[16px] border border-border bg-bg-raised">
              <span className="font-mono text-xs uppercase tracking-wide text-muted block mb-4">Weekly coding rhythm</span>
              {loading ? (
                <div className="h-[140px] rounded bg-white/[0.04] animate-pulse" />
              ) : weekdays.length ? (
                <BarChart data={weekdays} />
              ) : (
                <p className="text-muted text-sm">No contribution data.</p>
              )}
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-[16px] border border-border bg-bg-raised">
            <span className="font-mono text-xs uppercase tracking-wide text-muted block mb-4">
              Languages <span className="normal-case text-muted/70">— by primary language across public repos</span>
            </span>
            {loading ? (
              <div className="h-[100px] rounded bg-white/[0.04] animate-pulse" />
            ) : languages.length ? (
              <div className="flex flex-col gap-3">
                {languages.map((l) => (
                  <div key={l.language}>
                    <div className="flex justify-between text-[12.5px] mb-1">
                      <span className="text-ink">{l.language}</span>
                      <span className="text-muted font-mono">{l.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${l.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted text-sm">No language data available.</p>
            )}
          </div>

          <div className="p-5 sm:p-6 rounded-[16px] border border-border bg-bg-raised">
            {loading ? (
              <div className="h-[200px] rounded bg-white/[0.04] animate-pulse" />
            ) : (
              <RepoGrid repos={repos} />
            )}
          </div>

          <div className="p-5 sm:p-6 rounded-[16px] border border-border bg-bg-raised">
            <span className="font-mono text-xs uppercase tracking-wide text-muted block mb-4">Recent activity</span>
            {loading ? (
              <div className="h-[140px] rounded bg-white/[0.04] animate-pulse" />
            ) : (
              <ActivityFeed events={events} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
