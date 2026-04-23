import { NextResponse } from 'next/server'
import { resend } from '@/lib/resend/client'
import { sendEmail } from '@/lib/resend/send'

export const runtime = 'nodejs'

const DAY_MS = 24 * 60 * 60 * 1000
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type SubscribeResult =
  | { ok: true; debug: Record<string, unknown> }
  | { ok: false; error: string; debug?: Record<string, unknown> }

async function readEmail(req: Request): Promise<{ email: string; source: string; contentType: 'form' | 'json' } | { error: string }> {
  const contentType = req.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    try {
      const body = (await req.json()) as Record<string, unknown>
      const email = typeof body.email === 'string' ? body.email.trim() : ''
      const source = typeof body.source === 'string' ? body.source : 'newsletter'
      if (!email) return { error: 'email required' }
      return { email, source, contentType: 'json' }
    } catch {
      return { error: 'invalid JSON' }
    }
  }

  if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    try {
      const form = await req.formData()
      const email = String(form.get('email_address') || form.get('email') || '').trim()
      const source = String(form.get('source') || 'newsletter')
      if (!email) return { error: 'email required' }
      return { email, source, contentType: 'form' }
    } catch {
      return { error: 'invalid form data' }
    }
  }

  return { error: 'unsupported content-type' }
}

async function subscribe(email: string, source: string): Promise<SubscribeResult> {
  const debug: Record<string, unknown> = {
    resendKeyPresent: Boolean(process.env.RESEND_API_KEY),
    source,
  }

  // 1. Create contact in Resend
  try {
    await resend.contacts.create({
      email,
      unsubscribed: false,
      properties: {
        source,
      },
    })
    debug.contactStep = 'ok'
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    debug.contactStep = 'error'
    debug.contactError = msg
    if (!msg.toLowerCase().includes('already exist') && !msg.toLowerCase().includes('already been')) {
      console.error('[newsletter-subscribe] resend.contacts.create failed', err)
      return { ok: false, error: `contact: ${msg}`, debug }
    }
  }

  // 2. Fire 5-email welcome drip — Day 0 immediate, rest scheduled via Resend.
  // Sequential with pacing to stay under Resend 5 req/sec limit.
  const now = Date.now()
  const at = (days: number) => new Date(now + days * DAY_MS).toISOString()

  const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))
  const INTER_SEND_DELAY_MS = 350

  const dripSteps = [
    {
      label: 'day-0-welcome',
      props: {
        to: email,
        template: 'newsletter-welcome' as const,
        subject: "You're in. Here's what you just joined.",
        firstName: 'Friend',
      },
    },
    {
      label: 'day-2-insight',
      props: {
        to: email,
        template: 'newsletter-insight' as const,
        subject: "The thing no one tells you about boundaries.",
        firstName: 'Friend',
        scheduledAt: at(2),
      },
    },
    {
      label: 'day-5-quiz',
      props: {
        to: email,
        template: 'newsletter-quiz-nudge' as const,
        subject: "Take the quiz if you haven't.",
        firstName: 'Friend',
        scheduledAt: at(5),
      },
    },
    {
      label: 'day-9-lunar',
      props: {
        to: email,
        template: 'newsletter-lunar-rhythm' as const,
        subject: "The lunar rhythm you can actually use.",
        firstName: 'Friend',
        scheduledAt: at(9),
      },
    },
    {
      label: 'day-14-brand',
      props: {
        to: email,
        template: 'newsletter-brand-story' as const,
        subject: "Here's what we're actually building.",
        firstName: 'Friend',
        scheduledAt: at(14),
      },
    },
  ]

  const failures: Array<{ step: string; error: string }> = []
  for (const [i, step] of dripSteps.entries()) {
    if (i > 0) await sleep(INTER_SEND_DELAY_MS)
    try {
      await sendEmail(step.props)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      failures.push({ step: step.label, error: msg })
      if (i === 0) {
        console.error('[newsletter-subscribe] day-0 send failed', err)
        debug.emailStep = 'day-0-failed'
        debug.failures = failures
        return { ok: false, error: `email: ${msg}`, debug }
      }
      console.error(`[newsletter-subscribe] ${step.label} scheduling failed`, err)
    }
  }

  debug.emailStep = failures.length === 0 ? 'ok' : 'partial'
  if (failures.length > 0) debug.failures = failures

  return { ok: true, debug }
}

export async function POST(req: Request) {
  const parsed = await readEmail(req)
  if ('error' in parsed) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 })
  }

  const { email, source, contentType } = parsed

  if (!EMAIL_REGEX.test(email)) {
    if (contentType === 'form') {
      const url = new URL('/thanks', req.url)
      url.searchParams.set('error', 'invalid_email')
      return NextResponse.redirect(url, 303)
    }
    return NextResponse.json({ ok: false, error: 'invalid email' }, { status: 400 })
  }

  const result = await subscribe(email, source)

  if (contentType === 'form') {
    // Plain HTML form POSTs get a redirect to the thanks page regardless of
    // sequence-level failures — the contact is saved, the user shouldn't see
    // an error page for a partial send.
    const url = new URL('/thanks', req.url)
    if (!result.ok) url.searchParams.set('error', 'send_failed')
    return NextResponse.redirect(url, 303)
  }

  return NextResponse.json(result, { status: result.ok ? 200 : 500 })
}
