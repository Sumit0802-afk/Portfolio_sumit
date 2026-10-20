import React from 'react'
import type { GithubEvent } from '../../lib/github.ts'
import { timeAgo } from '../../lib/github.ts'

function describe(event: GithubEvent): { icon: string; text: string; url: string } {
  const repo = event.repo.name
  const repoUrl = `https://github.com/${repo}`
  switch (event.type) {
    case 'PushEvent': {
      const commits = (event.payload.commits as unknown[] | undefined)?.length ?? 0
      return { icon: '↑', text: `Pushed ${commits} commit${commits === 1 ? '' : 's'} to ${repo}`, url: repoUrl }
    }
    case 'PullRequestEvent': {
      const action = event.payload.action as string
      const pr = event.payload.pull_request as { html_url?: string; number?: number } | undefined
      return { icon: '⇄', text: `${action === 'opened' ? 'Opened' : action} pull request #${pr?.number} in ${repo}`, url: pr?.html_url ?? repoUrl }
    }
    case 'IssuesEvent': {
      const action = event.payload.action as string
      const issue = event.payload.issue as { html_url?: string; number?: number } | undefined
      return { icon: '●', text: `${action === 'opened' ? 'Opened' : action} issue #${issue?.number} in ${repo}`, url: issue?.html_url ?? repoUrl }
    }
    case 'CreateEvent': {
      const refType = event.payload.ref_type as string
      return { icon: '+', text: `Created ${refType} in ${repo}`, url: repoUrl }
    }
    case 'WatchEvent':
      return { icon: '★', text: `Starred ${repo}`, url: repoUrl }
    case 'ForkEvent':
      return { icon: '⑂', text: `Forked ${repo}`, url: repoUrl }
    case 'ReleaseEvent':
      return { icon: '⬢', text: `Published a release in ${repo}`, url: repoUrl }
    default:
      return { icon: '•', text: `${event.type.replace('Event', '')} in ${repo}`, url: repoUrl }
  }
}

export default function ActivityFeed({ events }: { events: GithubEvent[] }) {
  if (events.length === 0) {
    return <p className="text-muted text-sm">No recent public activity.</p>
  }

  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      {events.slice(0, 12).map((e) => {
        const { icon, text, url } = describe(e)
        return (
          <li key={e.id}>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 p-3 rounded-[10px] border border-border bg-bg hover:border-accent/40 transition-colors"
            >
              <span className="shrink-0 w-6 h-6 rounded-full border border-accent/30 bg-accent/[0.08] flex items-center justify-center text-accent text-[11px]">
                {icon}
              </span>
              <span className="min-w-0">
                <span className="block text-ink text-[13px] leading-snug truncate">{text}</span>
                <span className="block text-muted text-[11px] font-mono mt-0.5">{timeAgo(e.created_at)}</span>
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
