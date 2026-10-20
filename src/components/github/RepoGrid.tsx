import React, { useMemo, useState } from 'react'
import type { GithubRepo } from '../../lib/github.ts'
import { timeAgo } from '../../lib/github.ts'

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Python: '#3572A5',
}

type Sort = 'updated' | 'stars' | 'alpha'

export default function RepoGrid({ repos }: { repos: GithubRepo[] }) {
  const [sort, setSort] = useState<Sort>('updated')

  const sorted = useMemo(() => {
    const copy = [...repos]
    if (sort === 'updated') copy.sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
    if (sort === 'stars') copy.sort((a, b) => b.stargazers_count - a.stargazers_count)
    if (sort === 'alpha') copy.sort((a, b) => a.name.localeCompare(b.name))
    return copy
  }, [repos, sort])

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <span className="font-mono text-xs uppercase tracking-wide text-muted">Repositories</span>
        <div className="flex gap-1.5">
          {(['updated', 'stars', 'alpha'] as Sort[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSort(s)}
              className={`filter-pill ${sort === s ? 'active' : ''}`}
            >
              {s === 'updated' ? 'Recently updated' : s === 'stars' ? 'Most starred' : 'A–Z'}
            </button>
          ))}
        </div>
      </div>

      {sorted.length === 0 ? (
        <p className="text-muted text-sm">No public repositories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sorted.map((r) => (
            <a
              key={r.id}
              href={r.html_url}
              target="_blank"
              rel="noreferrer"
              className="group p-4 rounded-[10px] border border-border bg-bg hover:border-accent/40 transition-colors flex flex-col"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-ink text-[13.5px] font-medium font-mono truncate">{r.name}</span>
                <span className="shrink-0 text-muted group-hover:text-accent transition-colors text-xs">↗</span>
              </div>
              <p className="text-muted text-xs mt-1.5 leading-relaxed flex-1 line-clamp-2">
                {r.description ?? 'No description provided.'}
              </p>
              <div className="flex items-center justify-between mt-3 text-[11px] text-muted font-mono">
                <div className="flex items-center gap-3">
                  {r.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: LANGUAGE_COLORS[r.language] ?? '#8ea89a' }}
                      />
                      {r.language}
                    </span>
                  )}
                  {r.stargazers_count > 0 && <span>★ {r.stargazers_count}</span>}
                  {r.forks_count > 0 && <span>⑂ {r.forks_count}</span>}
                </div>
                <span>{timeAgo(r.pushed_at)}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
