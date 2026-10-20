import React from 'react'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import Heading from '../components/ui/Heading.tsx'
import TechIconGrid from '../components/TechIconGrid.tsx'
import { skillGroups } from '../data/skills.ts'

export default function Infra() {
  return (
    <section className="relative">
      <div className="max-w-[1600px] mx-auto px-6 pt-[clamp(140px,14vw,180px)] pb-[clamp(60px,8vw,110px)]">
        <SectionHeading
          eyebrow="Infra"
          title="Technical toolkit"
          description="No proficiency bars or rankings — just the technologies in active use."
          align="left"
        />
        <div className="flex flex-col gap-14">
          {skillGroups.map((group) => (
            <div key={group.category} className="border-t border-border pt-9 first:border-t-0 first:pt-0">
              <Heading tag="h3" className="text-base mb-7 text-white">{group.category}</Heading>
              <TechIconGrid items={group.items} labelMode="always" align="left" size="sm" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
