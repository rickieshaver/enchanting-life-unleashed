import { NextResponse } from 'next/server'
import { resend } from '@/lib/resend/client'
import { sendEmail } from '@/lib/resend/send'

export const runtime = 'nodejs'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const QSG_DOWNLOAD_URL =
  'https://enchantinglifeunleashed.com/downloads/lunar-alignment-quick-start-guide.pdf'

type ParsedInput =
  | { email: string; firstName: string; source: string; contentType: 'form' | 'json' }
  | { error: string }

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
      if (!email) return { error: 'email required' }
      return { email, firstName, source, contentType: 'json' }
    } catch {
      return { error: 'invalid JSON' }
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
      if (!email) return { error: 'email required' }
      return { email, firstName, source, contentType: 'form' }
    } catch {
      return { error: 'invalid form data' }
    }
  }

  return { error: 'unsupported content-type' }
}

async function tagContact(email: string, firstName: string, source: string) {
  try {
    await resend.contacts.create({
      email,
      firstName,
      unsubscribed: false,
      properties: {
        source,
        qsg_optin_date: new Date().toISOString(),
      },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (
      !msg.toLowerCase().includes('already exist') &&
      !msg.toLowerCase().includes('already been')
    ) {
      console.error('[qsg-optin] resend.contacts.create failed', err)
      throw err
    }
  }
}

export async function POST(req: Request) {
  const parsed = await readInput(req)
  if ('error' in parsed) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 })
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

  let contactError: string | null = null
  try {
    await tagContact(email, firstName, source)
  } catch (err) {
    contactError = err instanceof Error ? err.message : String(err)
  }

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
