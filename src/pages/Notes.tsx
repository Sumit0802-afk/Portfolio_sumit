import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import EmptyState from '../components/ui/EmptyState.tsx'
import Heading from '../components/ui/Heading.tsx'
import { notes } from '../data/notes.ts'

export default function Notes() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () => notes.filter((n) => n.title.toLowerCase().includes(query.toLowerCase())),
    [query]
  )

  return (
    <section className="relative">
      <div className="max-w-[1600px] mx-auto px-6 pt-[clamp(140px,14vw,180px)] pb-[clamp(60px,8vw,110px)]">
      <SectionHeading
        eyebrow="Notes"
        title="Technical writing and learning notes"
        description="Nothing published yet — this page is ready for notes as they're written."
        align="left"
      />

      {notes.length > 0 && (
        <input
          type="text"
          className="w-full max-w-[360px] mb-8 px-3.5 py-2.5 rounded-[10px] border border-border bg-bg-raised text-ink text-sm"
          placeholder="Search notes…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search notes"
        />
      )}

      {filtered.length === 0 ? (
        <EmptyState
          title="No notes yet"
          description="Technical notes and learning write-ups will show up here once they're published."
        />
      ) : (
        <ul className="flex flex-col gap-3.5">
          {filtered.map((n) => (
            <li key={n.slug}>
              <Link to={`/notes/${n.slug}`} className="block p-5.5 border border-border rounded-card bg-bg-raised hover:border-zinc-600 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-[11.5px] text-accent uppercase tracking-wide">{n.category}</span>
                </div>
                <Heading tag="h3" className="text-[17px] mb-1.5">{n.title}</Heading>
                <p className="text-muted text-sm leading-relaxed">{n.summary}</p>
                <span className="inline-block mt-2.5 font-mono text-xs text-muted">{n.readTime} read</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      </div>
    </section>
)
}
