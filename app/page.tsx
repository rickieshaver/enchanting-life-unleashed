import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Enchanting Life Unleashed — Where Soul Meets Strategy',
  description:
    'Where modern mystics learn real magic — rooted in intention, guided by intuition, and sprinkled with just the right amount of sparkle.',
}

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-8 md:px-12 py-20">
        <div className="grid grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left col: 7 columns */}
          <div className="col-span-12 md:col-span-7 flex flex-col gap-8">
            <div className="editorial-line" />
            <h1 className="font-headline text-5xl md:text-7xl xl:text-8xl font-bold leading-none text-primary">
              Your power doesn&apos;t<br />need permission.<br />
              <em>It needs a plan.</em>
            </h1>
            <div className="flex items-center gap-6 mt-4 flex-wrap">
              <Link href="/shop" className="btn-primary">
                Start Here
              </Link>
              <span className="font-script text-3xl text-secondary leading-none">
                Where Soul Meets Strategy
              </span>
            </div>
          </div>
          {/* Right col: 5 columns */}
          <div className="col-span-12 md:col-span-5 relative">
            <div className="relative overflow-hidden">
              <Image
                src="/images/hero-portrait.jpeg"
                alt="Confident woman — intentional luxury for the modern mystic"
                width={600}
                height={750}
                className="w-full h-auto object-cover"
                priority
              />
              {/* Floating caption card */}
              <div className="absolute bottom-6 left-6 bg-white px-6 py-4 max-w-[220px]">
                <p className="font-body text-xs text-primary leading-relaxed">
                  Intentional luxury for the modern mystic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND POSITION / FEATURES BENTO */}
      <section className="bg-surface-low py-20">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-16">
            <div>
              <h2 className="font-headline text-5xl font-bold text-primary leading-tight">
                Soul meets<br />strategy.
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                You&apos;re spiritually aware and seriously ambitious. You don&apos;t want to choose
                between the woo and the work — and you shouldn&apos;t have to. Enchanting Life
                Unleashed is where modern mystics build real systems rooted in intention and guided
                by intuition.
              </p>
              <div className="editorial-line" />
              <p className="eyebrow font-bold">Sacred systems for the modern mystic</p>
            </div>
          </div>

          {/* Bento cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Radical Authority */}
            <div className="bg-velvet p-10 flex flex-col gap-4 min-h-[240px]">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-gold/80 font-bold">
                01
              </p>
              <h3 className="font-headline text-2xl text-white">Radical Authority</h3>
              <p className="font-body text-sm text-white/70 leading-relaxed">
                Stop seeking permission from external sources. You are the architect, the judge, and
                the jury of your own experience.
              </p>
            </div>
            {/* Intentional Systems */}
            <div className="bg-surface-mid p-10 flex flex-col gap-4 min-h-[240px]">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-secondary font-bold">
                02
              </p>
              <h3 className="font-headline text-2xl text-primary">Intentional Systems</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Vague goals lead to vague results. We use systems to isolate intent and execute with
                surgical accuracy.
              </p>
            </div>
            {/* Sacred Boundaries */}
            <div className="bg-surface-mid p-10 flex flex-col gap-4 min-h-[240px]">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-secondary font-bold">
                03
              </p>
              <h3 className="font-headline text-2xl text-primary">Sacred Boundaries</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Boundaries aren&apos;t walls. They&apos;re the architecture of your most aligned
                life. Set them with intention. Hold them without guilt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS TEASER */}
      <section className="max-w-7xl mx-auto px-8 md:px-12 py-20">
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <div className="editorial-line mb-4" />
            <h2 className="font-headline text-4xl font-bold text-primary">The Collection</h2>
          </div>
          <Link
            href="/shop"
            className="font-label text-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors font-bold"
          >
            View All &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* LBP */}
          <div className="group">
            <div className="overflow-hidden mb-6">
              <Image
                src="/images/planner-cover.jpeg"
                alt="Lunar Boundary Planner"
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
            </div>
            <p className="eyebrow mb-2 font-bold">Planner</p>
            <h3 className="font-headline text-2xl font-bold text-primary mb-3 leading-tight">
              Lunar Boundary Planner
            </h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">
              Track your lunar cycle and set boundaries that actually hold. A moon-synced planning
              system for the woman building an intentional life.
            </p>
            <div className="flex items-center justify-between">
              <span className="font-label text-lg font-bold text-primary">$37</span>
              <Link href="/lunar-boundary-planner" className="btn-primary">
                View Details
              </Link>
            </div>
          </div>

          {/* MCLP */}
          <div className="group">
            <div className="overflow-hidden mb-6">
              <Image
                src="/images/moon-cover.jpeg"
                alt="Moon Cycle Life Planner"
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
            </div>
            <p className="eyebrow mb-2 font-bold">Planner</p>
            <h3 className="font-headline text-2xl font-bold text-primary mb-3 leading-tight">
              Moon Cycle Life Planner
            </h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">
              A full-year planning system built around your moon cycle. Align your energy, your
              goals, and your life with the rhythm of the moon.
            </p>
            <div className="flex items-center justify-between">
              <span className="font-label text-lg font-bold text-primary">$47</span>
              <Link href="/moon-cycle-life-planner" className="btn-primary">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUIZ CTA */}
      <section className="bg-velvet py-20">
        <div className="max-w-3xl mx-auto px-8 md:px-12 text-center flex flex-col items-center gap-8">
          <span className="font-script text-4xl text-gold">
            Know Your Boundary Archetype
          </span>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-white leading-tight">
            Identify the Leak in Your Power.
          </h2>
          <p className="font-body text-base text-white/80 leading-relaxed max-w-lg">
            Discover your boundary archetype and finally understand why you keep over-giving,
            burning out, or shrinking back. Five minutes. Real answers.
          </p>
          <Link href="/boundary-archetype-quiz" className="btn-ghost">
            Take the Free Quiz
          </Link>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-surface-low py-20">
        <div className="max-w-2xl mx-auto px-8 md:px-12 text-center flex flex-col items-center gap-8">
          <div className="editorial-line" />
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary leading-tight">
            Ritual meets reality.
          </h2>
          <p className="font-body text-base text-on-surface-variant leading-relaxed max-w-md">
            Join the coven. Weekly moon intel, boundary work, and sacred strategy — straight to your
            inbox. No fluff. Just the good stuff.
          </p>
          <form
            action="https://app.kit.com/forms/8935231/subscriptions"
            method="post"
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
          >
            <input
              type="email"
              name="email_address"
              placeholder="your@email.com"
              required
              className="flex-1 bg-transparent border-0 border-b-2 border-gold text-primary placeholder-on-surface-variant/50 font-body text-sm px-0 py-4 focus:outline-none focus:ring-0"
            />
            <button type="submit" className="btn-primary shrink-0">
              Subscribe
            </button>
          </form>
          <p className="font-body text-xs text-on-surface-variant/60">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </>
  )
}
