import React, { useEffect, useRef, useState } from 'react'
import type { ContributionDay } from '../../lib/github.ts'
import { useInView } from '../../lib/useInView.ts'

const LEVEL_COLORS = ['#0d1a14', '#0f3d2b', '#15713f', '#1aa858', '#00ff9d']
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function groupByWeek(days: ContributionDay[]): ContributionDay[][] {
  if (days.length === 0) return []
  const first = new Date(`${days[0].date}T00:00:00Z`)
  const padStart = first.getUTCDay()
  const padded: (ContributionDay | null)[] = [...Array(padStart).fill(null), ...days]

  const weeks: ContributionDay[][] = []
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7).filter(Boolean) as ContributionDay[])
  }
  return weeks
}

// Only show activity from April onward — the account had nothing before then.
function sinceApril(days: ContributionDay[]): ContributionDay[] {
  if (days.length === 0) return days
  const last = new Date(`${days[days.length - 1].date}T00:00:00Z`)
  const year = last.getUTCMonth() >= 3 ? last.getUTCFullYear() : last.getUTCFullYear() - 1
  const start = `${year}-04-01`
  return days.filter((d) => d.date >= start)
}

const STEP_MS = 140
const ROW_PX = 22 // 18px cell + 4px gap

type Cell = { w: number; d: number }
const key = (c: Cell) => `${c.w}:${c.d}`

// Visit every non-empty cell, always heading for the nearest one next,
// walking one grid step at a time (columns first, then rows).
function buildRoute(weeks: ContributionDay[][]): Cell[] {
  const targets: Cell[] = []
  weeks.forEach((week, w) =>
    week.forEach((day) => {
      if (day.count > 0) targets.push({ w, d: new Date(`${day.date}T00:00:00Z`).getUTCDay() })
    }),
  )
  const route: Cell[] = []
  // Start just left of the first contribution instead of walking the empty months.
  const firstW = targets.length ? Math.min(...targets.map((t) => t.w)) : 0
  let pos: Cell = { w: Math.max(0, firstW - 1), d: 3 }
  route.push(pos)
  while (targets.length) {
    let best = 0
    targets.forEach((t, i) => {
      const dist = (c: Cell) => Math.abs(c.w - pos.w) + Math.abs(c.d - pos.d)
      if (dist(t) < dist(targets[best])) best = i
    })
    const [t] = targets.splice(best, 1)
    while (pos.w !== t.w) route.push((pos = { w: pos.w + Math.sign(t.w - pos.w), d: pos.d }))
    while (pos.d !== t.d) route.push((pos = { w: pos.w, d: pos.d + Math.sign(t.d - pos.d) }))
  }
  return route
}

// A little chomper that walks the grid eating contribution cells, then
// lets them grow back and starts over. Off for reduced-motion users.
function useChomper(weeks: ContributionDay[][], active: boolean) {
  const route = React.useMemo(() => buildRoute(weeks), [weeks.length, weeks.flat().length])
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!active) setStep(0)
  }, [active])

  useEffect(() => {
    if (!active || route.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const pause = step === 0 ? 300 : step >= route.length - 1 ? 2000 : STEP_MS
    const id = window.setTimeout(() => setStep((s) => (s >= route.length - 1 ? 0 : s + 1)), pause)
    return () => window.clearTimeout(id)
  }, [active, step, route])

  // Throw a burst of sparks whenever the chomper lands on a contribution.
  const levels = React.useMemo(() => {
    const m = new Map<string, number>()
    weeks.forEach((week, w) =>
      week.forEach((day) => m.set(key({ w, d: new Date(`${day.date}T00:00:00Z`).getUTCDay() }), day.level)),
    )
    return m
  }, [weeks.length, weeks.flat().length])
  const [bursts, setBursts] = useState<Burst[]>([])

  useEffect(() => {
    const cell = route[step]
    const level = cell && step > 0 ? levels.get(key(cell)) ?? 0 : 0
    if (!level) return
    const burst = { id: burstId++, ...cell, level }
    setBursts((b) => [...b, burst])
    // Not cleared on the next step: the burst should outlive it.
    window.setTimeout(() => setBursts((b) => b.filter((x) => x.id !== burst.id)), 750)
  }, [step, route, levels])

  const eaten = React.useMemo(() => new Set(route.slice(0, step + 1).map(key)), [route, step])
  const pos = route[step] ?? { w: 0, d: 3 }
  const prev = route[Math.max(0, step - 1)] ?? pos
  const angle = pos.w < prev.w ? 180 : pos.d > prev.d ? 90 : pos.d < prev.d ? -90 : 0
  return { pos, angle, eaten, bursts, running: active && route.length > 1 }
}

type Burst = Cell & { id: number; level: number }
let burstId = 0

// Brighter cells throw more, faster sparks. Directions are fixed per burst
// so a re-render doesn't make the particles jump.
function SparkBurst({ burst, columns }: { burst: Burst; columns: number }) {
  const sparks = React.useMemo(() => {
    const n = 6 + burst.level * 3
    return Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2 + Math.random() * 0.5
      const r = 14 + Math.random() * (10 + burst.level * 6)
      return {
        dx: Math.cos(a) * r,
        dy: Math.sin(a) * r,
        size: 2 + Math.random() * 2.5,
        color: Math.random() < 0.35 ? '#facc15' : LEVEL_COLORS[Math.max(3, burst.level)],
        delay: Math.random() * 60,
      }
    })
  }, [burst])

  return (
    <div
      aria-hidden="true"
      className="absolute z-20 pointer-events-none"
      style={{
        left: `calc(40px + ${burst.w + 0.5} * (100% - 36px) / ${columns} - 2px)`,
        top: burst.d * ROW_PX + 9,
      }}
    >
      <span
        className="absolute left-0 top-0 w-5 h-5 rounded-full animate-spark-flash"
        style={{ background: 'radial-gradient(circle, rgba(0,255,157,0.85), rgba(0,255,157,0) 70%)' }}
      />
      {sparks.map((s, i) => (
        <span
          key={i}
          className="absolute left-0 top-0 rounded-full animate-spark"
          style={{
            width: s.size,
            height: s.size,
            background: s.color,
            boxShadow: `0 0 6px ${s.color}`,
            animationDelay: `${s.delay}ms`,
            ['--dx' as string]: `${s.dx}px`,
            ['--dy' as string]: `${s.dy}px`,
          }}
        />
      ))}
    </div>
  )
}

export default function ContributionHeatmap({ days: allDays }: { days: ContributionDay[]; total: number }) {
  const [hovered, setHovered] = useState<ContributionDay | null>(null)
  const [revealed, setRevealed] = useState(false)
  const days = sinceApril(allDays)
  const total = days.reduce((sum, d) => sum + d.count, 0)
  const weeks = groupByWeek(days)

  const gridRef = useRef<HTMLDivElement>(null)
  const inView = useInView(gridRef)
  const chomper = useChomper(weeks, revealed && inView)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setRevealed(true)
      return
    }
    // rAF can stall in background tabs, so a timer backs it up.
    const id = requestAnimationFrame(() => setRevealed(true))
    const fallback = window.setTimeout(() => setRevealed(true), 100)
    return () => {
      cancelAnimationFrame(id)
      window.clearTimeout(fallback)
    }
  }, [])

  const monthLabels: { label: string; weekIndex: number }[] = []
  let lastMonth = -1
  weeks.forEach((week, i) => {
    const d = week[0]
    if (!d) return
    const month = new Date(`${d.date}T00:00:00Z`).getUTCMonth()
    if (month !== lastMonth) {
      monthLabels.push({ label: MONTH_NAMES[month], weekIndex: i })
      lastMonth = month
    }
  })

  return (
    <div ref={gridRef}>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <span className="font-mono text-xs uppercase tracking-wide text-muted">Contribution activity</span>
        <span className="font-mono text-xs text-ink">{total} contributions since April</span>
      </div>

      <div className="overflow-x-auto pb-2 min-h-[120px]">
        <div className="min-w-[520px] relative">
          <div className="ml-9 mb-1 relative h-4">
            {monthLabels.map((m) => (
              <span
                key={`${m.label}-${m.weekIndex}`}
                className="absolute font-mono text-[10px] text-muted"
                style={{ left: `${(m.weekIndex / weeks.length) * 100}%` }}
              >
                {m.label}
              </span>
            ))}
          </div>

          <div className="flex gap-1 relative">
            {chomper.bursts.map((b) => (
              <SparkBurst key={b.id} burst={b} columns={weeks.length} />
            ))}
            {chomper.running && (
              <div
                aria-hidden="true"
                className="absolute z-10 pointer-events-none flex items-center justify-center"
                style={{
                  left: `calc(40px + ${chomper.pos.w} * (100% - 36px) / ${weeks.length})`,
                  top: chomper.pos.d * ROW_PX,
                  width: `calc((100% - 36px) / ${weeks.length} - 4px)`,
                  height: 18,
                  transition: `left ${STEP_MS}ms linear, top ${STEP_MS}ms linear`,
                }}
              >
                <svg
                  viewBox="0 0 20 20"
                  className="w-[18px] h-[18px] drop-shadow-[0_0_6px_rgba(250,204,21,0.7)]"
                  style={{ transform: `rotate(${chomper.angle}deg)` }}
                >
                  <path
                    fill="#facc15"
                    d={(chomper.pos.w + chomper.pos.d) % 2
                      ? 'M10 10 L19.5 8 A9.5 9.5 0 1 0 19.5 12 Z'
                      : 'M10 10 L18 4 A9.5 9.5 0 1 0 18 16 Z'}
                  />
                  <circle cx="10" cy="5" r="1.4" fill="#030705" />
                </svg>
              </div>
            )}
            <div className="flex flex-col gap-1 w-9 shrink-0">
              {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
                <span key={i} className="h-[18px] leading-[18px] font-mono text-[9px] text-muted">{d}</span>
              ))}
            </div>

            {weeks.map((week, wi) => (
              <div key={wi} className="flex-1 min-w-0 flex flex-col gap-1">
                {Array.from({ length: 7 }).map((_, di) => {
                  const day = week.find((d) => new Date(`${d.date}T00:00:00Z`).getUTCDay() === di)
                  if (!day) return <div key={di} className="w-full h-[18px]" />
                  const isEaten = chomper.running && chomper.eaten.has(`${wi}:${di}`)
                  const level = isEaten ? 0 : day.level
                  const delay = isEaten ? 0 : (wi * 7 + di) * 1.1
                  return (
                    <button
                      key={di}
                      type="button"
                      aria-label={`${day.count} contributions on ${day.date}`}
                      className={`w-full h-[18px] rounded-[3px] transition-all duration-300 ease-out hover:scale-110 focus-visible:scale-110 ${
                        level >= 3 ? 'animate-contrib-pulse' : ''
                      }`}
                      style={{
                        backgroundColor: LEVEL_COLORS[level] ?? LEVEL_COLORS[0],
                        opacity: revealed ? 1 : 0,
                        transform: revealed ? 'scale(1)' : 'scale(0.3)',
                        transitionDelay: `${delay}ms`,
                        animationDelay: `${delay + 350}ms`,
                      }}
                      onMouseEnter={() => setHovered(day)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(day)}
                      onBlur={() => setHovered(null)}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
        <span className="font-mono text-[11px] text-muted min-h-[16px]">
          {hovered ? `${hovered.count} contribution${hovered.count === 1 ? '' : 's'} on ${hovered.date}` : ' '}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] text-muted">Less</span>
          {LEVEL_COLORS.map((c) => (
            <span key={c} className="w-[10px] h-[10px] rounded-[2px]" style={{ backgroundColor: c }} />
          ))}
          <span className="font-mono text-[10px] text-muted">More</span>
        </div>
      </div>
    </div>
  )
}
