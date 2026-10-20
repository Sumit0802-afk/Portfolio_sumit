import React, { useState } from 'react'

export default function BarChart({ data }: { data: { label: string; count: number }[] }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const max = Math.max(1, ...data.map((d) => d.count))
  const peakIndex = data.reduce((best, d, i) => (d.count > data[best].count ? i : best), 0)

  return (
    <div>
      <div className="flex items-end gap-1.5 h-[140px]">
        {data.map((d, i) => (
          <div
            key={`${d.label}-${i}`}
            className="flex-1 flex flex-col items-center justify-end h-full group"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className={`font-mono text-[10px] mb-1 transition-opacity ${hovered === i ? 'opacity-100 text-accent' : 'opacity-0'}`}>
              {d.count}
            </span>
            <div
              className={`w-full rounded-t-[3px] transition-colors ${i === peakIndex ? 'bg-accent' : 'bg-accent/30 group-hover:bg-accent/60'}`}
              style={{ height: `${Math.max(3, (d.count / max) * 100)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 mt-2">
        {data.map((d, i) => (
          <span key={`${d.label}-${i}`} className="flex-1 text-center font-mono text-[9px] text-muted">{d.label}</span>
        ))}
      </div>
    </div>
  )
}
