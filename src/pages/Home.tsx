import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero.tsx'
import ProjectHorizontalScroll from '../components/ProjectHorizontalScroll.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import Heading from '../components/ui/Heading.tsx'
import TechIconGrid from '../components/TechIconGrid.tsx'
import GithubAnalytics from '../components/github/GithubAnalytics.tsx'
import { projects } from '../data/projects.ts'
import { skillGroups } from '../data/skills.ts'
import { profile } from '../data/profile.ts'

const INTERESTS = [
  'Full-stack development',
  'Data analytics',
  'Software development',
  'Problem solving',
]

const WHAT_I_DO = [
  {
    title: 'Full-stack development',
    desc: 'Building applications end to end, from interface to data layer.',
    icon: (
      <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13 6l-2 12" />
    ),
  },
  {
    title: 'Data analytics',
    desc: 'Turning raw datasets into clear, usable insight.',
    icon: (
      <>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </>
    ),
  },
  {
    title: 'Software development',
    desc: 'Writing practical software systems that solve real problems.',
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 9l3 3-3 3M13 15h4" />
      </>
    ),
  },
  {
    title: 'Problem solving',
    desc: 'Picking a real, specific problem and prototyping a solution.',
    icon: (
      <>
        <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.46 1.1 1.2 1.1 2.2h5a2.8 2.8 0 0 1 1.1-2.2A6 6 0 0 0 12 3Z" />
      </>
    ),
  },
]

const EXPLORING = [
  'Deepening full-stack and system design fundamentals',
  'Data analytics and exploratory data workflows',
  'Practical backend architecture patterns',
]

export default function Home() {
  const allTools = skillGroups.flatMap((g) => g.items)

  return (
    <>
      <Hero />

      <section className="relative" id="selected-work">
        <div className="max-w-[1600px] mx-auto px-6 py-[clamp(60px,8vw,110px)]">
          <SectionHeading eyebrow="Selected work" title="A few things I've been building" />
          <ProjectHorizontalScroll items={projects} />
          <div className="mt-9 flex justify-center">
            <Link className="btn btn-outline" to="/work">View all work →</Link>
          </div>
        </div>
      </section>

      <section className="relative" id="about-blurb">
        <div className="max-w-[1600px] mx-auto px-6 py-[clamp(60px,8vw,110px)]">
          <SectionHeading eyebrow="A little about me" title="Student and full-stack builder" align="left" />

          <p className="text-muted text-base sm:text-[17px] leading-[1.75] mb-7">
            I'm {profile.name}, a Computer Science &amp; Engineering (Data Analytics) student at{' '}
            {profile.university}. I build full-stack applications and practical software systems,
            focusing on thoughtful interfaces, clean implementation, and solving real problems
            through code. My interests sit across full-stack development, data analytics, software
            development, and problem solving — I like understanding a system end to end rather than
            just one layer of it.
          </p>

          <div className="flex flex-wrap gap-2 mb-7">
            {INTERESTS.map((t) => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
          </div>

          <div className="flex justify-center">
            <Link className="btn btn-outline" to="/about">More about me →</Link>
          </div>
        </div>
      </section>

      <section className="relative" id="what-i-do">
        <div className="max-w-[1600px] mx-auto px-6 py-[clamp(60px,8vw,110px)]">
          <SectionHeading eyebrow="What I do" title="Where I spend my time" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHAT_I_DO.map((f, i) => (
              <div className="card group relative overflow-hidden" key={f.title}>
                <span className="absolute top-0 right-0 font-mono text-[11px] text-muted/50 px-3.5 pt-3">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="w-10 h-10 rounded-[10px] border border-accent/25 bg-accent/[0.08] flex items-center justify-center mb-4 transition-colors duration-200 group-hover:bg-accent/20 group-hover:border-accent/50">
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {f.icon}
                  </svg>
                </div>
                <Heading tag="h3" className="text-base mb-2 text-white">{f.title}</Heading>
                <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative" id="profile">
        <div className="max-w-[1600px] mx-auto px-6 py-[clamp(60px,8vw,110px)]">
          <GithubAnalytics />
        </div>
      </section>

      <section className="relative" id="toolkit">
        <div className="max-w-[1600px] mx-auto px-6 py-[clamp(60px,8vw,110px)]">
          <SectionHeading eyebrow="Technical toolkit" title="Tools I reach for" />
          <TechIconGrid items={allTools} />
          <div className="mt-9 flex justify-center">
            <Link className="btn btn-outline" to="/infra">Full toolkit →</Link>
          </div>
        </div>
      </section>

      <section className="relative" id="exploring">
        <div className="max-w-[1600px] mx-auto px-6 py-[clamp(60px,8vw,110px)]">
          <SectionHeading eyebrow="Currently exploring" title="What I'm learning right now" />
          <ul className="flex flex-col gap-2.5 max-w-[520px] mx-auto">
            {EXPLORING.map((item) => (
              <li key={item} className="px-[18px] py-3.5 border border-border rounded-[10px] bg-bg-raised text-[14.5px] text-ink">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative" id="contact-cta">
        <div className="max-w-[1600px] mx-auto px-6 pb-[clamp(60px,8vw,110px)]">
          <div className="text-center p-[clamp(40px,6vw,64px)] rounded-[20px] border border-accent/25 bg-gradient-to-b from-accent/[0.08] via-bg-raised to-bg-raised shadow-[0_0_40px_-15px_rgba(0,255,157,0.2)]">
            <Heading tag="h2" align="center" className="font-serif text-[clamp(24px,3vw,32px)] text-white mb-3">
              Let's build something meaningful.
            </Heading>
            <p className="text-muted mb-6">I'm always happy to talk about projects, data, or ideas worth prototyping.</p>
            <Link className="btn btn-primary" to="/contact">Get in touch</Link>
          </div>
        </div>
      </section>
    </>
  )
}
