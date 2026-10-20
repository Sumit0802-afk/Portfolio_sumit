import React from 'react'
import Heading from './Heading.tsx'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  spacingClassName?: string
  titleClassName?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  spacingClassName = 'mb-12',
  titleClassName = 'text-[clamp(26px,3.4vw,38px)]',
}: SectionHeadingProps) {
  const alignClass = align === 'left' ? 'mx-0 text-left' : 'mx-auto text-center'
  return (
    <div className={`max-w-[640px] ${spacingClassName} ${alignClass}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Heading
        tag="h2"
        align={align}
        className={`font-serif ${titleClassName} font-semibold text-white`}
      >
        {title}
      </Heading>
      {description && <p className="mt-3.5 text-muted text-base leading-relaxed">{description}</p>}
    </div>
  )
}
