import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

interface Command {
  label: string
  to?: string
  href?: string
}

const COMMANDS: Command[] = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'Notes', to: '/notes' },
  { label: 'Infra', to: '/infra' },
  { label: 'About', to: '/about' },
  { label: 'Resume', to: '/resume' },
  { label: 'Contact', to: '/contact' },
  { label: 'GitHub ↗', href: 'https://github.com/Sumit0802-afk' },
]

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()

  const results = useMemo(
    () => COMMANDS.filter((c) => c.label.toLowerCase().includes(query.toLowerCase())),
    [query]
  )

  useEffect(() => {
    if (open) {
      setQuery('')
      setIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  function select(cmd?: Command) {
    if (!cmd) return
    if (cmd.to) navigate(cmd.to)
    else if (cmd.href) window.open(cmd.href, '_blank', 'noreferrer')
    onClose()
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      select(results[index])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] bg-black/50 flex items-start justify-center pt-[14vh] p-5" onClick={onClose}>
      <div
        className="w-[min(560px,92vw)] bg-bg-raised border border-border rounded-2xl shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          className="w-full px-5 py-[18px] bg-transparent border-none border-b border-border text-ink text-[15px] focus:outline-none"
          type="text"
          placeholder="Jump to a page or action…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIndex(0)
          }}
          onKeyDown={onKeyDown}
          aria-label="Search commands"
        />
        <ul className="max-h-80 overflow-y-auto p-2" role="listbox">
          {results.length === 0 && <li className="p-3.5 text-muted text-[13.5px]">No matches</li>}
          {results.map((cmd, i) => (
            <li key={cmd.label}>
              <button
                type="button"
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm ${i === index ? 'bg-white/[0.06] text-white' : 'bg-transparent text-muted'}`}
                onMouseEnter={() => setIndex(i)}
                onClick={() => select(cmd)}
              >
                {cmd.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="px-4 py-2.5 border-t border-border font-mono text-[11px] text-muted">
          ↑↓ to navigate · Enter to select · Esc to close
        </div>
      </div>
    </div>
  )
}
