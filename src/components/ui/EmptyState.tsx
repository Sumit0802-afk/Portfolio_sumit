import React from 'react'
import Heading from './Heading.tsx'

interface EmptyStateProps {
  title: string
  description: string
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-6 border border-dashed border-border rounded-card">
      <div className="text-2xl text-muted mb-3.5" aria-hidden="true">○</div>
      <Heading tag="h3" align="center" className="text-[17px] mb-2">{title}</Heading>
      <p className="text-muted text-sm max-w-[360px] mx-auto">{description}</p>
    </div>
  )
}
