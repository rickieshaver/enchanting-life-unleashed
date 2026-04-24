import type { Metadata } from 'next'
import Link from 'next/link'
import { getStripe } from '@/lib/stripe/client'
import { SBS } from '@/lib/stripe/config'

export const metadata: Metadata = {
  title: 'Thank you — Enchanting Life Unleashed',
  description: 'Your Sacred Boundary System is ready.',
}

type SearchParams = Promise<{ session_id?: string }>

async function verifySession(sessionId: string | undefined) {
  if (!sessionId) return null
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid' && session.payment_status !== 'no_payment_required') {
      return null
    }
    if (session.metadata?.product_slug !== SBS.slug) return null
    return {
      customerEmail: session.customer_details?.email ?? null,
      firstName:
        session.customer_details?.name?.split(' ')[0] ?? null,
    }
  } catch (err) {
    console.error('[purchase-complete] session verify failed', err)
    return null
  }
}

export default async function PurchaseCompletePage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const result = await verifySession(params.session_id)

  if (!result) {
    return (
      <section className="max-w-3xl mx-auto px-8 md:px-12 py-28 md:py-36">
        <div className="flex flex-col items-start gap-8">
          <div className="editorial-line" />
          <h1 className="font-headline text-4xl md:text-5xl font-bold leading-tight text-primary">
            That purchase couldn&apos;t be verified.
          </h1>
          <p className="font-body text-base text-on-surface-variant leading-relaxed max-w-md">
            If you just paid and landed here, please check your inbox — a receipt email with your
            download link is on its way. If something looks wrong, reply to that email and
            we&apos;ll sort it.
          </p>
          <div className="flex items-center gap-6 mt-4 flex-wrap">
            <Link href="/lunar-boundary-planner" className="btn-primary">
              Back to the Sacred Boundary System
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const greeting = result.firstName || null

  return (
    <section className="max-w-3xl mx-auto px-8 md:px-12 py-28 md:py-36">
      <div className="flex flex-col items-start gap-8">
        <div className="editorial-line" />

        <h1 className="font-headline text-5xl md:text-7xl font-bold leading-none text-primary">
          {greeting ? `Thank you, ${greeting}.` : 'Thank you.'}
        </h1>

        <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-xl">
          Your Sacred Boundary System is ready. Download it below and also check your inbox —
          we&apos;ve sent a copy of the link to{' '}
          {result.customerEmail ? (
            <strong className="text-primary">{result.customerEmail}</strong>
          ) : (
            'your inbox'
          )}
          {' '}so you always have it.
        </p>

        <div className="flex items-center gap-6 mt-4 flex-wrap">
          <a href={SBS.pdfPath} className="btn-primary" download>
            Download the Sacred Boundary System
          </a>
        </div>

        <div className="mt-12 border-t border-ink-25 pt-10 w-full max-w-xl flex flex-col gap-4">
          <p className="font-label text-xs uppercase tracking-widest text-secondary">
            How to use it
          </p>
          <p className="font-body text-base text-on-surface-variant leading-relaxed">
            Read through the workbook once. Then on the next new moon, begin cycle one — one domain,
            one practice, for 28 days. Don&apos;t stack. The system works through repetition, not
            intensity.
          </p>
          <p className="font-body text-base text-on-surface-variant leading-relaxed">
            If you haven&apos;t taken the Boundary Archetype Quiz yet, do that next — your cycle
            practice gets sharper when you know which archetype you&apos;re working through.
          </p>
          <div className="flex items-center gap-6 mt-4 flex-wrap">
            <Link href="/boundary-archetype-quiz" className="btn-ghost">
              Take the Boundary Quiz
            </Link>
            <Link href="/" className="btn-ghost">
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
