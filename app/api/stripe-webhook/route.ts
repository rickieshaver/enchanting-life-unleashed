import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe/client'
import { SBS } from '@/lib/stripe/config'
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

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (session.metadata?.product_slug !== SBS.slug) {
    console.log('[stripe-webhook] ignoring session for unknown product slug', session.metadata)
    return
  }

  const email = session.customer_details?.email
  if (!email) {
    console.warn('[stripe-webhook] session completed without customer email', session.id)
    return
  }

  const fullName = session.customer_details?.name ?? ''
  const firstName = fullName.split(' ')[0] || 'Friend'
  const amountTotal = session.amount_total ?? 0
  const amountPaidUsd = (amountTotal / 100).toFixed(2)
  const downloadUrl = `${siteOrigin()}${SBS.pdfPath}`

  // 1. Create/update Resend contact tagged as SBS purchaser.
  try {
    await resend.contacts.create({
      email,
      firstName,
      unsubscribed: false,
      properties: {
        source: 'sbs-purchase',
        sbs_purchase_date: new Date().toISOString(),
        sbs_amount_usd: amountPaidUsd,
        stripe_session_id: session.id,
      },
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

  // 2. Send the receipt email with the download link.
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
    console.error('[stripe-webhook] receipt send failed', err)
    throw err
  }
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
