import React from 'react'
import { Link } from 'react-router-dom'
import { profile } from '../data/profile.ts'

const COLUMNS = [
  { label: 'Work', to: '/work' },
  { label: 'Tech Stack', to: '/infra' },
  { label: 'About', to: '/about' },
  { label: 'Resume', to: '/resume' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border mt-10">
      <div className="max-w-[1600px] mx-auto px-6 pt-12 pb-6 flex flex-wrap justify-between gap-8">
        <div>
          <div className="inline-flex items-center gap-2.5 font-semibold text-[15px] mb-2">
            <span className="w-[26px] h-[26px] rounded-[7px] bg-white text-black inline-flex items-center justify-center font-bold text-sm" aria-hidden="true">S</span>
            {profile.name}
          </div>
          <p className="text-muted text-[13.5px]">{profile.role} · {profile.university}</p>
        </div>
        <nav className="flex flex-wrap gap-4.5" aria-label="Footer">
          {COLUMNS.map((c) => (
            <Link key={c.label} to={c.to} className="text-muted text-[13.5px] hover:text-ink">
              {c.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-4.5">
          <a href={profile.github} target="_blank" rel="noreferrer" className="text-muted text-[13.5px] hover:text-ink">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-muted text-[13.5px] hover:text-ink">LinkedIn</a>
          <a href={`mailto:${profile.email}`} className="text-muted text-[13.5px] hover:text-ink">Email</a>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto px-6 pt-4.5 pb-8 flex flex-col sm:flex-row justify-between gap-1.5 sm:gap-2.5 text-muted text-[12.5px] font-mono">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="text-right">Designed with intent. Built with curiosity.</span>
      </div>
    </footer>
  )
}
