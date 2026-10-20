import React, { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import Heading from './ui/Heading.tsx'

const Globe = lazy(() => import('./Globe.tsx'))

export default function Hero() {
  return (
    <section
      className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-between text-center px-6 pt-7 pb-6 sm:pt-11 sm:pb-8 overflow-hidden"
      id="top"
    >

      {/* 3D Particle Ball Canvas */}
      <Suspense fallback={<div className="globe-wrap globe-fallback" aria-hidden="true" />}>
        <Globe />
      </Suspense>

      {/* Top spacer to balance fixed navbar */}
      <div className="h-1 sm:h-2" aria-hidden="true" />

      {/* Centered Main Hero Content Container */}
      <div className="relative z-[1] max-w-[1600px] w-full flex flex-col items-center animate-fade-in-up">
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 font-mono text-[10.5px] sm:text-xs tracking-[0.14em] uppercase text-accent border border-accent/30 bg-accent/[0.08] px-3.5 py-1.5 rounded-full mb-4.5 sm:mb-5 shadow-[0_0_20px_rgba(0,255,157,0.18)] backdrop-blur-md transition-all hover:border-accent/50">
          <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_#00ff9d] animate-pulse" aria-hidden="true" />
          <span>BUILDING WITH PURPOSE</span>
        </div>

        {/* Primary Headline — balanced across 2 lines on desktop */}
        <Heading
          tag="h1"
          align="center"
          className="font-serif font-medium text-[clamp(30px,5.5vw,66px)] leading-[1.15] tracking-[-0.02em] text-white max-w-[1140px] text-balance"
        >
          From complex problems to
          <br className="hidden sm:inline" />
          {' '}<em className="italic font-medium text-white">meaningful digital solutions.</em>
        </Heading>

        {/* Subtitle — tight proximity to headline */}
        <p className="mt-4 sm:mt-4.5 max-w-[540px] text-muted text-[15px] sm:text-[16.5px] leading-[1.6] text-balance">
          I build software, explore data, and transform challenging ideas into practical digital experiences.
        </p>

        {/* CTA Buttons — aligned heights and refined hover feedback */}
        <div className="mt-6 sm:mt-7 flex gap-3 sm:gap-4 flex-wrap justify-center items-center">
          <a
            className="btn btn-primary h-[42px] px-6 shadow-[0_0_20px_rgba(0,255,157,0.3)] hover:shadow-[0_0_30px_rgba(0,255,157,0.6)]"
            href="#selected-work"
          >
            See the work
            <svg viewBox="0 0 24 24" className="w-[14px] h-[14px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" /><path d="m19 12-7 7-7-7" />
            </svg>
          </a>
          <Link className="btn btn-outline h-[42px] px-6" to="/contact">Say hello</Link>
        </div>

        {/* Supporting details — concise focus tags */}
        <div className="mt-7 sm:mt-8 pt-5 sm:pt-6 border-t border-white/[0.08] w-full max-w-[540px] flex items-center justify-center gap-3 sm:gap-5 text-[10px] sm:text-[11.5px] font-mono tracking-[0.14em] uppercase text-emerald-300/85">
          <span className="hover:text-accent transition-colors">Software Engineering</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_#00ff9d]" aria-hidden="true" />
          <span className="hover:text-accent transition-colors">Data Analytics</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_#00ff9d]" aria-hidden="true" />
          <span className="hover:text-accent transition-colors">Full-Stack Systems</span>
        </div>
      </div>

      {/* Lower Fold Cue — smooth visual bridge to Selected Work */}
      <div className="relative z-[1] pt-3 sm:pt-1 flex flex-col items-center">
        <a
          href="#selected-work"
          className="group flex flex-col items-center gap-1 text-emerald-400/80 hover:text-accent text-[10px] sm:text-[11px] font-mono tracking-[0.18em] uppercase transition-colors"
          aria-label="Scroll to selected work"
        >
          <span className="opacity-80 group-hover:opacity-100 transition-opacity">EXPLORE</span>
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 animate-bounce text-accent drop-shadow-[0_0_8px_#00ff9d]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m7 10 5 5 5-5" />
          </svg>
        </a>
      </div>
    </section>
  )
}
