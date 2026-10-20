import React from 'react'
import { techIcons } from '../data/techIcons.ts'

// A couple of skills aren't products with a brand logo — give them a
// generic inline icon instead of falling back to bare initials.
const genericIcons: Record<string, React.ReactNode> = {
  'Data Visualization': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <rect x="7" y="12" width="3" height="7" />
      <rect x="12.5" y="8" width="3" height="11" />
      <rect x="18" y="14" width="3" height="5" />
    </svg>
  ),
  'Exploratory Data Analysis': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m21 21-4.3-4.3" />
      <path d="M7.5 11.5 9 9l2 2 2.5-3" />
    </svg>
  ),
}

interface TechIconGridProps {
  items: string[]
  /** 'hover' shows the name only on hover (teaser use); 'always' keeps it visible (detail pages). */
  labelMode?: 'hover' | 'always'
  align?: 'center' | 'left'
  size?: 'md' | 'sm'
}

export default function TechIconGrid({ items, labelMode = 'hover', align = 'center', size = 'md' }: TechIconGridProps) {
  const iconSize = size === 'sm'
    ? 'w-[clamp(26px,3.2vw,40px)] h-[clamp(26px,3.2vw,40px)]'
    : 'w-[clamp(32px,4.5vw,64px)] h-[clamp(32px,4.5vw,64px)]'

  return (
    <div
      className={`flex flex-wrap gap-x-10 gap-y-8 sm:gap-x-12 sm:gap-y-10 ${
        align === 'center' ? 'max-w-[1200px] mx-auto justify-center' : 'justify-start'
      }`}
    >
      {items.map((name) => {
        const icon = techIcons[name]
        const generic = genericIcons[name]
        return (
          <div key={name} className="group flex flex-col items-center gap-2.5" title={name}>
            {icon ? (
              <img
                src={icon}
                alt={name}
                loading="lazy"
                className={`${iconSize} object-contain transition-transform duration-200 group-hover:scale-110 group-hover:drop-shadow-[0_0_14px_rgba(0,255,157,0.5)]`}
              />
            ) : generic ? (
              <div
                className={`${iconSize} text-accent/80 transition-all duration-200 group-hover:scale-110 group-hover:text-accent group-hover:drop-shadow-[0_0_14px_rgba(0,255,157,0.5)]`}
                aria-hidden="true"
              >
                {generic}
              </div>
            ) : (
              <div
                className={`${iconSize} rounded-xl border border-border bg-bg-raised flex items-center justify-center text-muted font-mono text-xs transition-colors duration-200 group-hover:border-accent/40 group-hover:text-accent`}
                aria-hidden="true"
              >
                {name.slice(0, 2)}
              </div>
            )}
            <span
              className={`text-[11px] font-mono text-muted text-center transition-opacity ${
                labelMode === 'hover' ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
              }`}
            >
              {name}
            </span>
          </div>
        )
      })}
    </div>
  )
}
