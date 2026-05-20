import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import NewsletterForm from './_components/NewsletterForm'

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
              You Don&apos;t Need More Healing. You Need Better Boundaries.
            </h1>
            <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-xl">
              Where modern mystics stop leaking energy, money, and time—and start building lives that actually hold them.
            </p>
            <div className="flex items-center gap-6 mt-4 flex-wrap">
              <Link href="/boundary-archetype-quiz" className="btn-primary">
                Take the Boundary Quiz
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
                This isn&apos;t another &ldquo;high vibe&rdquo; corner of the internet.<br />
                <br />
                This is where you figure out exactly where your life is leaking—and fix it.
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                No fluff. No bypassing. No pretending boundaries are &ldquo;just say no.&rdquo;<br />
                <br />
                We build structure.<br />
                We build self-trust.<br />
                We build lives that actually hold you.
              </p>
              <div className="editorial-line" />
              <p className="eyebrow font-bold">Boundaries aren&apos;t walls. They&apos;re systems.</p>
            </div>
          </div>

          {/* Bento cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Where your energy goes */}
            <div className="bg-velvet p-10 flex flex-col gap-4 min-h-[240px]">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-gold/80 font-bold">
                01
              </p>
              <h3 className="font-headline text-2xl text-white">Where Your Energy Goes</h3>
              <p className="font-body text-sm text-white/70 leading-relaxed">
                You get to decide what receives your time, attention, and capacity—and what doesn&apos;t. That&apos;s not selfish. That&apos;s a system.
              </p>
            </div>
            {/* Who gets access */}
            <div className="bg-surface-mid p-10 flex flex-col gap-4 min-h-[240px]">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-secondary font-bold">
                02
              </p>
              <h3 className="font-headline text-2xl text-primary">Who Gets Access to You</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Not everyone gets the same version of you. Boundaries define the terms of access—at work, in relationships, everywhere.
              </p>
            </div>
            {/* What stays and what doesn't */}
            <div className="bg-surface-mid p-10 flex flex-col gap-4 min-h-[240px]">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-secondary font-bold">
                03
              </p>
              <h3 className="font-headline text-2xl text-primary">What Stays and What Doesn&apos;t</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Once the system is in place, the decision is already made. You stop deliberating and start living on your terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="max-w-7xl mx-auto px-8 md:px-12 py-20">
        <div className="grid grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="col-span-12 md:col-span-7 flex flex-col gap-4">
            <div className="editorial-line" />
            <p className="font-body text-lg text-on-surface-variant leading-relaxed">
              You&apos;ve done the healing.<br />
              You&apos;ve read the books.<br />
              You&apos;ve journaled your way through every phase of your life.<br />
              <br />
              And somehow&hellip;<br />
              <br />
              You&apos;re still overextended.<br />
              Still drained.<br />
              Still saying yes when you mean no.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 flex flex-col justify-end gap-4 md:pt-8">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary leading-tight">
              That&apos;s not a mindset problem.<br />
              <br />
              That&apos;s a boundary problem.
            </h2>
          </div>
        </div>
      </section>

      {/* PRODUCTS TEASER */}
      <section className="max-w-7xl mx-auto px-8 md:px-12 py-20">
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <div className="editorial-line mb-4" />
            <h2 className="font-headline text-4xl font-bold text-primary">Start Here</h2>
            <p className="font-body text-base text-on-surface-variant leading-relaxed max-w-xl mt-4">
              The Lunar Alignment System: cycle-based practice for women who&apos;d rather run a
              real cycle than read about cycle-based living for another year.<br />
              No fluff. No bypassing. Just the framework and what to do with it.
            </p>
          </div>
          <Link
            href="/shop"
            className="font-label text-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors font-bold"
          >
            View All &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Starter Kit */}
          <div className="group">
            <div className="aspect-square overflow-hidden mb-6 bg-surface-low flex items-center justify-center">
              <Image
                src="/images/lunar-alignment-starter-kit-gold.png"
                alt="The Lunar Alignment Starter Kit"
                width={800}
                height={800}
                className="w-[92%] h-[92%] object-contain"
              />
            </div>
            <p className="eyebrow mb-2 font-bold">Workbook &middot; Step Two</p>
            <h3 className="font-headline text-2xl font-bold text-primary mb-3 leading-tight">
              Lunar Alignment Starter Kit
            </h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">
              First-cycle practice. A 28-day workbook + reusable tracker. Built to use, not to
              admire.
            </p>
            <div className="flex items-center justify-between">
              <span className="font-label text-lg font-bold text-primary">$7</span>
              <Link href="/lunar-alignment-starter-kit" className="btn-primary">
                View Details
              </Link>
            </div>
          </div>

          {/* Planner */}
          <div className="group">
            <div className="aspect-square overflow-hidden mb-6">
              <Image
                src="/images/lunar-alignment-planner-gold.png"
                alt="The Lunar Alignment Planner"
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="eyebrow mb-2 font-bold">Planner &middot; Step Three</p>
            <h3 className="font-headline text-2xl font-bold text-primary mb-3 leading-tight">
              Lunar Alignment Planner
            </h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">
              Twelve cycles. One year. Annual theme + intentions, quarterly reviews, year-end
              reflection.
            </p>
            <div className="flex items-center justify-between">
              <span className="font-label text-lg font-bold text-primary">$27</span>
              <Link href="/lunar-alignment-planner" className="btn-primary">
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
          <NewsletterForm source="homepage-newsletter" theme="light" />
          <p className="font-body text-xs text-on-surface-variant/60">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </>
  )
}
