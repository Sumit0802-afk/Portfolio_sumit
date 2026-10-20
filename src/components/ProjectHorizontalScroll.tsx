import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from './ProjectCard.tsx'
import type { Project } from '../data/projects.ts'

gsap.registerPlugin(ScrollTrigger)

// Horizontal-scroll gallery of the same bordered "browser window" cards used
// elsewhere on the site — not full-bleed, not full-screen. The row pins in
// place while the user scrolls vertically, and GSAP scrubs it sideways so
// every card passes through view, then releases the pin. A thin progress
// track below ("Work" — thumb — "N projects") mirrors how far through the
// gallery the scroll has gotten.
export default function ProjectHorizontalScroll({ items }: { items: Project[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const thumbRef = useRef<HTMLDivElement | null>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    const thumb = thumbRef.current
    if (reduced || !container || !track) return

    const ctx = gsap.context(() => {
      const getScrollAmount = () => Math.max(0, track.scrollWidth - container.offsetWidth)
      const thumbTravel = () => 100 - 100 / items.length

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top+=88',
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          pin: true,
          pinType: 'transform',
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (thumb) thumb.style.transform = `translateX(${self.progress * thumbTravel()}%)`
          },
        },
      })

      const refresh = () => ScrollTrigger.refresh()
      const images = Array.from(track.querySelectorAll('img'))
      images.forEach((img) => {
        if (!img.complete) img.addEventListener('load', refresh, { once: true })
      })
      if (document.fonts?.ready) document.fonts.ready.then(refresh)
      window.addEventListener('load', refresh)
      const timers = [setTimeout(refresh, 400), setTimeout(refresh, 1200)]

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
        window.removeEventListener('load', refresh)
        timers.forEach(clearTimeout)
      }
    }, container)

    return () => ctx.revert()
  }, [items.length, reduced])

  if (reduced) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {items.map((project) => <ProjectCard key={project.slug} project={project} />)}
      </div>
    )
  }

  return (
    <div>
      <div ref={containerRef} className="relative w-full max-w-full overflow-hidden">
        <div ref={trackRef} className="flex gap-8 w-max will-change-transform">
          {items.map((project) => (
            <div key={project.slug} className="w-[85vw] sm:w-[440px] shrink-0">
              <ProjectCard project={project} compact />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-8 font-mono text-xs text-muted">
        <span>Work</span>
        <div className="relative flex-1 h-px bg-border overflow-hidden rounded-full">
          <div
            ref={thumbRef}
            className="absolute inset-y-0 left-0 bg-accent rounded-full will-change-transform"
            style={{ width: `${100 / items.length}%` }}
          />
        </div>
        <span>{items.length} projects</span>
      </div>
    </div>
  )
}
