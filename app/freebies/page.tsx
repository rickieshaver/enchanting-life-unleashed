import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Freebies — Enchanting Life Unleashed',
  description:
    'Free sacred tools for the modern mystic. Download the Lunar Alignment Quick Start Guide — Step One of the Lunar Alignment System.',
}

export default function FreebiesPage() {
  return (
    <>
      {/* HERO WITH OPT-IN */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Content Column */}
        <div className="lg:col-span-7 flex flex-col items-start gap-8">
          <div className="flex items-center gap-4">
            <div className="w-[2px] h-[60px] bg-gold" />
            <span className="font-script text-3xl text-secondary">
              Step One of the Lunar Alignment System
            </span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl text-primary leading-[0.95] tracking-tighter">
            The Lunar Alignment{' '}
            <span className="italic font-light">Quick Start Guide.</span>
          </h1>
          <p className="font-body text-xl text-on-surface-variant max-w-xl leading-relaxed">
            Free, practical, and designed to start working immediately. The whole model in your
            hand — read it once, then start running real cycles.
          </p>

          {/* Benefit List */}
          <ul className="flex flex-col gap-6 pt-4">
            <li className="flex items-start gap-4">
              <div>
                <strong className="font-label uppercase tracking-widest text-sm text-primary block mb-1">
                  The Eight Lunar Phases
                </strong>
                <p className="text-secondary">
                  What each phase is for, in plain language. The energy, the question, the move.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div>
                <strong className="font-label uppercase tracking-widest text-sm text-primary block mb-1">
                  The Action Framework
                </strong>
                <p className="text-secondary">
                  Every phase mapped to a verb. Set, build, audit, release. The model running, not
                  sitting.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div>
                <strong className="font-label uppercase tracking-widest text-sm text-primary block mb-1">
                  The 28-Day Cycle Map
                </strong>
                <p className="text-secondary">
                  One page. Eight phases plotted across the cycle. Pin it on the wall and start
                  watching where you actually live in the rhythm.
                </p>
              </div>
            </li>
          </ul>

          {/* QSG Opt-in */}
          <div className="w-full max-w-md pt-8">
            <form
              action="/api/qsg-optin"
              method="post"
              className="flex flex-col gap-6"
            >
              <input type="hidden" name="source" value="freebies-qsg" />
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
              <button
                type="submit"
                className="btn-primary w-full text-center"
              >
                Download the Guide
              </button>
            </form>
            <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-wider mt-4 text-center">
              Your privacy is sovereign. No spam, only substance.
            </p>
          </div>
        </div>

        {/* Image Column */}
        <div className="lg:col-span-5 relative mt-12 lg:mt-0">
          <div className="relative aspect-[3/4] bg-surface-mid overflow-hidden">
            <Image
              src="/images/lunar-alignment-quick-start-guide-cover.png"
              alt="The Lunar Alignment Quick Start Guide"
              width={500}
              height={667}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-6 -right-6 bg-gold p-8 flex flex-col items-center justify-center text-primary text-center">
            <span className="font-headline text-4xl font-bold tracking-tighter">FREE</span>
            <span className="font-label text-[10px] uppercase tracking-widest font-extrabold">
              Step One
            </span>
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="bg-velvet py-20">
        <div className="max-w-2xl mx-auto px-8 md:px-12 text-center flex flex-col items-center gap-8">
          <div className="editorial-line" />
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-white leading-tight">
            Stay in the rhythm.
          </h2>
          <p className="font-body text-base text-white/80 leading-relaxed max-w-md">
            Join the coven. Weekly notes on lunar living, sacred boundaries, and sacred strategy —
            straight to your inbox.
          </p>
          <form
            action="/api/newsletter-subscribe"
            method="post"
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
          >
            <input type="hidden" name="source" value="freebies-newsletter" />
            <input
              type="email"
              name="email_address"
              placeholder="your@email.com"
              required
              className="flex-1 bg-transparent border-0 border-b-2 border-gold text-white placeholder-white/50 font-body text-sm px-0 py-4 focus:outline-none focus:ring-0"
            />
            <button type="submit" className="bg-white text-primary px-8 py-4 font-label text-xs uppercase tracking-widest font-bold hover:bg-surface transition-colors shrink-0">
              Subscribe
            </button>
          </form>
          <p className="font-body text-xs text-white/40">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  )
}
