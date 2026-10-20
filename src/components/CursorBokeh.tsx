import React, { useEffect, useRef } from 'react'

// Soft glowing bokeh trail that follows the cursor — varied-size white/mint/
// emerald particles that drift and fade, matching the hero globe's starfield
// look. Pure canvas + rAF, no libraries. Global overlay, not section-scoped.

const PALETTE = ['255, 255, 255', '0, 255, 157', '52, 211, 153', '16, 185, 129']
const PALETTE_WEIGHTS = [0.22, 0.42, 0.22, 0.14]

function pickColor(): string {
  const r = Math.random()
  let acc = 0
  for (let i = 0; i < PALETTE_WEIGHTS.length; i++) {
    acc += PALETTE_WEIGHTS[i]
    if (r < acc) return PALETTE[i]
  }
  return PALETTE[0]
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
}

const SPAWN_PER_MOVE = 2
const MAX_PARTICLES = 160
const MAX_DPR = 2

export default function CursorBokeh() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')

    let teardown: (() => void) | null = null

    function evaluate() {
      teardown?.()
      teardown = null
      if (motionQuery.matches || !pointerQuery.matches) return
      teardown = mount()
    }

    function mount(): () => void {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (!canvas || !ctx) return () => {}

      let width = 0
      let height = 0
      let particles: Particle[] = []
      let raf = 0
      let running = false
      let lastSpawn = 0

      function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
        width = window.innerWidth
        height = window.innerHeight
        canvas!.width = Math.round(width * dpr)
        canvas!.height = Math.round(height * dpr)
        canvas!.style.width = `${width}px`
        canvas!.style.height = `${height}px`
        ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      }

      function spawn(x: number, y: number) {
        for (let i = 0; i < SPAWN_PER_MOVE; i++) {
          if (particles.length >= MAX_PARTICLES) particles.shift()
          const angle = Math.random() * Math.PI * 2
          const speed = Math.random() * 0.25
          const maxLife = 0.6 + Math.random() * 0.6
          particles.push({
            x: x + (Math.random() - 0.5) * 18,
            y: y + (Math.random() - 0.5) * 18,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: 0.8 + Math.random() * 2,
            color: pickColor(),
            life: maxLife,
            maxLife,
          })
        }
      }

      function drawFrame(dt: number) {
        ctx!.clearRect(0, 0, width, height)

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i]
          p.life -= dt
          if (p.life <= 0) {
            particles.splice(i, 1)
            continue
          }
          p.x += p.vx
          p.y += p.vy

          const t = p.life / p.maxLife
          const alpha = t * 0.85
          const r = p.size * (0.6 + 0.4 * t)

          ctx!.shadowColor = `rgba(${p.color}, ${alpha})`
          ctx!.shadowBlur = r * 2.2
          ctx!.fillStyle = `rgba(${p.color}, ${alpha})`
          ctx!.beginPath()
          ctx!.arc(p.x, p.y, r, 0, Math.PI * 2)
          ctx!.fill()
        }
      }

      function loop(now: number) {
        const dt = Math.min((now - lastSpawn) / 1000, 0.05)
        lastSpawn = now
        drawFrame(dt)
        if (particles.length > 0) {
          raf = requestAnimationFrame(loop)
        } else {
          running = false
        }
      }

      function startLoop() {
        if (running) return
        running = true
        lastSpawn = performance.now()
        raf = requestAnimationFrame(loop)
      }

      function onPointerMove(e: PointerEvent) {
        spawn(e.clientX, e.clientY)
        startLoop()
      }

      resize()
      window.addEventListener('resize', resize)
      window.addEventListener('pointermove', onPointerMove, { passive: true })

      return () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('resize', resize)
        window.removeEventListener('pointermove', onPointerMove)
        particles = []
        ctx!.clearRect(0, 0, width, height)
      }
    }

    evaluate()
    motionQuery.addEventListener('change', evaluate)
    pointerQuery.addEventListener('change', evaluate)

    return () => {
      motionQuery.removeEventListener('change', evaluate)
      pointerQuery.removeEventListener('change', evaluate)
      teardown?.()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9999] pointer-events-none"
    />
  )
}
