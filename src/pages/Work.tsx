import React from 'react'
import ProjectCard from '../components/ProjectCard.tsx'
import GsapRevealGrid from '../components/GsapRevealGrid.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import { useProjects } from '../lib/useProjects.ts'

export default function Work() {
  const projects = useProjects()
  return (
    <section className="relative">
      <div className="max-w-[1600px] mx-auto px-6 pt-[80px] pb-[clamp(60px,8vw,110px)]">
        <SectionHeading
          eyebrow="Work"
          title="Projects I've built"
          description="Projects, described honestly — what they do, how they're built, and where to see them."
          align="left"
        />
        <GsapRevealGrid className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </GsapRevealGrid>
      </div>
    </section>
  )
}
