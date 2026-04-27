import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe/client'
import { SBS, STARTER_KIT } from '@/lib/stripe/config'
import { resend } from '@/lib/resend/client'
import { sendEmail } from '@/lib/resend/send'

export const runtime = 'nodejs'
// Stripe signature verification needs the raw body — disable framework parsing.
export const dynamic = 'force-dynamic'

function siteOrigin(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (envUrl && envUrl.startsWith('http')) return envUrl.replace(/\/$/, '')
  return 'https://enchantinglifeunleashed.com'
}

type CheckoutMeta = {
  email: string
  firstName: string
  amountPaidUsd: string
  sessionId: string
}

function extractCheckoutMeta(session: Stripe.Checkout.Session): CheckoutMeta | null {
  const email = session.customer_details?.email
  if (!email) {
    console.warn('[stripe-webhook] session completed without customer email', session.id)
    return null
  }
  const fullName = session.customer_details?.name ?? ''
  const firstName = fullName.split(' ')[0] || 'Friend'
  const amountTotal = session.amount_total ?? 0
  const amountPaidUsd = (amountTotal / 100).toFixed(2)
  return { email, firstName, amountPaidUsd, sessionId: session.id }
}

async function tagResendContact(
  email: string,
  firstName: string,
  properties: Record<string, string>,
) {
  try {
    await resend.contacts.create({
      email,
      firstName,
      unsubscribed: false,
      properties,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (
      !msg.toLowerCase().includes('already exist') &&
      !msg.toLowerCase().includes('already been')
    ) {
      console.error('[stripe-webhook] resend.contacts.create failed', err)
    }
  }
}

async function handleSbsCompleted(meta: CheckoutMeta) {
  const { email, firstName, amountPaidUsd, sessionId } = meta
  const downloadUrl = `${siteOrigin()}${SBS.pdfPath}`

  await tagResendContact(email, firstName, {
    source: 'sbs-purchase',
    sbs_purchase_date: new Date().toISOString(),
    sbs_amount_usd: amountPaidUsd,
    stripe_session_id: sessionId,
  })

  try {
    await sendEmail({
      to: email,
      template: 'sbs-receipt',
      subject: 'Your Sacred Boundary System is ready.',
      firstName,
      amountPaidUsd,
      downloadUrl,
    })
  } catch (err) {
    console.error('[stripe-webhook] sbs receipt send failed', err)
    throw err
  }
}

async function handleStarterKitCompleted(meta: CheckoutMeta) {
  const { email, firstName, amountPaidUsd, sessionId } = meta
  // Customer-facing link goes back to the access page, not directly to PDFs —
  // that way the customer can re-download anytime by re-opening the email.
  const accessUrl = `${siteOrigin()}/lunar-alignment-starter-kit/access?session_id=${encodeURIComponent(sessionId)}`

  await tagResendContact(email, firstName, {
    source: 'starter-kit-purchase',
    starter_kit_purchase_date: new Date().toISOString(),
    starter_kit_amount_usd: amountPaidUsd,
    stripe_session_id: sessionId,
  })

  try {
    await sendEmail({
      to: email,
      template: 'starter-kit-receipt',
      subject: 'Your Lunar Alignment Starter Kit is ready.',
      firstName,
      amountPaidUsd,
      downloadUrl: accessUrl,
    })
  } catch (err) {
    console.error('[stripe-webhook] starter-kit receipt send failed', err)
    throw err
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const slug = session.metadata?.product_slug

  const meta = extractCheckoutMeta(session)
  if (!meta) return

  if (slug === SBS.slug) {
    await handleSbsCompleted(meta)
    return
  }
  if (slug === STARTER_KIT.slug) {
    await handleStarterKitCompleted(meta)
    return
  }

  console.log('[stripe-webhook] ignoring session for unknown product slug', session.metadata)
}

export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature')
  const secret = process.env.STRIPE_WEBHOOK_SECRET

  if (!signature) {
    return NextResponse.json({ ok: false, error: 'missing signature' }, { status: 400 })
  }
  if (!secret) {
    console.error('[stripe-webhook] STRIPE_WEBHOOK_SECRET not configured')
    return NextResponse.json({ ok: false, error: 'webhook secret not configured' }, { status: 500 })
  }

  const rawBody = await req.text()

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, secret)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[stripe-webhook] signature verification failed', msg)
    return NextResponse.json({ ok: false, error: `signature: ${msg}` }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object)
        break
      default:
        // Intentionally ignore other events — Stripe sends many by default.
        break
    }
    return NextResponse.json({ ok: true, received: event.type })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(`[stripe-webhook] handler failed for ${event.type}`, err)
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}
