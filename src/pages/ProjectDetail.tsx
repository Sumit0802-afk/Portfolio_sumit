import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import TechTag from '../components/ui/TechTag.tsx'
import Heading from '../components/ui/Heading.tsx'
import { projects } from '../data/projects.ts'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) return <Navigate to="/work" replace />

  return (
    <section className="relative">
      <div className="max-w-[1600px] mx-auto px-6 pt-[clamp(140px,14vw,180px)] pb-[clamp(60px,8vw,110px)]">
      <Link className="inline-block text-muted text-[13.5px] mb-5 hover:text-ink" to="/work">← All work</Link>
      <span className={`status-pill status-${project.status}`}>{project.status}</span>
      <Heading tag="h1" className="font-serif text-[clamp(28px,4vw,42px)] mt-3.5 mb-1.5">{project.name}</Heading>
      <p className="text-muted text-[13.5px] italic">{project.tagline}</p>

      <div className="mt-7 rounded-card overflow-hidden border border-border aspect-[16/9]">
        <img
          src={project.image}
          alt={`${project.name} preview`}
          className="w-full h-full object-cover object-top scale-[1.04]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 mt-9">
        <div>
          <Heading tag="h3" className="text-[15px] mb-2 text-white">Overview</Heading>
          <p className="text-muted text-base leading-[1.75] max-w-[680px] mb-4.5">{project.description}</p>

          <Heading tag="h3" className="text-[15px] mb-2 mt-6 text-white">Key features</Heading>
          <ul className="flex flex-col gap-2 text-muted text-base leading-relaxed">
            {project.features.map((f) => (
              <li key={f} className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-accent">
                {f}
              </li>
            ))}
          </ul>
        </div>
        <aside className="border-t lg:border-t-0 lg:border-l border-border pt-5 lg:pt-0 lg:pl-8">
          <Heading tag="h4" className="text-[13px] text-muted mb-2.5">Stack</Heading>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((t) => <TechTag key={t}>{t}</TechTag>)}
          </div>
          <Heading tag="h4" className="text-[13px] text-muted mb-2.5 mt-4.5">Links</Heading>
          <div className="flex flex-col gap-2.5 text-sm">
            {project.repo && <a href={project.repo} target="_blank" rel="noreferrer" className="hover:text-accent">Repository ↗</a>}
            {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="hover:text-accent">Live demo ↗</a>}
          </div>
        </aside>
      </div>
      </div>
    </section>
)
}
