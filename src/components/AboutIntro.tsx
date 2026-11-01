import React from 'react'
import SectionHeading from './ui/SectionHeading.tsx'
import Heading from './ui/Heading.tsx'
import { profile } from '../data/profile.ts'

export default function AboutIntro() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] gap-12 lg:gap-16 items-start lg:items-stretch">
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
          <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(77,163,255,0.6)]" />
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
          <li className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-accent before:drop-shadow-[0_0_6px_rgba(77,163,255,0.5)]">Full-stack development</li>
          <li className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-accent before:drop-shadow-[0_0_6px_rgba(77,163,255,0.5)]">Data analytics &amp; exploratory data work</li>
          <li className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-accent before:drop-shadow-[0_0_6px_rgba(77,163,255,0.5)]">Software development &amp; system design</li>
          <li className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-accent before:drop-shadow-[0_0_6px_rgba(77,163,255,0.5)]">Problem solving through code</li>
        </ul>
      </div>

      <div className="relative w-full mx-auto lg:h-full">
        <div className="absolute -inset-4 rounded-[26px] bg-accent/[0.08] blur-2xl pointer-events-none" />
        <div className="relative w-full aspect-[4/5] max-h-[620px] lg:aspect-auto lg:max-h-none lg:h-full rounded-[18px] overflow-hidden border border-accent/25 bg-bg-raised shadow-[0_0_40px_-12px_rgba(77,163,255,0.35)] transition-transform duration-300 hover:-translate-y-1">
          <img
            src="/profile/sumit-portrait.jpg"
            alt={profile.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            role="img"
            aria-label="Signature"
            className="signature pointer-events-none absolute top-[5%] left-[7%] w-[24%] aspect-[606/738]"
          >
            <div className="signature-ink" />
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-[18px] ring-1 ring-inset ring-white/[0.06]" />
        </div>
      </div>
    </div>
  )
}
