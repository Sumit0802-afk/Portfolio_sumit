import React, { useState } from 'react'
import ContactParticleField from '../components/ContactParticleField.tsx'
import { profile } from '../data/profile.ts'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

const PROJECT_TYPES = [
  'Freelance Project',
  'Website Development',
  'UI/UX Design',
  'Technical Collaboration',
  'Internship or Opportunity',
  'Other',
]

interface FormState {
  name: string
  email: string
  projectType: string
  message: string
}

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error'

const SOCIAL_CARDS = [
  {
    label: 'Email',
    value: profile.email,
    sub: 'Send me a note.',
    href: `mailto:${profile.email}`,
    icon: <><path d="M4 5h16v14H4z" /><path d="m4 6 8 7 8-7" /></>,
  },
  {
    label: 'WhatsApp',
    value: '+91 9571015740',
    sub: 'Message directly.',
    href: profile.whatsapp,
    icon: <path d="M4 20l1.4-4.1A8 8 0 1 1 9 18.6Z" />,
  },
  {
    label: 'GitHub',
    value: profile.github.replace('https://', ''),
    sub: 'Explore my code and projects.',
    href: profile.github,
    icon: <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-2 1.03-2.7-.1-.25-.45-1.26.1-2.63 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.38.1 2.63.64.7 1.03 1.6 1.03 2.7 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />,
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'Connect professionally.',
    sub: '',
    href: profile.linkedin,
    icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7.5 10v7M7.5 7v.01M11.5 17v-4.5a2 2 0 0 1 4 0V17M11.5 17v-7" /></>,
    external: true,
  },
  {
    label: 'Instagram',
    value: '@sumit.bhamu',
    sub: 'Follow my journey.',
    href: profile.instagram,
    icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="3.5" /><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" /></>,
    external: true,
    gradient: true,
  },
]

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', projectType: PROJECT_TYPES[0], message: '' })
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')

  function validate(values: FormState): Partial<FormState> {
    const next: Partial<FormState> = {}
    if (!values.name.trim()) next.name = 'Name is required.'
    if (!values.email.trim()) next.email = 'Email is required.'
    else if (!EMAIL_RE.test(values.email)) next.email = 'Enter a valid email address.'
    if (!values.message.trim()) next.message = 'Message is required.'
    return next
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'sending') return
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    if (!WEB3FORMS_KEY) {
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio contact from ${form.name} — ${form.projectType}`,
          from_name: form.name,
          email: form.email,
          project_type: form.projectType,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('sent')
        setForm({ name: '', email: '', projectType: PROJECT_TYPES[0], message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <ContactParticleField />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 pt-[clamp(140px,14vw,180px)] pb-[clamp(60px,8vw,110px)]">
        {/* Zone A — hero */}
        <div className="max-w-[760px] animate-fade-in-up">
          <div className="flex items-center gap-4 mb-5">
            <span className="font-mono text-xs tracking-[0.14em] text-accent">01 / CONTACT</span>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase text-muted border border-accent/25 bg-accent/[0.06] px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,255,163,0.8)] animate-pulse" />
              Available for collaborations
            </span>
          </div>

          <h1 className="font-serif text-[clamp(36px,6vw,64px)] font-semibold leading-[1.05] text-white">
            Let&apos;s build <span className="italic text-accent">something</span>
            <br />
            meaningful.
          </h1>
          <span className="block w-16 h-[2px] bg-gradient-to-r from-accent to-transparent mt-5 mb-5" />

          <p className="text-muted text-base sm:text-[17px] leading-relaxed max-w-[520px]">
            Have an idea worth building? Let&apos;s turn it into something real.
          </p>
        </div>

        {/* Zone B — workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 mt-[clamp(48px,6vw,80px)]">
          <div className="p-6 sm:p-8 rounded-[20px] border border-border bg-bg-raised/80 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '80ms' }}>
            <span className="font-mono text-xs uppercase tracking-wide text-accent block mb-2">Send a message</span>
            <h2 className="font-serif text-2xl sm:text-[28px] text-white mb-2">Tell me what you&apos;re thinking.</h2>
            <p className="text-muted text-sm leading-relaxed mb-7 max-w-[440px]">
              Share your idea, project, or collaboration opportunity. I&apos;ll get back to you as soon as possible.
            </p>

            {status === 'sent' ? (
              <div className="py-10 text-center">
                <p className="font-serif text-xl text-white mb-2">Message sent.</p>
                <p className="text-muted text-sm">Thanks for reaching out — I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form className="flex flex-col gap-5" onSubmit={onSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <label className="flex flex-col gap-2 text-[13px] text-muted">
                    Name
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={onChange}
                      className="px-3.5 py-2.5 rounded-[10px] border border-border bg-bg text-ink text-sm transition-colors focus:outline-none focus:border-accent/70 focus:shadow-[0_0_0_3px_rgba(0,255,163,0.12)]"
                    />
                    {errors.name && <span className="text-red-400 text-xs">{errors.name}</span>}
                  </label>
                  <label className="flex flex-col gap-2 text-[13px] text-muted">
                    Email
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={onChange}
                      className="px-3.5 py-2.5 rounded-[10px] border border-border bg-bg text-ink text-sm transition-colors focus:outline-none focus:border-accent/70 focus:shadow-[0_0_0_3px_rgba(0,255,163,0.12)]"
                    />
                    {errors.email && <span className="text-red-400 text-xs">{errors.email}</span>}
                  </label>
                </div>

                <label className="flex flex-col gap-2 text-[13px] text-muted">
                  Project type
                  <select
                    name="projectType"
                    value={form.projectType}
                    onChange={onChange}
                    className="px-3.5 py-2.5 rounded-[10px] border border-border bg-bg text-ink text-sm transition-colors focus:outline-none focus:border-accent/70 focus:shadow-[0_0_0_3px_rgba(0,255,163,0.12)]"
                  >
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2 text-[13px] text-muted">
                  Message
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell me a little about your idea..."
                    value={form.message}
                    onChange={onChange}
                    className="px-3.5 py-2.5 rounded-[10px] border border-border bg-bg text-ink text-sm resize-y transition-colors focus:outline-none focus:border-accent/70 focus:shadow-[0_0_0_3px_rgba(0,255,163,0.12)]"
                  />
                  {errors.message && <span className="text-red-400 text-xs">{errors.message}</span>}
                </label>

                {status === 'error' && (
                  <span className="text-red-400 text-xs">
                    {WEB3FORMS_KEY
                      ? "Couldn't send that — please try again, or email me directly."
                      : 'Contact form is not configured yet — email me directly in the meantime.'}
                  </span>
                )}

                <button
                  className="group btn btn-primary w-full justify-center"
                  type="submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending…' : (
                    <>LET&apos;S TALK <span className="inline-block transition-transform group-hover:translate-x-1">↗</span></>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="p-6 sm:p-8 rounded-[20px] border border-border bg-bg-raised/80 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '160ms' }}>
            <span className="font-mono text-xs uppercase tracking-wide text-accent block mb-2">Other ways to reach me</span>
            <p className="text-muted text-sm mb-6">Choose your preferred way to connect.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SOCIAL_CARDS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noopener noreferrer' : undefined}
                  className="group flex items-start gap-3 p-3.5 rounded-[14px] border border-border bg-bg transition-all hover:border-accent/50 hover:-translate-y-0.5"
                >
                  <span
                    className={`w-10 h-10 rounded-[11px] border flex items-center justify-center shrink-0 transition-colors ${
                      c.gradient
                        ? 'border-accent/25 bg-gradient-to-br from-[#f58529]/15 via-[#dd2a7b]/15 to-[#8134af]/15 group-hover:border-accent/60'
                        : 'border-accent/25 bg-accent/[0.08] group-hover:bg-accent/20 group-hover:border-accent/50'
                    } text-accent`}
                  >
                    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {c.icon}
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-1">
                      <span className="block text-ink text-sm font-medium group-hover:text-accent transition-colors">{c.label}</span>
                      <span className="text-muted text-xs shrink-0 transition-transform group-hover:translate-x-0.5">↗</span>
                    </span>
                    <span className="block text-muted text-xs mt-0.5 truncate">{c.value}</span>
                    {c.sub && <span className="block text-muted/70 text-[11px] mt-0.5 truncate">{c.sub}</span>}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Zone C — footer statement */}
        <div className="mt-[clamp(48px,6vw,80px)] pt-8 border-t border-border flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,255,163,0.7)]" />
          <p className="font-mono text-xs sm:text-[13px] tracking-[0.08em] uppercase text-muted">
            Good things start with a conversation.
          </p>
        </div>
      </div>
    </section>
  )
}
