import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../components/ui/Heading.tsx'

export default function NotFound() {
  return (
    <section className="relative">
      <div className="max-w-[1600px] mx-auto px-6 text-center py-[180px]">
        <Heading tag="h1" align="center" className="font-serif text-3xl text-white mb-3">Page not found</Heading>
        <p className="text-muted text-sm mb-6">The page you're looking for doesn't exist.</p>
        <Link className="btn btn-outline" to="/">Back home</Link>
      </div>
    </section>
  )
}
