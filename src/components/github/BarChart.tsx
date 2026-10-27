import React, { useRef, useState } from 'react'
import { useInView } from '../../lib/useInView.ts'

export default function BarChart({ data }: { data: { label: string; count: number }[] }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  // Bars grow up from the baseline, left to right, the first time the chart
  // scrolls into view; the peak bar then shows its count.
  const shown = useInView(ref, { once: true })
  const max = Math.max(1, ...data.map((d) => d.count))
  const peakIndex = data.reduce((best, d, i) => (d.count > data[best].count ? i : best), 0)
  const settleMs = 700 + data.length * 60

  return (
    <div ref={ref}>
      <div className="flex items-end gap-1.5 h-[140px]">
        {data.map((d, i) => {
          const isPeak = i === peakIndex && d.count > 0
          const showCount = hovered === i || (isPeak && shown)
          return (
            <div
              key={`${d.label}-${i}`}
              className="flex-1 flex flex-col items-center justify-end h-full group"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span
                className={`font-mono text-[10px] mb-1 transition-opacity duration-300 ${showCount ? 'opacity-100 text-accent' : 'opacity-0'}`}
                style={{ transitionDelay: isPeak && hovered !== i ? `${settleMs}ms` : '0ms' }}
              >
                {d.count}
              </span>
              <div
                className={`w-full rounded-t-[3px] origin-bottom transition-[transform,background-color] motion-reduce:transition-none ${
                  isPeak ? 'bg-accent shadow-[0_0_14px_rgba(0,255,157,0.45)]' : 'bg-accent/30 group-hover:bg-accent/60'
                }`}
                style={{
                  height: `${Math.max(3, (d.count / max) * 100)}%`,
                  transform: shown ? 'scaleY(1)' : 'scaleY(0)',
                  transitionDuration: '700ms, 150ms',
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.4, 0.64, 1), ease',
                  transitionDelay: `${i * 60}ms, 0ms`,
                }}
              />
            </div>
          )
        })}
      </div>
      <div className="flex gap-1.5 mt-2">
        {data.map((d, i) => (
          <span key={`${d.label}-${i}`} className="flex-1 text-center font-mono text-[9px] text-muted">{d.label}</span>
        ))}
      </div>
    </div>
  )
}
