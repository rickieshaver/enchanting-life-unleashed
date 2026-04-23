import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "You're in — Enchanting Life Unleashed",
  description: "Thanks for joining. Watch your inbox.",
}

type SearchParams = Promise<{ error?: string }>

export default async function ThanksPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const hasError = params.error === 'send_failed'
  const invalidEmail = params.error === 'invalid_email'

  return (
    <section className="max-w-3xl mx-auto px-8 md:px-12 py-28 md:py-36">
      <div className="flex flex-col items-start gap-8">
        <div className="editorial-line" />

        {invalidEmail ? (
          <>
            <h1 className="font-headline text-4xl md:text-5xl font-bold leading-tight text-primary">
              That email didn&apos;t look right.
            </h1>
            <p className="font-body text-base text-on-surface-variant leading-relaxed max-w-md">
              Go back and try again. If it keeps happening, shoot us a note and we&apos;ll add you manually.
            </p>
            <div className="flex items-center gap-6 mt-4 flex-wrap">
              <Link href="/" className="btn-primary">
                Back to homepage
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-headline text-5xl md:text-7xl font-bold leading-none text-primary">
              You&apos;re in.
            </h1>
            <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-xl">
              Check your inbox in the next couple of minutes for your welcome email. A handful more follow over the next two weeks — the useful kind, no filler.
            </p>

            {hasError && (
              <p className="font-body text-sm text-secondary italic">
                Note: there was a hiccup sending your welcome email. You&apos;re on the list — we&apos;ll get you sorted shortly.
              </p>
            )}

            <div className="mt-6 flex flex-col gap-4">
              <p className="font-label text-xs uppercase tracking-widest text-secondary">
                While you&apos;re here —
              </p>
              <p className="font-body text-base text-on-surface-variant leading-relaxed max-w-md">
                The Boundary Archetype Quiz is the fastest way to know what&apos;s actually leaking in your life. Five minutes. Real answers. Your personalized Blueprint lands in your inbox.
              </p>
              <div className="flex items-center gap-6 flex-wrap">
                <Link href="/boundary-archetype-quiz" className="btn-primary">
                  Take the Boundary Quiz
                </Link>
                <Link href="/" className="btn-ghost">
                  Back to homepage
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
