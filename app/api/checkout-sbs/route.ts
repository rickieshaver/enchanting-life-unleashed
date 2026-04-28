import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe/client'
import { SBS } from '@/lib/stripe/config'

export const runtime = 'nodejs'

function resolveOrigin(req: Request): string {
  // On Preview/dev deploys, use the actual request origin so success/cancel URLs
  // stay on the same deployment. Only Production falls back to the canonical
  // site URL — which is safe because main branch always has /purchase-complete.
  if (process.env.VERCEL_ENV === 'production') {
    const envUrl = process.env.NEXT_PUBLIC_SITE_URL
    if (envUrl && envUrl.startsWith('http')) return envUrl.replace(/\/$/, '')
  }
  const url = new URL(req.url)
  return `${url.protocol}//${url.host}`
}

export async function POST(req: Request) {
  try {
    const stripe = getStripe()
    const origin = resolveOrigin(req)

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: SBS.priceId, quantity: 1 }],
      success_url: `${origin}/purchase-complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/sacred-boundary-system?canceled=1`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      metadata: {
        product_slug: SBS.slug,
      },
    })

    if (!session.url) {
      console.error('[checkout-sbs] session created without redirect URL', session.id)
      return NextResponse.json({ ok: false, error: 'checkout session missing URL' }, { status: 500 })
    }

    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[checkout-sbs] session create failed', err)
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}
