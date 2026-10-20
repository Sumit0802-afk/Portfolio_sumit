import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

interface NavbarProps {
  onOpenPalette?: () => void
  onOpenTerminal?: () => void
}

type NavLinkItem =
  | { label: string; to: string; external?: false }
  | { label: string; href: string; external: true }

function isExternal(link: NavLinkItem): link is { label: string; href: string; external: true } {
  return link.external === true
}

const LINKS: NavLinkItem[] = [
  { label: 'Work', to: '/work' },
  { label: 'Tech Stack', to: '/infra' },
  { label: 'GitHub', href: 'https://github.com/Sumit0802-afk', external: true },
  { label: 'About', to: '/about' },
  { label: 'Resume', to: '/resume' },
]

export default function Navbar({ onOpenPalette, onOpenTerminal }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[14px] transition-colors duration-150 ${isActive ? 'text-accent font-medium drop-shadow-[0_0_8px_rgba(0,255,157,0.4)]' : 'text-neutral-300 hover:text-accent'}`

  return (
    <header className="sticky top-0 z-50 bg-black/85 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-6">
        {/* Brand / Logo */}
        <Link className="inline-flex items-center gap-3 shrink-0" to="/" aria-label="Sumit Bhamu, home">
          <span className="w-[30px] h-[30px] rounded-[8px] bg-white text-black inline-flex items-center justify-center font-bold text-[15px] shrink-0 shadow-sm" aria-hidden="true">
            S
          </span>
          <span className="font-semibold text-[15px] tracking-[-0.01em] text-white">Sumit Bhamu</span>
        </Link>

        {/* Center Links (Work, Tech Stack, GitHub, About, Resume) */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {LINKS.map((link) =>
            isExternal(link) ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-[14px] text-neutral-300 hover:text-accent transition-colors duration-150"
              >
                {link.label}
              </a>
            ) : (
              <NavLink key={link.label} to={link.to} className={navLinkClass}>
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        {/* Right CTA Button ("Say hello" with blue arrow square) */}
        <div className="flex items-center gap-3">
          <Link
            className="inline-flex items-center gap-2.5 bg-accent/[0.14] hover:bg-accent/25 text-white text-[13.5px] font-medium pl-4 pr-1.5 py-1.5 rounded-full border border-accent/35 hover:border-accent/65 backdrop-blur-md shadow-[0_0_16px_-4px_rgba(0,255,157,0.3)] hover:shadow-[0_0_24px_-2px_rgba(0,255,157,0.55)] hover:-translate-y-0.5 transition-all duration-200 shrink-0"
            to="/contact"
          >
            <span>Say hello</span>
            <span className="w-[20px] h-[20px] rounded-[5px] bg-[#00ff9d] shadow-[0_0_10px_rgba(0,255,157,0.6)] inline-flex items-center justify-center shrink-0" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="w-[11px] h-[11px] text-[#030705]" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </span>
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-[34px] h-[34px] rounded-lg border border-border bg-transparent text-white"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col gap-1 px-6 pb-5 pt-3 border-t border-white/[0.08] bg-black/95" aria-label="Mobile">
          {LINKS.map((link) =>
            isExternal(link) ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 text-neutral-300 text-[14.5px] border-b border-neutral-800/60"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `py-2.5 text-[14.5px] border-b border-neutral-800/60 transition-colors ${isActive ? 'text-accent font-medium' : 'text-neutral-300 hover:text-accent'}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            )
          )}
          <Link
            className="inline-flex items-center justify-center gap-2.5 bg-accent/[0.14] hover:bg-accent/25 text-white text-[14px] font-medium py-2.5 rounded-full border border-accent/35 backdrop-blur-md mt-3 transition-all duration-150"
            to="/contact"
            onClick={() => setMenuOpen(false)}
          >
            <span>Say hello</span>
            <span className="w-[18px] h-[18px] rounded-[4px] bg-[#00ff9d] shadow-[0_0_8px_rgba(0,255,157,0.6)] inline-flex items-center justify-center shrink-0" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="w-[10px] h-[10px] text-[#030705]" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7" /><path d="M7 7h10v10" />
              </svg>
            </span>
          </Link>
        </nav>
      )}
    </header>
  )
}
