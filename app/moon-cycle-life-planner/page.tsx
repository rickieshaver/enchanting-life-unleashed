import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Moon Cycle Life Planner 2026 — Enchanting Life Unleashed',
  description:
    'A 163-page premium planner synced to the 2026 lunar calendar. Monthly overviews, weekly pages, full and new moon rituals.',
}

export default function MoonCycleLifePlannerPage() {
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
                <p className="eyebrow font-bold">Plan by the Moon. Live by Design.</p>
              </div>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-light text-primary leading-[0.95]">
                Moon Cycle Life<br />
                <span className="italic font-normal">Planner</span>
              </h1>
              <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-lg">
                A 163-page premium planner synced to the 2026 lunar calendar. Monthly overviews,
                weekly pages, full &amp; new moon rituals — everything you need to live in flow with
                the moon.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <a href="#buy" className="btn-primary">
                  Get Instant Access — $47
                </a>
                <span className="font-label text-sm text-primary border-b-2 border-gold pb-1 self-end tracking-wide">
                  Digital Download &middot; Instant Access
                </span>
              </div>
            </div>

            {/* Right: Image */}
            <div className="md:w-2/5 relative">
              <Image
                src="/images/moon-cover.jpeg"
                alt="Overhead view of an elegant monthly planner"
                width={500}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute bottom-6 left-6 bg-white px-6 py-4">
                <p className="font-script text-3xl text-primary">The Moon Perspective</p>
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
              The Cost of<br />Living Out of Sync.
            </h2>
            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              When you fight the cycle, you fight yourself. Burnout isn&apos;t from doing too much —
              it&apos;s from doing the wrong things at the wrong time.
            </p>
            <div className="flex flex-col gap-4">
              <div className="w-[2px] h-24 bg-gold" />
              <p className="font-headline text-xl italic text-primary leading-snug max-w-xs">
                &ldquo;The moon doesn&apos;t negotiate. But she always shows you the way.&rdquo;
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
                The Burnout Cycle
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                You push when you should rest, rest when you should act. The planner maps when to do
                which — so you stop working against your own nature.
              </p>
            </div>
            <div className="bg-white p-10">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-gold mb-4">
                Observation 02
              </p>
              <h3 className="font-headline text-2xl font-light text-primary mb-4">
                The Missed Moments
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Life happens to you instead of with you. Intention without a container is just a
                wish. The planner gives your magic a home.
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
                  12 Months of<br />
                  <span className="italic">Moon-Aligned Planning.</span>
                </h3>
                <p className="font-body text-sm text-gold/70 leading-relaxed max-w-md">
                  163 pages built around the 2026 lunar calendar. Every full moon, new moon, and
                  phase mapped and given space to work with.
                </p>
              </div>
              <div className="flex items-center gap-4 mt-8">
                <div className="w-8 h-[1px] bg-gold" />
                <p className="font-label text-xs uppercase tracking-widest text-gold">
                  163 Pages &middot; 2026 Lunar Calendar
                </p>
              </div>
            </div>

            {/* Side card: 4 cols */}
            <div className="col-span-12 md:col-span-4 bg-surface-high p-10 flex flex-col justify-between min-h-[320px]">
              <div>
                <p className="font-label text-xs uppercase tracking-[0.2em] text-secondary mb-6">
                  Every Cycle
                </p>
                <h3 className="font-headline text-3xl font-light text-primary leading-tight mb-4">
                  Full Moon Ritual Pages
                </h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  Release + intention setting each cycle. Monthly ritual structure built in — all 12
                  full moons, all 12 new moons.
                </p>
              </div>
              <div className="w-8 h-[2px] bg-gold mt-8" />
            </div>

            {/* Small burgundy card: 4 cols */}
            <div className="col-span-12 md:col-span-4 bg-primary p-10 flex flex-col justify-between min-h-[240px]">
              <div>
                <p className="font-label text-xs uppercase tracking-[0.2em] text-gold/80 mb-6">
                  New Moon
                </p>
                <h3 className="font-headline text-2xl font-light text-white leading-tight mb-4">
                  New Moon Intentions
                </h3>
                <p className="font-body text-sm text-gold/60 leading-relaxed">
                  Dedicated spread for setting intentions each new moon. Space for what you&apos;re
                  calling in and what you&apos;re releasing.
                </p>
              </div>
              <div className="w-8 h-[1px] bg-gold mt-6" />
            </div>

            {/* Image placeholder card: 8 cols */}
            <div className="col-span-12 md:col-span-8 relative h-[280px] overflow-hidden min-h-[240px] bg-surface-low">
              <div className="absolute bottom-6 left-6 bg-white px-6 py-4 z-10">
                <p className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-1">
                  Day-by-Day Planning
                </p>
                <p className="font-headline text-xl font-light text-primary">
                  Weekly Rhythm Pages
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
            &ldquo;You already have the magic. The moon just helps you remember when to{' '}
            <span className="text-gold">use it.</span>&rdquo;
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
            Your most aligned<br />year starts now.
          </h2>
          <p className="font-body text-base text-on-surface-variant leading-relaxed">
            163 pages. 12 months. Every moon phase mapped. One download changes how you move through
            the entire year.
          </p>

          {/* Price Card */}
          <div className="w-full bg-surface-low p-12 md:p-16 flex flex-col items-center gap-8">
            <div className="w-full h-[3px] bg-gold" />
            <div className="flex flex-col items-center gap-2">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-secondary">
                One-Time Purchase
              </p>
              <p className="font-headline text-7xl md:text-8xl font-light text-primary">$47</p>
              <p className="font-body text-sm text-secondary">
                Full planner &middot; 12 months &middot; Instant access
              </p>
            </div>
            <a href="#" className="btn-primary w-full block text-center">
              Buy Now — $47
            </a>
            <p className="font-body text-xs text-secondary tracking-wide">
              Instant digital download. PDF format.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
