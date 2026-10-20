import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { notes } from '../data/notes.ts'
import Heading from '../components/ui/Heading.tsx'

export default function NoteDetail() {
  const { slug } = useParams()
  const note = notes.find((n) => n.slug === slug)

  if (!note) return <Navigate to="/notes" replace />

  return (
    <section className="relative">
      <div className="max-w-[1600px] mx-auto px-6 pt-[clamp(140px,14vw,180px)] pb-[clamp(60px,8vw,110px)]">
      <Link className="inline-block text-muted text-[13.5px] mb-5 hover:text-ink" to="/notes">← All notes</Link>
      <span className="font-mono text-[11.5px] text-accent uppercase tracking-wide">{note.category}</span>
      <Heading tag="h1" className="font-serif text-[clamp(26px,3.6vw,36px)] mt-2.5 mb-3.5">{note.title}</Heading>
      <span className="font-mono text-xs text-muted">{note.readTime} read</span>
      <div className="mt-6 flex flex-col gap-4 text-muted text-base leading-[1.75] max-w-[680px]">
        {note.body.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      </div>
    </section>
)
}
