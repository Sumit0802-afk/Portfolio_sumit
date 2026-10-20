import React from 'react'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import Heading from '../components/ui/Heading.tsx'
import { profile, timeline, experience, certifications, linkedinSkills } from '../data/profile.ts'

export default function About() {
  return (
    <section className="relative">
      <div className="max-w-[1600px] mx-auto px-6 pt-[clamp(72px,7vw,100px)] pb-[clamp(60px,8vw,110px)]">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] gap-12 lg:gap-16 items-start">
        <div>
          <SectionHeading
            eyebrow="About"
            title="A little more about me"
            align="left"
            spacingClassName="mb-5"
            titleClassName="text-[clamp(34px,4.6vw,56px)]"
          />

          <p className="text-accent/90 font-mono text-[13px] tracking-[0.1em] uppercase mb-2.5">
            {profile.headline}
          </p>
          <p className="text-muted text-[15px] mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,255,157,0.6)]" />
            {profile.location}
          </p>

          <p className="text-muted text-[17px] sm:text-[18.5px] leading-[1.6] mb-4">
            I'm Sumit Bhamu, a Computer Science &amp; Engineering (Data Analytics) student at{' '}
            {profile.university}. I build full-stack applications and practical software systems,
            focusing on thoughtful interfaces, clean implementation, and solving real problems through
            code.
          </p>
          <p className="text-muted text-[17px] sm:text-[18.5px] leading-[1.6] mb-7">
            My interests sit across full-stack development, data analytics, software development, and
            problem solving — I like understanding a system end to end rather than just one layer of
            it.
          </p>

          <Heading tag="h3" className="text-lg mb-3.5 text-white">Technical interests</Heading>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-muted text-[16px] leading-relaxed">
            <li className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-accent before:drop-shadow-[0_0_6px_rgba(0,255,157,0.5)]">Full-stack development</li>
            <li className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-accent before:drop-shadow-[0_0_6px_rgba(0,255,157,0.5)]">Data analytics &amp; exploratory data work</li>
            <li className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-accent before:drop-shadow-[0_0_6px_rgba(0,255,157,0.5)]">Software development &amp; system design</li>
            <li className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-accent before:drop-shadow-[0_0_6px_rgba(0,255,157,0.5)]">Problem solving through code</li>
          </ul>
        </div>

        <div className="relative w-full mx-auto">
          <div className="absolute -inset-4 rounded-[26px] bg-accent/[0.08] blur-2xl pointer-events-none" />
          <div className="relative w-full aspect-[4/5] max-h-[620px] rounded-[18px] overflow-hidden border border-accent/25 bg-bg-raised shadow-[0_0_40px_-12px_rgba(0,255,157,0.35)] transition-transform duration-300 hover:-translate-y-1">
            <img
              src="/profile/sumit-portrait.jpg"
              alt={profile.name}
              className="w-full h-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[18px] ring-1 ring-inset ring-white/[0.06]" />
          </div>
        </div>
      </div>

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
