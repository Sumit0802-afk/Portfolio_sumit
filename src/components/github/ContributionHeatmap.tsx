import React, { useEffect, useState } from 'react'
import type { ContributionDay } from '../../lib/github.ts'

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

export default function ContributionHeatmap({ days: allDays }: { days: ContributionDay[]; total: number }) {
  const [hovered, setHovered] = useState<ContributionDay | null>(null)
  const [revealed, setRevealed] = useState(false)
  const days = sinceApril(allDays)
  const total = days.reduce((sum, d) => sum + d.count, 0)
  const weeks = groupByWeek(days)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setRevealed(true)
      return
    }
    const id = requestAnimationFrame(() => setRevealed(true))
    return () => cancelAnimationFrame(id)
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
    <div>
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

          <div className="flex gap-1">
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
                  const delay = (wi * 7 + di) * 1.1
                  return (
                    <button
                      key={di}
                      type="button"
                      aria-label={`${day.count} contributions on ${day.date}`}
                      className={`w-full h-[18px] rounded-[3px] transition-all duration-300 ease-out hover:scale-110 focus-visible:scale-110 ${
                        day.level >= 3 ? 'animate-contrib-pulse' : ''
                      }`}
                      style={{
                        backgroundColor: LEVEL_COLORS[day.level] ?? LEVEL_COLORS[0],
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
