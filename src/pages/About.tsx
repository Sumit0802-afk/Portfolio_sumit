import React from 'react'
import AboutIntro from '../components/AboutIntro.tsx'
import Heading from '../components/ui/Heading.tsx'
import { timeline, experience, certifications, linkedinSkills } from '../data/profile.ts'

export default function About() {
  return (
    <section className="relative">
      <div className="max-w-[1600px] mx-auto px-6 pt-[clamp(72px,7vw,100px)] pb-[clamp(60px,8vw,110px)]">
      <AboutIntro />

      <div className="h-px bg-border my-10" />

      <Heading tag="h3" className="text-base mb-3.5 text-white">Skills</Heading>
      <div className="flex flex-wrap gap-2 mb-10">
        {linkedinSkills.map((s) => (
          <span key={s} className="tech-tag">{s}</span>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-10">
        <div>
          <Heading tag="h3" className="text-base mb-4 text-white">Experience</Heading>
          <ul className="flex flex-col gap-4.5 border-l border-border pl-6">
            {experience.map((e) => (
              <li key={`${e.title}-${e.period}`} className="relative before:content-[''] before:absolute before:-left-[25px] before:top-1.5 before:w-2 before:h-2 before:rounded-full before:bg-accent">
                <span className="font-mono text-[11px] text-muted">{e.period}</span>
                <strong className="block text-white text-[15px] mt-0.5">{e.title}</strong>
                <p className="text-muted text-[13.5px] mt-0.5">{e.place}</p>
                <p className="text-muted text-[13px] mt-1 leading-relaxed max-w-[480px]">{e.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Heading tag="h3" className="text-base mb-4 text-white">Timeline</Heading>
          <ul className="flex flex-col gap-4.5 border-l border-border pl-6">
            {timeline.map((t) => (
              <li key={t.title} className="relative before:content-[''] before:absolute before:-left-[25px] before:top-1.5 before:w-2 before:h-2 before:rounded-full before:bg-accent">
                <span className="font-mono text-[11px] text-muted">{t.period}</span>
                <strong className="block text-white text-[15px] mt-0.5">{t.title}</strong>
                <p className="text-muted text-[13.5px] mt-0.5">{t.place}</p>
                <p className="text-muted text-[13px] mt-1 leading-relaxed max-w-[480px]">{t.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="h-px bg-border my-10" />

      <Heading tag="h3" className="text-base mb-4 text-white">Certifications</Heading>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-3.5">
        {certifications.map((c) => (
          <li key={c.name}>
            <a
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="group block h-full p-4 rounded-card border border-border bg-bg-raised transition-colors duration-150 hover:border-accent/40"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="text-ink text-[13.5px] font-medium leading-snug">{c.name}</div>
                <span className="shrink-0 text-muted group-hover:text-accent transition-colors">↗</span>
              </div>
              <div className="text-muted text-xs mt-2">{c.issuer}</div>
            </a>
          </li>
        ))}
      </ul>
      </div>
    </section>
)
}
