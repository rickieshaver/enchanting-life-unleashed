import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Lunar Boundary Planner — Enchanting Life Unleashed',
  description:
    'A moon-aligned planner designed to help you set, hold, and honor your boundaries — without the guilt. Twelve months of intentional structure built around the lunar cycle.',
}

export default function LunarBoundaryPlannerPage() {
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
                  Your Boundaries, Your Energy, Your Terms
                </p>
              </div>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-light text-primary leading-[0.95]">
                Lunar Boundary<br />
                <span className="italic font-normal">Planner</span>
              </h1>
              <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-lg">
                A moon-aligned planner designed to help you set, hold, and honor your boundaries —
                without the guilt. Twelve months of intentional structure built around the lunar cycle
                so your energy stays protected all year long.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <form action="/api/checkout-sbs" method="post">
                  <button type="submit" className="btn-primary">
                    Get Instant Access — $17
                  </button>
                </form>
                <span className="font-label text-sm text-primary border-b-2 border-gold pb-1 self-end tracking-wide">
                  Digital Download &middot; Instant Access
                </span>
              </div>
            </div>

            {/* Right: Image */}
            <div className="md:w-2/5 relative">
              <Image
                src="/images/planner-cover.jpeg"
                alt="Open lunar planner showing moon phase spreads"
                width={500}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute bottom-6 left-6 bg-white px-6 py-4">
                <p className="font-script text-3xl text-primary">The Boundary Perspective</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="bg-surface-low py-24 md:py-32 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left: Statement */}
          <div className="flex flex-col gap-8">
            <h2 className="font-headline text-4xl md:text-5xl font-light text-primary leading-tight">
              The Cost of<br />Weak Boundaries.
            </h2>
            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              Every time you say yes when you mean no, you spend energy you don&apos;t have. The
              resentment builds quietly. The exhaustion becomes your baseline. And the people who
              matter most — including you — get what&apos;s left over.
            </p>
            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              It&apos;s not a willpower problem. It&apos;s a systems problem. And the lunar cycle
              gives you a natural, repeating framework to reset, reflect, and reinforce what you
              actually value.
            </p>
            <div className="flex flex-col gap-4">
              <div className="w-[2px] h-24 bg-gold" />
              <p className="font-headline text-xl italic text-primary leading-snug max-w-xs">
                &ldquo;You can&apos;t pour from a cup that everyone else is allowed to
                drain.&rdquo;
              </p>
            </div>
          </div>

          {/* Right: Observation Cards */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-10">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-gold mb-4">
                Observation 01
              </p>
              <h3 className="font-headline text-2xl font-light text-primary mb-4">
                The Energy Drain
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Unclear boundaries don&apos;t just cost you time — they cost you the mental and
                emotional bandwidth you need to do the work that actually matters. Every ambiguous
                commitment is a slow leak.
              </p>
            </div>
            <div className="bg-white p-10">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-gold mb-4">
                Observation 02
              </p>
              <h3 className="font-headline text-2xl font-light text-primary mb-4">
                The Guilt Loop
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                You know you need to say no. You say yes anyway. Then you resent the commitment —
                and feel guilty for resenting it. The loop repeats until something breaks. Usually
                you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES BENTO */}
      <section className="py-24 md:py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-6 mb-16">
            <h2 className="font-headline text-5xl md:text-6xl font-light text-primary">
              Inside the Planner
            </h2>
            <div className="w-1/3 h-[2px] bg-gold" />
          </div>

          <div className="grid grid-cols-12 gap-4">
            {/* Main card: 8 cols */}
            <div className="col-span-12 md:col-span-8 bg-velvet p-12 flex flex-col justify-between min-h-[320px]">
              <div>
                <p className="font-label text-xs uppercase tracking-[0.2em] text-gold/80 mb-6">
                  The Foundation
                </p>
                <h3 className="font-headline text-4xl md:text-5xl font-light text-white leading-tight mb-6">
                  The Lunar<br />
                  <span className="italic">Framework.</span>
                </h3>
                <p className="font-body text-sm text-gold/70 leading-relaxed max-w-md">
                  Built around the eight phases of the moon, this planner gives you a natural rhythm
                  for setting intentions, taking action, releasing what no longer serves you, and
                  restoring your energy — month after month for a full year.
                </p>
              </div>
              <div className="flex items-center gap-4 mt-8">
                <div className="w-8 h-[1px] bg-gold" />
                <p className="font-label text-xs uppercase tracking-widest text-gold">
                  12 Months &middot; Moon-Aligned Planning
                </p>
              </div>
            </div>

            {/* Side card: 4 cols */}
            <div className="col-span-12 md:col-span-4 bg-surface-high p-10 flex flex-col justify-between min-h-[320px]">
              <div>
                <p className="font-label text-xs uppercase tracking-[0.2em] text-secondary mb-6">
                  Daily Practice
                </p>
                <h3 className="font-headline text-3xl font-light text-primary leading-tight mb-4">
                  Daily Check-In Pages
                </h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  Short, intentional prompts for each day. Review your commitments, check your
                  energy, and realign with what you said yes to — and why.
                </p>
              </div>
              <div className="w-8 h-[2px] bg-gold mt-8" />
            </div>

            {/* Moon Phase: 4 cols */}
            <div className="col-span-12 md:col-span-4 bg-primary p-10 flex flex-col justify-between min-h-[240px]">
              <div>
                <p className="font-label text-xs uppercase tracking-[0.2em] text-gold/80 mb-6">
                  Visual Tool
                </p>
                <h3 className="font-headline text-2xl font-light text-white leading-tight mb-4">
                  Moon Phase Tracker
                </h3>
                <p className="font-body text-sm text-gold/60 leading-relaxed">
                  A visual reference for each lunar phase so you always know where you are in the
                  cycle — and what kind of energy to lean into.
                </p>
              </div>
              <div className="w-8 h-[1px] bg-gold mt-6" />
            </div>

            {/* Image card: 8 cols */}
            <div className="col-span-12 md:col-span-8 relative h-[280px] overflow-hidden min-h-[240px] bg-surface-low">
              <div className="absolute bottom-6 left-6 bg-white px-6 py-4 z-10">
                <p className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-1">
                  Each Month
                </p>
                <p className="font-headline text-xl font-light text-primary">
                  Monthly Reflection Spreads
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="bg-velvet py-24 md:py-32 px-8">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <h2 className="font-headline text-4xl md:text-5xl font-light italic text-white leading-snug">
            &ldquo;Boundaries aren&apos;t walls. They&apos;re the architecture of your most{' '}
            <em className="not-italic font-normal text-gold">aligned</em> life.&rdquo;
          </h2>
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-[1px] bg-gold" />
            <p className="font-label text-xs uppercase tracking-[0.25em] text-gold">
              Enchanting Life Unleashed
            </p>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section id="buy" className="py-24 md:py-40 px-8">
        <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-8">
          <h2 className="font-headline text-5xl md:text-6xl font-light text-primary leading-tight">
            Your boundaries<br />start here.
          </h2>
          <p className="font-body text-base text-on-surface-variant leading-relaxed">
            Stop managing the aftermath of saying yes when you meant no. The Lunar Boundary Planner
            gives you a gentle, repeatable structure to finally get clear — and stay that way.
          </p>

          {/* Price Card */}
          <div className="w-full bg-surface-low p-12 md:p-16 flex flex-col items-center gap-8">
            <div className="w-full h-[3px] bg-gold" />
            <div className="flex flex-col items-center gap-2">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-secondary">
                One-Time Purchase
              </p>
              <p className="font-headline text-7xl md:text-8xl font-light text-primary">$17</p>
              <p className="font-body text-sm text-secondary">
                Full planner &middot; 12 months &middot; Instant access
              </p>
            </div>
            <form action="/api/checkout-sbs" method="post" className="w-full">
              <button type="submit" className="btn-primary w-full block text-center">
                Buy Now — $17
              </button>
            </form>
            <p className="font-body text-xs text-secondary tracking-wide">
              Instant digital download. PDF format.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
