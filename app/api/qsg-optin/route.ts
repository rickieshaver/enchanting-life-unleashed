import { NextResponse } from 'next/server'
import { resend } from '@/lib/resend/client'
import { sendEmail } from '@/lib/resend/send'
import { verifyTurnstileToken } from '@/lib/turnstile/verify'
import { attachToNewsletter } from '@/lib/resend/attach-to-newsletter'

export const runtime = 'nodejs'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const QSG_DOWNLOAD_URL =
  'https://enchantinglifeunleashed.com/downloads/lunar-alignment-quick-start-guide.pdf'

type ParsedInput =
  | { email: string; firstName: string; source: string; contentType: 'form' | 'json'; turnstileToken: string }
  | { error: string; contentType?: 'form' | 'json' }

async function readInput(req: Request): Promise<ParsedInput> {
  const contentType = req.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    try {
      const body = (await req.json()) as Record<string, unknown>
      const email = typeof body.email === 'string' ? body.email.trim() : ''
      const firstName =
        typeof body.firstName === 'string' && body.firstName.trim().length > 0
          ? body.firstName.trim()
          : 'Friend'
      const source = typeof body.source === 'string' ? body.source : 'qsg-optin'
      const turnstileToken = typeof body.turnstileToken === 'string' ? body.turnstileToken : ''
      if (!email) return { error: 'email required', contentType: 'json' }
      return { email, firstName, source, contentType: 'json', turnstileToken }
    } catch {
      return { error: 'invalid JSON', contentType: 'json' }
    }
  }

  if (
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data')
  ) {
    try {
      const form = await req.formData()
      const email = String(form.get('email_address') || form.get('email') || '').trim()
      const rawFirstName = String(form.get('first_name') || form.get('firstName') || '').trim()
      const firstName = rawFirstName.length > 0 ? rawFirstName : 'Friend'
      const source = String(form.get('source') || 'qsg-optin')
      const turnstileToken = String(form.get('cf-turnstile-response') || form.get('turnstileToken') || '')
      if (!email) return { error: 'email required', contentType: 'form' }
      return { email, firstName, source, contentType: 'form', turnstileToken }
    } catch {
      return { error: 'invalid form data', contentType: 'form' }
    }
  }

  return { error: 'unsupported content-type' }
}

/**
 * Create (or confirm existence of) the contact in Resend.
 * Returns the new contactId on fresh create, null if contact already exists.
 * Throws on hard Resend errors so the caller can surface a 500.
 */
async function tagContact(
  email: string,
  firstName: string,
  source: string,
): Promise<string | null> {
  const createResult = await resend.contacts.create({
    email,
    firstName,
    unsubscribed: false,
    properties: {
      source,
      qsg_optin_date: new Date().toISOString(),
    },
  })

  if (createResult.error) {
    const msg = createResult.error.message ?? String(createResult.error)
    const isAlreadyExists =
      msg.toLowerCase().includes('already exist') ||
      msg.toLowerCase().includes('already been')
    if (!isAlreadyExists) {
      console.error('[qsg-optin] resend.contacts.create failed', createResult.error)
      throw new Error(msg)
    }
    // Contact already exists — segment attach will match by email.
    return null
  }

  return createResult.data?.id ?? null
}

export async function POST(req: Request) {
  const parsed = await readInput(req)
  if ('error' in parsed) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 })
  }

  // Bot protection: verify Turnstile token BEFORE any Resend calls.
  const verification = await verifyTurnstileToken(parsed.turnstileToken)
  if (!verification.success) {
    console.warn('[qsg-optin] Turnstile verification failed', verification.errorCodes)
    if (parsed.contentType === 'form') {
      const url = new URL('/lunar-alignment-quick-start-guide', req.url)
      url.searchParams.set('error', 'verification_failed')
      return NextResponse.redirect(url, 303)
    }
    return NextResponse.json({ error: 'verification_failed' }, { status: 403 })
  }

  const { email, firstName, source, contentType } = parsed

  if (!EMAIL_REGEX.test(email)) {
    if (contentType === 'form') {
      const url = new URL('/lunar-alignment-quick-start-guide', req.url)
      url.searchParams.set('error', 'invalid_email')
      return NextResponse.redirect(url, 303)
    }
    return NextResponse.json({ ok: false, error: 'invalid email' }, { status: 400 })
  }

  // 1. Create / update contact in Resend, then attach to the ELU Newsletter
  //    segment (soft opt-in — no checkbox required).
  //
  //    Two-step pattern mirrors newsletter-subscribe/route.ts: contacts.create
  //    does NOT reliably attach segments inline (Resend v6 quirk — verified
  //    2026-05-20). Segment attach is non-fatal; QSG delivery still fires on
  //    attach failure.
  let contactError: string | null = null
  let contactId: string | null = null
  try {
    contactId = await tagContact(email, firstName, source)
  } catch (err) {
    contactError = err instanceof Error ? err.message : String(err)
  }

  // 1b. Attach to newsletter segment — non-fatal, swallowed on error.
  await attachToNewsletter(contactId, email, '[qsg-optin]')

  let sendError: string | null = null
  try {
    await sendEmail({
      to: email,
      template: 'qsg-delivery',
      subject: 'Your Lunar Alignment Quick Start Guide is here.',
      firstName,
      downloadUrl: QSG_DOWNLOAD_URL,
    })
  } catch (err) {
    sendError = err instanceof Error ? err.message : String(err)
    console.error('[qsg-optin] qsg-delivery send failed', err)
  }

  if (contentType === 'form') {
    const url = new URL('/lunar-alignment-quick-start-guide', req.url)
    if (sendError) url.searchParams.set('error', 'send_failed')
    else url.searchParams.set('delivered', '1')
    return NextResponse.redirect(url, 303)
  }

  if (sendError) {
    return NextResponse.json(
      { ok: false, error: sendError, contactError },
      { status: 500 },
    )
  }

  return NextResponse.json(
    { ok: true, contactError },
    { status: 200 },
  )
}
