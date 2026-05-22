'use client'

import { useState, useRef } from 'react'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''

type Variant = 'hero' | 'footer'

type Props = {
  variant: Variant
  source: string
}

export default function QsgOptinForm({ variant, source }: Props) {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'delivered' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const turnstileRef = useRef<TurnstileInstance>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    if (!turnstileToken) {
      setErrorMsg('Complete the human verification below.')
      return
    }

    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/qsg-optin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim() || 'Friend',
          source,
          turnstileToken,
        }),
      })

      if (res.status === 403) {
        setErrorMsg('Verification failed. Please refresh and try again.')
        setStatus('error')
        turnstileRef.current?.reset()
        return
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as Record<string, unknown>
        setErrorMsg(typeof body.error === 'string' ? body.error : 'Something went wrong. Please try again.')
        setStatus('error')
        turnstileRef.current?.reset()
        return
      }

      setStatus('delivered')
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
      turnstileRef.current?.reset()
    }
  }

  if (status === 'delivered') {
    return (
      <div className="bg-surface-low border-l-4 border-gold p-8 max-w-lg flex flex-col gap-4">
        <p className="font-label text-xs uppercase tracking-[0.2em] text-gold font-bold">
          Check your email
        </p>
        <h2 className="font-headline text-2xl font-light text-primary leading-snug">
          Your QSG is on the way.
        </h2>
        <p className="font-body text-sm text-on-surface-variant leading-relaxed">
          The download link is in your inbox. If it&apos;s not there in a minute, check promotions
          or spam — and add <strong>connect@enchantinglifeunleashed.com</strong> to your contacts so
          the next one lands clean.
        </p>
        <p className="font-body text-sm text-primary">
          Read it once. Run one cycle. Then come back for the Starter Kit ($7).
        </p>
      </div>
    )
  }

  if (variant === 'hero') {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <div className="flex flex-col gap-2">
          <label className="font-label text-xs uppercase tracking-widest text-primary font-bold">
            First name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Your first name"
            className="w-full bg-transparent border-0 border-b border-gold px-0 py-3 text-lg font-body focus:outline-none focus:ring-0 focus:border-primary transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-label text-xs uppercase tracking-widest text-primary font-bold">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
            className="w-full bg-transparent border-0 border-b border-gold px-0 py-3 text-lg font-body focus:outline-none focus:ring-0 focus:border-primary transition-colors"
          />
        </div>
        <Turnstile
          ref={turnstileRef}
          siteKey={SITE_KEY}
          onSuccess={setTurnstileToken}
          onError={() => setErrorMsg('Verification error. Please refresh.')}
          onExpire={() => { setTurnstileToken(''); turnstileRef.current?.reset() }}
          options={{ theme: 'light', size: 'normal', appearance: 'interaction-only' }}
        />
        {errorMsg && (
          <p className="font-body text-xs text-secondary mt-1">{errorMsg}</p>
        )}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary w-full text-center mt-2 disabled:opacity-50"
        >
          {status === 'submitting' ? 'Sending...' : 'Send me the Guide'}
        </button>
        <p className="font-body text-[10px] uppercase tracking-wider text-on-surface-variant/60 mt-1 text-center">
          No spam. Unsubscribe anytime.
        </p>
      </form>
    )
  }

  // footer variant
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      <div className="flex flex-col gap-2">
        <label className="font-label text-xs uppercase tracking-widest text-white/80 font-bold">
          Email address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          required
          className="w-full bg-transparent border-0 border-b-2 border-gold text-white placeholder-white/50 font-body text-sm px-0 py-3 focus:outline-none focus:ring-0"
        />
      </div>
      <Turnstile
        ref={turnstileRef}
        siteKey={SITE_KEY}
        onSuccess={setTurnstileToken}
        onError={() => setErrorMsg('Verification error. Please refresh.')}
        onExpire={() => { setTurnstileToken(''); turnstileRef.current?.reset() }}
        options={{ theme: 'dark', size: 'normal', appearance: 'interaction-only' }}
      />
      {errorMsg && (
        <p className="font-body text-xs text-white/70 mt-1">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full text-center disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending...' : 'Send me the Guide'}
      </button>
    </form>
  )
}
