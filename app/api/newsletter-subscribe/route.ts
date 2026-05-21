import { NextResponse } from 'next/server'
import { resend } from '@/lib/resend/client'
import { sendEmail } from '@/lib/resend/send'
import { verifyTurnstileToken } from '@/lib/turnstile/verify'

export const runtime = 'nodejs'

const DAY_MS = 24 * 60 * 60 * 1000
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type SubscribeResult =
  | { ok: true; debug: Record<string, unknown> }
  | { ok: false; error: string; debug?: Record<string, unknown> }

async function readEmail(req: Request): Promise<
  | { email: string; source: string; contentType: 'form' | 'json'; turnstileToken: string }
  | { error: string; contentType?: 'form' | 'json' }
> {
  const contentType = req.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    try {
      const body = (await req.json()) as Record<string, unknown>
      const email = typeof body.email === 'string' ? body.email.trim() : ''
      const source = typeof body.source === 'string' ? body.source : 'newsletter'
      const turnstileToken = typeof body.turnstileToken === 'string' ? body.turnstileToken : ''
      if (!email) return { error: 'email required', contentType: 'json' }
      return { email, source, contentType: 'json', turnstileToken }
    } catch {
      return { error: 'invalid JSON', contentType: 'json' }
    }
  }

  if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    try {
      const form = await req.formData()
      const email = String(form.get('email_address') || form.get('email') || '').trim()
      const source = String(form.get('source') || 'newsletter')
      const turnstileToken = String(form.get('cf-turnstile-response') || form.get('turnstileToken') || '')
      if (!email) return { error: 'email required', contentType: 'form' }
      return { email, source, contentType: 'form', turnstileToken }
    } catch {
      return { error: 'invalid form data', contentType: 'form' }
    }
  }

  return { error: 'unsupported content-type' }
}

async function subscribe(email: string, source: string): Promise<SubscribeResult> {
  const debug: Record<string, unknown> = {
    resendKeyPresent: Boolean(process.env.RESEND_API_KEY),
    source,
  }

  // 1. Create contact in Resend, then attach to newsletter segment.
  //
  // Two-step pattern required by Resend v6:
  //   contacts.create({ segments: [{ id }] }) is accepted by the API but silently
  //   drops the segment attachment — contacts never appear in the segment listing.
  //   The correct path: create contact → contacts.segments.add({ contactId, segmentId }).
  //   Verified via live smoke test 2026-05-20 (PR voss/resend-v6-segments-fix).
  const segmentId = process.env.RESEND_NEWSLETTER_AUDIENCE_ID
  if (!segmentId) {
    throw new Error('RESEND_NEWSLETTER_AUDIENCE_ID env var not set')
  }

  // Step 1a: create (or confirm existence of) the contact globally.
  let contactId: string | null = null
  const createResult = await resend.contacts.create({
    email,
    unsubscribed: false,
    properties: { source },
  })
  if (createResult.error) {
    const msg = createResult.error.message ?? String(createResult.error)
    const isAlreadyExists =
      msg.toLowerCase().includes('already exist') ||
      msg.toLowerCase().includes('already been')
    if (!isAlreadyExists) {
      debug.contactStep = 'error'
      debug.contactError = msg
      console.error('[newsletter-subscribe] resend.contacts.create failed', createResult.error)
      return { ok: false, error: `contact: ${msg}`, debug }
    }
    // Contact already exists — segmentAdd below will match by email.
    debug.contactStep = 'already-exists'
  } else {
    contactId = createResult.data?.id ?? null
    debug.contactStep = 'created'
  }

  // Step 1b: attach the contact to the newsletter segment.
  // Uses contactId when available (fresh create), falls back to email (existing contact).
  const addOptions = contactId
    ? { contactId, segmentId }
    : { email, segmentId }
  const segmentResult = await resend.contacts.segments.add(addOptions)
  if (segmentResult.error) {
    const msg = segmentResult.error.message ?? String(segmentResult.error)
    // Non-fatal: contact is created, drip still fires. Log and continue.
    debug.segmentStep = 'error'
    debug.segmentError = msg
    console.error('[newsletter-subscribe] contacts.segments.add failed', segmentResult.error)
  } else {
    debug.segmentStep = 'ok'
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

  // Bot protection: verify Turnstile token BEFORE any Resend calls.
  const verification = await verifyTurnstileToken(parsed.turnstileToken)
  if (!verification.success) {
    console.warn('[newsletter-subscribe] Turnstile verification failed', verification.errorCodes)
    if (parsed.contentType === 'form') {
      const url = new URL('/thanks', req.url)
      url.searchParams.set('error', 'verification_failed')
      return NextResponse.redirect(url, 303)
    }
    return NextResponse.json({ error: 'verification_failed' }, { status: 403 })
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
