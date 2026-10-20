import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { profile } from '../data/profile.ts'

interface TerminalProps {
  open: boolean
  onClose: () => void
}

const HELP = [
  'Available commands:',
  '  help      show this list',
  '  about     short bio',
  '  skills    core skills',
  '  projects  open the work page',
  '  contact   open the contact page',
  '  clear     clear the screen',
]

export default function Terminal({ open, onClose }: TerminalProps) {
  const [lines, setLines] = useState<string[]>([
    'sumit@portfolio ~ % welcome. type "help" to see available commands.',
  ])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const bodyRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus())
  }, [open])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines])

  function run(cmdRaw: string) {
    const cmd = cmdRaw.trim().toLowerCase()
    if (!cmd) return
    const echo = `sumit@portfolio ~ % ${cmdRaw}`
    switch (cmd) {
      case 'help':
        setLines((l) => [...l, echo, ...HELP])
        break
      case 'about':
        setLines((l) => [...l, echo, `${profile.name} — ${profile.role} at ${profile.university}.`])
        break
      case 'skills':
        setLines((l) => [...l, echo, 'Python, Java, JavaScript, TypeScript, React, Node.js, SQL, Pandas, NumPy.'])
        break
      case 'projects':
        setLines((l) => [...l, echo, 'Opening /work …'])
        navigate('/work')
        break
      case 'contact':
        setLines((l) => [...l, echo, 'Opening /contact …'])
        navigate('/contact')
        break
      case 'clear':
        setLines([])
        break
      default:
        setLines((l) => [...l, echo, `command not found: ${cmd}. type "help" for a list.`])
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      run(input)
      setInput('')
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] bg-black/50 flex items-start justify-center pt-[14vh] p-5" onClick={onClose}>
      <div
        className="w-[min(560px,92vw)] max-h-[60vh] flex flex-col bg-[#08080a] border border-border rounded-xl shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)] overflow-hidden font-mono"
        role="dialog"
        aria-modal="true"
        aria-label="Terminal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-3.5 py-2.5 border-b border-border text-xs text-muted">
          <span>Terminal — informational only, not a real shell</span>
          <button type="button" onClick={onClose} aria-label="Close terminal" className="text-muted hover:text-white text-lg leading-none">×</button>
        </div>
        <div className="p-3.5 overflow-y-auto flex-1 min-h-[180px]" ref={bodyRef}>
          {lines.map((l, i) => (
            <div key={i} className="text-[13px] text-ink leading-7 whitespace-pre-wrap">{l}</div>
          ))}
        </div>
        <div className="flex items-center gap-2 px-3.5 py-2.5 border-t border-border">
          <span className="text-accent-2 text-[13px]">%</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Terminal input"
            autoComplete="off"
            spellCheck="false"
            className="flex-1 bg-transparent border-none text-ink text-[13px] focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}
