import React, { useEffect, useState } from 'react'

// True while the element is on screen. With `once`, it stays true after the
// first sighting, which is what entrance animations want.
export function useInView(ref: React.RefObject<HTMLElement>, { once = false, threshold = 0.3 } = {}) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (once && entry.isIntersecting) io.disconnect()
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, once, threshold])
  return inView
}
