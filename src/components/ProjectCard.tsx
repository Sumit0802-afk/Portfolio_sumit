import React from 'react'
import { Link } from 'react-router-dom'
import Heading from './ui/Heading.tsx'
import type { Project } from '../data/projects.ts'
import { timeAgo } from '../lib/github.ts'

function hostname(url: string | null): string {
  if (!url) return ''
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

// Curated projects open their detail page; auto-added GitHub repos have none,
// so they open the live site (or the repo) in a new tab instead.
function CardLink({ project, className, children }: { project: Project; className?: string; children: React.ReactNode }) {
  if (project.auto) {
    return (
      <a href={project.demo ?? project.repo} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    )
  }
  return <Link to={`/work/${project.slug}`} className={className}>{children}</Link>
}

export default function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <article className={`flex flex-col ${compact ? 'gap-3.5' : 'gap-5'}`}>
      <CardLink
        project={project}
        className="block rounded-card overflow-hidden border border-border bg-bg-raised hover:border-zinc-600 transition-colors"
      >
        <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-border bg-black/40">
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          {project.demo && (
            <span className="ml-2 text-[11px] font-mono text-muted truncate">{hostname(project.demo)}</span>
          )}
        </div>
        <div className={`${compact ? 'aspect-[16/8.5]' : 'aspect-[16/10]'} overflow-hidden bg-black/40`}>
          <img
            src={project.image}
            alt={`${project.name} preview`}
            loading="lazy"
            className="w-full h-full object-cover object-top scale-[1.04] transition-transform duration-300 hover:scale-[1.08]"
          />
        </div>
      </CardLink>

      <div className="flex items-start justify-between gap-4">
        <Heading
          tag="h3"
          className={`${compact ? 'text-xl sm:text-2xl line-clamp-2' : 'text-2xl sm:text-[28px]'} font-serif leading-tight`}
        >
          <CardLink project={project} className="hover:text-accent">{project.name}</CardLink>
        </Heading>
        <span className="status-pill shrink-0 mt-1.5">{project.category}</span>
      </div>

      {project.updatedAt && (
        <span className="-mt-2 font-mono text-[11px] text-muted inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(0,255,157,0.7)]" aria-hidden="true" />
          Updated {timeAgo(project.updatedAt)}
        </span>
      )}

      <p className={`text-muted text-[15px] leading-relaxed ${compact ? 'line-clamp-2' : ''}`}>{project.description}</p>

      {project.features.length > 0 && !compact && (
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-muted">
          {project.features.slice(0, 3).map((f) => (
            <span key={f} className="inline-flex items-start gap-1.5">
              <span className="text-accent">—</span> {f}
            </span>
          ))}
        </div>
      )}

      <div className={`flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border ${compact ? 'pt-3' : 'pt-4'}`}>
        <span className="font-mono text-xs text-muted">{project.stack.join(', ')}</span>
        <div className="flex gap-5 text-sm">
          {!project.auto && (
            <Link to={`/work/${project.slug}`} className="text-ink font-medium hover:text-accent">View details →</Link>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" className="text-muted hover:text-accent">GitHub repo ↗</a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="text-muted hover:text-accent">Visit site ↗</a>
          )}
        </div>
      </div>
    </article>
  )
}
