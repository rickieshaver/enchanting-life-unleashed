'use client'

import { useState, useRef } from 'react'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''

type Theme = 'light' | 'dark'

type Props = {
  source: string
  theme?: Theme
  /** CSS class applied to the outer form element */
  className?: string
  /** CSS class applied to the email input */
  inputClassName?: string
  /** CSS class applied to the submit button */
  buttonClassName?: string
}

export default function NewsletterForm({
  source,
  theme = 'light',
  className = 'flex flex-col sm:flex-row gap-4 w-full max-w-md',
  inputClassName = 'flex-1 bg-transparent border-0 border-b-2 border-gold text-primary placeholder-on-surface-variant/50 font-body text-sm px-0 py-4 focus:outline-none focus:ring-0',
  buttonClassName = 'btn-primary shrink-0',
}: Props) {
  const [email, setEmail] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
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
      const res = await fetch('/api/newsletter-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source, turnstileToken }),
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

      setStatus('success')
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
      turnstileRef.current?.reset()
    }
  }

  if (status === 'success') {
    return (
      <p className="font-body text-sm text-on-surface-variant">
        You&apos;re in. Check your inbox for a welcome note.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      <div className={className}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className={inputClassName}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={`${buttonClassName} disabled:opacity-50`}
        >
          {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      <Turnstile
        ref={turnstileRef}
        siteKey={SITE_KEY}
        onSuccess={setTurnstileToken}
        onError={() => setErrorMsg('Verification error. Please refresh.')}
        onExpire={() => { setTurnstileToken(''); turnstileRef.current?.reset() }}
        options={{ theme, size: 'normal', appearance: 'interaction-only' }}
      />
      {errorMsg && (
        <p className="font-body text-xs text-secondary">{errorMsg}</p>
      )}
    </form>
  )
}
