import type { Metadata } from 'next'
import Link from 'next/link'
import { getStripe } from '@/lib/stripe/client'
import { STARTER_KIT } from '@/lib/stripe/config'

export const metadata: Metadata = {
  title: 'Your Starter Kit — Enchanting Life Unleashed',
  description: 'Your Lunar Alignment Starter Kit is ready.',
}

type SearchParams = Promise<{ session_id?: string }>

async function verifySession(sessionId: string | undefined) {
  if (!sessionId) return null
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid' && session.payment_status !== 'no_payment_required') {
      return null
    }
    if (session.metadata?.product_slug !== STARTER_KIT.slug) return null
    return {
      customerEmail: session.customer_details?.email ?? null,
      firstName: session.customer_details?.name?.split(' ')[0] ?? null,
    }
  } catch (err) {
    console.error('[starter-kit-access] session verify failed', err)
    return null
  }
}

export default async function StarterKitAccessPage({
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
            access link is on its way. If something looks wrong, reply to that email and
            we&apos;ll sort it.
          </p>
          <div className="flex items-center gap-6 mt-4 flex-wrap">
            <Link href="/lunar-alignment-starter-kit" className="btn-primary">
              Back to the Starter Kit
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
          Your Lunar Alignment Starter Kit is ready. Two files are waiting for you below — and
          we&apos;ve also sent a copy of this access link to{' '}
          {result.customerEmail ? (
            <strong className="text-primary">{result.customerEmail}</strong>
          ) : (
            'your inbox'
          )}
          {' '}so you can return anytime.
        </p>

        <div className="mt-4 w-full max-w-xl flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="font-label text-xs uppercase tracking-[0.2em] text-gold">
              File 01 &middot; The Workbook
            </p>
            <h2 className="font-headline text-2xl font-light text-primary">
              The 28-day fillable workbook.
            </h2>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed max-w-md">
              26 pages. Eight phases as left-teach / right-practice spreads. Open it on Day 1 of
              your cycle.
            </p>
            <a
              href={STARTER_KIT.workbookPdfPath}
              className="btn-primary self-start mt-2"
              download
            >
              Download the Workbook
            </a>
          </div>

          <div className="flex flex-col gap-3 border-t border-ink-25 pt-8">
            <p className="font-label text-xs uppercase tracking-[0.2em] text-gold">
              File 02 &middot; The Tracker
            </p>
            <h2 className="font-headline text-2xl font-light text-primary">
              The reusable one-page cycle tracker.
            </h2>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed max-w-md">
              Print it again every cycle. The whole system on a single page — eight phase boxes,
              fillable date and note for each.
            </p>
            <a
              href={STARTER_KIT.trackerPdfPath}
              className="btn-primary self-start mt-2"
              download
            >
              Download the Tracker
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-ink-25 pt-10 w-full max-w-xl flex flex-col gap-4">
          <p className="font-label text-xs uppercase tracking-widest text-secondary">
            How to start
          </p>
          <p className="font-body text-base text-on-surface-variant leading-relaxed">
            Open the workbook on the next new moon — that&apos;s Day 1. Write your one commitment
            for the cycle. Don&apos;t read ahead. Twenty-eight days. One phase at a time.
          </p>
          <p className="font-body text-base text-on-surface-variant leading-relaxed">
            Print the tracker. Stick it on your fridge or in your planner so the cycle stays
            visible.
          </p>
          <div className="flex items-center gap-6 mt-4 flex-wrap">
            <Link href="/" className="btn-ghost">
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
