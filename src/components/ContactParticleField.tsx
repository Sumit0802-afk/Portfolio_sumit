import React, { useEffect, useRef } from 'react'

// Cinematic particle network scoped to the Contact section's background —
// glowing nodes with connecting lines and a soft cursor-following glow.
// Absolutely positioned behind content, pointer-events-none, reduced-motion aware.

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  bright: boolean
}

const NODE_COLOR = '0, 255, 163'
const LINK_DIST = 140
const MAX_NODES = 70

export default function ContactParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches

    let width = 0
    let height = 0
    let nodes: Node[] = []
    let raf = 0
    const mouse = { x: -9999, y: -9999 }

    function resize() {
      const parent = canvas!.parentElement
      if (!parent) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = parent.clientWidth
      height = parent.clientHeight
      canvas!.width = Math.round(width * dpr)
      canvas!.height = Math.round(height * dpr)
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const density = Math.min(MAX_NODES, Math.round((width * height) / 18000))
      nodes = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 0.8 + Math.random() * 1.6,
        bright: Math.random() < 0.15,
      }))
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    function onPointerLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, width, height)
      for (const n of nodes) {
        ctx!.beginPath()
        ctx!.fillStyle = `rgba(${NODE_COLOR}, ${n.bright ? 0.6 : 0.3})`
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    function frame() {
      ctx!.clearRect(0, 0, width, height)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1

        const dx = mouse.x - n.x
        const dy = mouse.y - n.y
        const dist = Math.hypot(dx, dy)
        if (dist < 120) {
          n.x -= dx * 0.004
          n.y -= dy * 0.004
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < LINK_DIST) {
            ctx!.beginPath()
            ctx!.strokeStyle = `rgba(${NODE_COLOR}, ${(1 - dist / LINK_DIST) * 0.18})`
            ctx!.lineWidth = 1
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.stroke()
          }
        }
      }

      for (const n of nodes) {
        ctx!.beginPath()
        if (n.bright) {
          ctx!.shadowColor = `rgba(${NODE_COLOR}, 0.8)`
          ctx!.shadowBlur = 6
        } else {
          ctx!.shadowBlur = 0
        }
        ctx!.fillStyle = `rgba(${NODE_COLOR}, ${n.bright ? 0.75 : 0.35})`
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx!.fill()
      }
      ctx!.shadowBlur = 0

      if (mouse.x > -9000) {
        const glow = ctx!.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 160)
        glow.addColorStop(0, `rgba(${NODE_COLOR}, 0.07)`)
        glow.addColorStop(1, 'rgba(0,0,0,0)')
        ctx!.fillStyle = glow
        ctx!.fillRect(mouse.x - 160, mouse.y - 160, 320, 320)
      }

      raf = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener('resize', resize)

    if (reduced) {
      drawStatic()
    } else {
      if (!coarsePointer) {
        canvas.addEventListener('pointermove', onPointerMove)
        canvas.addEventListener('pointerleave', onPointerLeave)
      }
      raf = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
