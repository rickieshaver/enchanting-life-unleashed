import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Lunar Alignment Quick Start Guide — Enchanting Life Unleashed',
  description:
    'Step One of the Lunar Alignment System. A free guide to the eight lunar phases, the Action framework, and the 28-day cycle map. Built to use, not to admire.',
}

type SearchParams = Promise<{ delivered?: string; error?: string }>

export default async function LunarAlignmentQuickStartGuidePage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const delivered = params.delivered === '1'
  const errored = params.error === 'send_failed' || params.error === 'invalid_email'

  return (
    <>
      {/* HERO */}
      <section className="pt-24 md:pt-32 pb-24 px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-end">
            {/* Left: Copy */}
            <div className="md:w-3/5 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-[2px] bg-gold" />
                <p className="eyebrow font-bold">
                  The Lunar Alignment System &middot; Step One
                </p>
              </div>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-light text-primary leading-[0.95]">
                The Lunar Alignment<br />
                <span className="italic font-normal">Quick Start Guide</span>
              </h1>
              <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-lg">
                Free. Practical. Designed to start working immediately. Eight lunar phases, the
                Action framework, and a 28-day cycle map you can hold in one hand.
              </p>

              {delivered ? (
                <div className="bg-surface-low border-l-4 border-gold p-8 max-w-lg flex flex-col gap-4">
                  <p className="font-label text-xs uppercase tracking-[0.2em] text-gold font-bold">
                    Check your email
                  </p>
                  <h2 className="font-headline text-2xl font-light text-primary leading-snug">
                    Your QSG is on the way.
                  </h2>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    The download link is in your inbox. If it&apos;s not there in a minute, check
                    promotions or spam — and add{' '}
                    <strong>connect@enchantinglifeunleashed.com</strong> to your contacts so the next
                    one lands clean.
                  </p>
                  <p className="font-body text-sm text-primary">
                    Read it once. Run one cycle. Then come back for the Starter Kit ($7).
                  </p>
                </div>
              ) : (
                <form
                  action="/api/qsg-optin"
                  method="post"
                  className="flex flex-col gap-4 w-full max-w-md"
                >
                  <input type="hidden" name="source" value="qsg-landing" />
                  <div className="flex flex-col gap-2">
                    <label className="font-label text-xs uppercase tracking-widest text-primary font-bold">
                      First name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      placeholder="Your first name"
                      className="w-full bg-transparent border-0 border-b border-gold px-0 py-3 text-lg font-body focus:outline-none focus:ring-0 focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label text-xs uppercase tracking-widest text-primary font-bold">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email_address"
                      placeholder="email@example.com"
                      required
                      className="w-full bg-transparent border-0 border-b border-gold px-0 py-3 text-lg font-body focus:outline-none focus:ring-0 focus:border-primary transition-colors"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full text-center mt-2">
                    Send me the Guide
                  </button>
                  {errored && (
                    <p className="font-body text-xs text-secondary mt-1">
                      Something didn&apos;t go through. Try again, or email{' '}
                      connect@enchantinglifeunleashed.com.
                    </p>
                  )}
                  <p className="font-body text-[10px] uppercase tracking-wider text-on-surface-variant/60 mt-1 text-center">
                    No spam. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>

            {/* Right: Cover image */}
            <div className="md:w-2/5 relative">
              <Image
                src="/images/lunar-alignment-quick-start-guide-cover.png"
                alt="The Lunar Alignment Quick Start Guide cover"
                width={500}
                height={620}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute -top-6 -right-6 bg-gold p-8 flex flex-col items-center justify-center text-primary text-center">
                <span className="font-headline text-4xl font-bold tracking-tighter">FREE</span>
                <span className="font-label text-[10px] uppercase tracking-widest font-extrabold">
                  Step One
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="bg-surface-low py-24 md:py-32 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col gap-8">
            <h2 className="font-headline text-4xl md:text-5xl font-light text-primary leading-tight">
              Orientation,<br />not theory.
            </h2>
            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              Most lunar content is either too vague to use or too dense to finish. The QSG is the
              middle path — short enough to read in one sitting, specific enough to act on the next
              day.
            </p>
            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              You walk away with a working model of the cycle and a clear picture of where the
              practice goes next. No fluff. No spiritual bypassing. Just the framework and what to
              do with it.
            </p>
            <div className="flex flex-col gap-4">
              <div className="w-[2px] h-24 bg-gold" />
              <p className="font-headline text-xl italic text-primary leading-snug max-w-xs">
                &ldquo;Read once. Run one cycle. Then decide.&rdquo;
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white p-10">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-gold mb-4">
                Inside &middot; 01
              </p>
              <h3 className="font-headline text-2xl font-light text-primary mb-4">
                The Eight Lunar Phases
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                What each phase is actually for — in a single page per phase. The energy, the
                question, the move. No mystic shorthand. Plain language.
              </p>
            </div>
            <div className="bg-white p-10">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-gold mb-4">
                Inside &middot; 02
              </p>
              <h3 className="font-headline text-2xl font-light text-primary mb-4">
                The Action Framework
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                A simple structure that maps every phase to a verb. Set, build, audit, release. The
                difference between knowing the model and running it.
              </p>
            </div>
            <div className="bg-white p-10">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-gold mb-4">
                Inside &middot; 03
              </p>
              <h3 className="font-headline text-2xl font-light text-primary mb-4">
                The 28-Day Cycle Map
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                One page. Eight phases plotted across one cycle. The whole model in your hand —
                pin it on the wall and start watching where you actually live in the rhythm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHERE THIS FITS */}
      <section className="py-24 md:py-32 px-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-[2px] bg-gold" />
            <p className="font-label text-xs uppercase tracking-[0.2em] text-gold">
              Where this fits
            </p>
            <h2 className="font-headline text-4xl md:text-5xl font-light text-primary leading-tight">
              The full system,<br />in three steps.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-gold">Step One</p>
              <h3 className="font-headline text-2xl font-light text-primary">Quick Start Guide</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Free. The model in your hand. Read once, then start watching the cycle in your
                actual life.
              </p>
              <p className="font-label text-xs uppercase tracking-[0.2em] text-secondary mt-2">
                You are here
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-gold">Step Two</p>
              <h3 className="font-headline text-2xl font-light text-primary">Starter Kit</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                $7. Your first real cycle. A 28-day workbook plus a reusable tracker — pages you
                fill in, not pages you flip through.
              </p>
              <Link
                href="/lunar-alignment-starter-kit"
                className="font-label text-xs uppercase tracking-widest text-primary border-b border-gold pb-1 self-start mt-2 hover:text-secondary transition-colors"
              >
                See the Starter Kit &rarr;
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-gold">Step Three</p>
              <h3 className="font-headline text-2xl font-light text-primary">Planner</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                $27. The year-deep version. Twelve cycles, annual theme, quarterly reviews. For
                women past the proving stage.
              </p>
              <Link
                href="/lunar-alignment-planner"
                className="font-label text-xs uppercase tracking-widest text-primary border-b border-gold pb-1 self-start mt-2 hover:text-secondary transition-colors"
              >
                See the Planner &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA — only show when not yet delivered */}
      {!delivered && (
        <section className="bg-velvet text-white py-24 md:py-32 px-8">
          <div className="max-w-3xl mx-auto flex flex-col gap-10 items-start">
            <div className="w-12 h-[2px] bg-gold" />
            <h2 className="font-headline text-5xl md:text-7xl font-light leading-[0.95]">
              Start with<br />
              <span className="italic font-normal">orientation.</span>
            </h2>
            <p className="font-body text-lg leading-relaxed max-w-xl opacity-90">
              The QSG is free because the model is the easy part. Running the cycle is the work.
              Read the guide, then come back when you&apos;re ready to actually run it.
            </p>
            <form
              action="/api/qsg-optin"
              method="post"
              className="flex flex-col gap-4 w-full max-w-md"
            >
              <input type="hidden" name="source" value="qsg-footer" />
              <div className="flex flex-col gap-2">
                <label className="font-label text-xs uppercase tracking-widest text-white/80 font-bold">
                  Email address
                </label>
                <input
                  type="email"
                  name="email_address"
                  placeholder="email@example.com"
                  required
                  className="w-full bg-transparent border-0 border-b-2 border-gold text-white placeholder-white/50 font-body text-sm px-0 py-3 focus:outline-none focus:ring-0"
                />
              </div>
              <button type="submit" className="btn-primary w-full text-center">
                Send me the Guide
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  )
}
