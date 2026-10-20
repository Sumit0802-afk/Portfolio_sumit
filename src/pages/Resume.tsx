import React from 'react'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import Heading from '../components/ui/Heading.tsx'
import { profile, timeline } from '../data/profile.ts'
import { projects } from '../data/projects.ts'
import { skillGroups } from '../data/skills.ts'

export default function Resume() {
  return (
    <section className="relative">
      <div className="max-w-[1600px] mx-auto px-6 pt-[clamp(72px,7vw,100px)] pb-[clamp(60px,8vw,110px)]">
      <SectionHeading eyebrow="Resume" title={profile.name} description={`${profile.role} · ${profile.university}`} align="left" />

      <div className="flex flex-wrap items-center gap-3 mb-9">
        <a href="/sumit-bhamu-resume.pdf" download className="btn btn-primary">Download resume ↓</a>
        <a href="/sumit-bhamu-resume.pdf" target="_blank" rel="noreferrer" className="btn btn-outline">View PDF ↗</a>
      </div>

      <Heading tag="h3" className="text-lg mt-8 mb-3.5 text-white">Education</Heading>
      <ul className="flex flex-col gap-5.5 border-l border-border pl-6">
        {timeline.map((t) => (
          <li key={t.title} className="flex gap-5 relative before:content-[''] before:absolute before:-left-[29px] before:top-1 before:w-2 before:h-2 before:rounded-full before:bg-accent">
            <span className="font-mono text-xs text-muted min-w-[90px] pt-0.5">{t.period}</span>
            <div>
              <strong className="text-white">{t.title}</strong>
              <p className="text-muted text-sm mt-0.5">{t.place}</p>
            </div>
          </li>
        ))}
      </ul>

      <Heading tag="h3" className="text-lg mt-8 mb-3.5 text-white">Technical skills</Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <Heading tag="h4" className="text-[13.5px] mb-2 text-muted font-semibold">{group.category}</Heading>
            <p className="text-muted text-[13.5px]">{group.items.join(', ')}</p>
          </div>
        ))}
      </div>

      <Heading tag="h3" className="text-lg mt-8 mb-3.5 text-white">Projects</Heading>
      <ul className="flex flex-col gap-2 text-muted text-base leading-relaxed">
        {projects.map((p) => (
          <li key={p.slug} className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-accent">
            <strong className="text-white">{p.name}</strong> — {p.tagline}
          </li>
        ))}
      </ul>
      </div>
    </section>
)
}
