import React from 'react'
import TextEngine from 'spring-text-engine'

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface HeadingProps {
  tag: Tag
  children: React.ReactNode
  className?: string
  align?: 'left' | 'center'
}

export default function Heading({ tag, children, className = '', align = 'left' }: HeadingProps) {
  const justify = align === 'center' ? 'justify-center' : ''
  return (
    <TextEngine
      tag={tag}
      mode="once"
      letterOut={{ opacity: 0, y: 30 }}
      letterIn={{ opacity: 1, y: 0 }}
      letterConfig={{ tension: 420, friction: 12 }}
      letterStagger={28}
      className={[justify, className].filter(Boolean).join(' ')}
    >
      {children}
    </TextEngine>
  )
}
