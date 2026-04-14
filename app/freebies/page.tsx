import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Freebies — Enchanting Life Unleashed',
  description:
    'Free sacred tools for the modern mystic. Download the Moon Magic Quick Start Guide and more.',
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
              The Wise Best Friend&apos;s Guide
            </span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl text-primary leading-[0.95] tracking-tighter">
            The Sovereignty Blueprint:{' '}
            <span className="italic font-light">
              From Overwhelmed to Ordered Magic.
            </span>
          </h1>
          <p className="font-body text-xl text-on-surface-variant max-w-xl leading-relaxed">
            Stop reacting to your life and start orchestrating it. This digital guide provides the
            high-frequency systems needed to command your schedule without sacrificing your soul.
          </p>

          {/* Benefit List */}
          <ul className="flex flex-col gap-6 pt-4">
            <li className="flex items-start gap-4">
              <div>
                <strong className="font-label uppercase tracking-widest text-sm text-primary block mb-1">
                  Energy Auditing
                </strong>
                <p className="text-secondary">
                  Identify precisely where your magic is leaking and reclaim 10+ hours a week.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div>
                <strong className="font-label uppercase tracking-widest text-sm text-primary block mb-1">
                  The Ritual Framework
                </strong>
                <p className="text-secondary">
                  Practical, non-fluffy implementation of morning and evening architecture.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div>
                <strong className="font-label uppercase tracking-widest text-sm text-primary block mb-1">
                  Priority Hard-Coding
                </strong>
                <p className="text-secondary">
                  A direct strategy for making your most &ldquo;enchanting&rdquo; goals
                  non-negotiable.
                </p>
              </div>
            </li>
          </ul>

          {/* Kit Form */}
          <div className="w-full max-w-md pt-8">
            <form
              action="https://app.kit.com/forms/8935231/subscriptions"
              method="post"
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <label className="font-label text-xs uppercase tracking-widest text-primary font-bold">
                  Email Address
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
                Download the Blueprint
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
              src="/images/freebies-cover.jpeg"
              alt="The Sovereignty Blueprint Guide"
              width={500}
              height={667}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-6 -right-6 bg-gold p-8 flex flex-col items-center justify-center text-primary text-center">
            <span className="font-headline text-4xl font-bold tracking-tighter">FREE</span>
            <span className="font-label text-[10px] uppercase tracking-widest font-extrabold">
              Value: $47
            </span>
          </div>
        </div>
      </section>

      {/* RESOURCE CARDS */}
      <section className="bg-surface-low py-20">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="mb-12">
            <div className="editorial-line mb-4" />
            <h2 className="font-headline text-4xl font-bold text-primary">Free Resources</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Moon Magic Guide */}
            <div className="bg-surface p-10 flex flex-col gap-6">
              <p className="eyebrow font-bold">Guide</p>
              <h3 className="font-headline text-2xl text-primary">Moon Magic Quick Start Guide</h3>
              <p className="font-body text-sm text-secondary leading-relaxed">
                Your introduction to lunar living — 8 moon phases, rituals, and the magic of working
                with the cycle. Free, practical, and designed to start working immediately.
              </p>
              <a href="#" className="btn-primary self-start">
                Download
              </a>
            </div>

            {/* Wolf Moon Ritual */}
            <div className="bg-surface p-10 flex flex-col gap-6">
              <p className="eyebrow font-bold">Ritual</p>
              <h3 className="font-headline text-2xl text-primary">Wolf Moon Ritual</h3>
              <p className="font-body text-sm text-secondary leading-relaxed">
                A guided ritual for the Wolf Moon — the first full moon of the year. Set your
                intentions for the year ahead and release what no longer serves you.
              </p>
              <a href="#" className="btn-primary self-start">
                Download
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="bg-velvet py-20">
        <div className="max-w-2xl mx-auto px-8 md:px-12 text-center flex flex-col items-center gap-8">
          <div className="editorial-line" />
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-white leading-tight">
            Stay in the magic.
          </h2>
          <p className="font-body text-base text-white/80 leading-relaxed max-w-md">
            Join the coven. Weekly moon intel, boundary work, and sacred strategy — straight to your
            inbox.
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
