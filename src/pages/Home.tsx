import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero.tsx'
import ProjectHorizontalScroll from '../components/ProjectHorizontalScroll.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import Heading from '../components/ui/Heading.tsx'
import TechIconGrid from '../components/TechIconGrid.tsx'
import AboutIntro from '../components/AboutIntro.tsx'
import ContactParticleField from '../components/ContactParticleField.tsx'
import GithubAnalytics from '../components/github/GithubAnalytics.tsx'
import { useProjects } from '../lib/useProjects.ts'
import { skillGroups } from '../data/skills.ts'
import { profile } from '../data/profile.ts'

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
  {
    title: 'Full-stack & system design',
    desc: 'Deepening full-stack and system design fundamentals.',
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <path d="M10 6.5h4.5a3 3 0 0 1 3 3V14" />
      </>
    ),
  },
  {
    title: 'Data exploration',
    desc: 'Data analytics and exploratory data workflows.',
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.9-3.9M8 13l2-3 2 2 2-3" />
      </>
    ),
  },
  {
    title: 'Backend architecture',
    desc: 'Practical backend architecture patterns.',
    icon: (
      <>
        <rect x="3" y="4" width="18" height="6" rx="1.5" />
        <rect x="3" y="14" width="18" height="6" rx="1.5" />
        <path d="M7 7h.01M7 17h.01" />
      </>
    ),
  },
]

const CONTACT_LINKS = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'GitHub', value: profile.github.replace('https://github.com/', '@'), href: profile.github, external: true },
  { label: 'LinkedIn', value: 'Connect professionally', href: profile.linkedin, external: true },
]

export default function Home() {
  const projects = useProjects()
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

      <section className="relative" id="about-intro">
        <div className="max-w-[1600px] mx-auto px-6 py-[clamp(60px,8vw,110px)]">
          <AboutIntro />
          <div className="mt-9 flex justify-center">
            <Link className="btn btn-outline" to="/about">More about me →</Link>
          </div>
        </div>
      </section>

      <section className="relative" id="exploring">
        <div className="max-w-[1600px] mx-auto px-6 py-[clamp(60px,8vw,110px)]">
          <SectionHeading eyebrow="Currently exploring" title="What I'm learning right now" />
          <div className="relative">
            <div aria-hidden="true" className="hidden lg:block absolute inset-x-0 top-[5px] h-px bg-accent/20 overflow-hidden">
              <span className="animate-track-sweep absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-accent to-transparent" />
            </div>

            <ol className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              {EXPLORING.map((item, i) => (
                <li key={item.title} className="relative lg:pt-9">
                  <span aria-hidden="true" className="hidden lg:block absolute top-0 left-6 w-[11px] h-[11px] rounded-full bg-accent shadow-[0_0_12px_rgba(0,255,157,0.8)]" />
                  <div className="card group relative h-full min-h-[220px] overflow-hidden flex flex-col">
                    <span className="absolute inset-0 bg-gradient-to-br from-accent/[0.07] to-transparent pointer-events-none" />
                    <span aria-hidden="true" className="absolute -bottom-8 right-3 font-serif text-[120px] leading-none text-accent/[0.06] transition-colors duration-300 group-hover:text-accent/[0.14] pointer-events-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="relative flex items-center justify-between gap-3 mb-8">
                      <div className="w-11 h-11 rounded-[12px] border border-accent/25 bg-accent/[0.08] flex items-center justify-center transition-colors duration-200 group-hover:bg-accent/20 group-hover:border-accent/50">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          {item.icon}
                        </svg>
                      </div>
                      <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,255,163,0.8)] animate-pulse" />
                        In progress
                      </span>
                    </div>

                    <Heading tag="h3" className="relative font-serif text-[22px] font-semibold text-white mb-2">{item.title}</Heading>
                    <p className="relative text-muted text-[15px] leading-relaxed max-w-[320px]">{item.desc}</p>
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="relative" id="contact-cta">
        <div className="max-w-[1600px] mx-auto px-6 pb-[clamp(60px,8vw,110px)]">
          <div className="relative overflow-hidden rounded-[24px] border border-accent/25 bg-bg-raised shadow-[0_0_60px_-20px_rgba(0,255,157,0.35)]">
            <div className="absolute inset-0 pointer-events-none">
              <ContactParticleField />
            </div>
            <div className="absolute -top-40 -left-24 w-[560px] h-[420px] rounded-full bg-accent/[0.12] blur-[90px] pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-10 lg:gap-16 items-center p-[clamp(28px,5vw,64px)]">
              <div>
                <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase text-muted border border-accent/25 bg-accent/[0.06] px-3 py-1.5 rounded-full mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,255,163,0.8)] animate-pulse" />
                  Available for collaborations
                </span>
                <h2 className="font-serif text-[clamp(34px,5vw,60px)] font-semibold leading-[1.08] text-white">
                  Let&apos;s build <span className="italic text-accent">something</span>
                  <br />
                  meaningful.
                </h2>
                <p className="text-muted text-base sm:text-[17px] leading-relaxed max-w-[480px] mt-5 mb-8">
                  I'm always happy to talk about projects, data, or ideas worth prototyping.
                </p>
                <Link className="group btn btn-primary" to="/contact">
                  Get in touch <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>

              <ul className="flex flex-col gap-2.5">
                {CONTACT_LINKS.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.external ? '_blank' : undefined}
                      rel={c.external ? 'noopener noreferrer' : undefined}
                      className="group flex items-center justify-between gap-4 px-4 py-3.5 rounded-[14px] border border-border bg-bg/70 backdrop-blur-sm transition-all hover:border-accent/50 hover:-translate-y-0.5"
                    >
                      <span className="min-w-0">
                        <span className="block font-mono text-[11px] uppercase tracking-[0.1em] text-accent">{c.label}</span>
                        <span className="block text-ink text-sm mt-1 truncate">{c.value}</span>
                      </span>
                      <span className="text-muted shrink-0 transition-all group-hover:text-accent group-hover:translate-x-0.5">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
