import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface GsapRevealGridProps {
  children: React.ReactNode
  className?: string
}

// Fades + slides each direct child up into place as the grid scrolls into
// view, staggered left-to-right / top-to-bottom. Skips the animation
// entirely under prefers-reduced-motion (children just render normally).
export default function GsapRevealGrid({ children, className }: GsapRevealGridProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(container.children)

      gsap.set(items, { opacity: 0, y: 90 })

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.18,
        scrollTrigger: {
          trigger: container,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      })

      // Web fonts swapping in, the lazily-loaded hero globe, and project
      // screenshots all finish loading after ScrollTrigger first measures
      // this trigger's position — each can reflow the page and leave the
      // cached start offset stale, so the reveal fires at the wrong scroll
      // position (or not at all). Refresh from every source that could
      // have shifted layout, plus a couple of safety-net timers.
      const refresh = () => ScrollTrigger.refresh()

      const images = Array.from(container.querySelectorAll('img'))
      images.forEach((img) => {
        if (!img.complete) img.addEventListener('load', refresh, { once: true })
      })

      if (document.fonts?.ready) document.fonts.ready.then(refresh)
      window.addEventListener('load', refresh)

      const ro = new ResizeObserver(() => refresh())
      ro.observe(document.body)

      const safetyTimers = [setTimeout(refresh, 400), setTimeout(refresh, 1200)]

      return () => {
        window.removeEventListener('load', refresh)
        ro.disconnect()
        safetyTimers.forEach(clearTimeout)
      }
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
