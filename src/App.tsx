import React, { useCallback, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.tsx'
import Footer from './components/Footer.tsx'
import CommandPalette from './components/CommandPalette.tsx'
import Terminal from './components/Terminal.tsx'
import CursorBokeh from './components/CursorBokeh.tsx'

import Home from './pages/Home.tsx'
import Work from './pages/Work.tsx'
import ProjectDetail from './pages/ProjectDetail.tsx'
import About from './pages/About.tsx'
import Notes from './pages/Notes.tsx'
import NoteDetail from './pages/NoteDetail.tsx'
import Infra from './pages/Infra.tsx'
import Resume from './pages/Resume.tsx'
import Contact from './pages/Contact.tsx'
import NotFound from './pages/NotFound.tsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)

  const closeAll = useCallback(() => {
    setPaletteOpen(false)
    setTerminalOpen(false)
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isCmdK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'
      if (isCmdK) {
        e.preventDefault()
        setPaletteOpen((v) => {
          const next = !v
          if (next) setTerminalOpen(false)
          return next
        })
      }
      if (e.key === 'Escape') closeAll()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closeAll])

  return (
    <>
      <ScrollToTop />
      <CursorBokeh />
      <Navbar
        onOpenPalette={() => {
          setPaletteOpen(true)
          setTerminalOpen(false)
        }}
        onOpenTerminal={() => {
          setTerminalOpen(true)
          setPaletteOpen(false)
        }}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/:slug" element={<NoteDetail />} />
          <Route path="/infra" element={<Infra />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  )
}
