import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'The Lunar Alignment Planner',
  description:
    'An undated 202-page planner for twelve full cycles of intentional, moon-paced living. Step Three of the Lunar Alignment System. $27. Built to be used.',
  alternates: { canonical: '/lunar-alignment-planner' },
  openGraph: {
    images: [{ url: 'https://enchantinglifeunleashed.com/images/lunar-alignment-planner-cover.jpeg' }],
  },
}

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Lunar Alignment Planner',
  description:
    'An undated 202-page planner for twelve cycles of intentional cycle-based living — annual theme, twelve fillable cycles, quarterly reviews. Step Three of the Lunar Alignment System.',
  image: 'https://enchantinglifeunleashed.com/images/lunar-alignment-planner-cover.jpeg',
  url: 'https://enchantinglifeunleashed.com/lunar-alignment-planner',
  brand: { '@type': 'Brand', name: 'Enchanting Life Unleashed' },
  offers: {
    '@type': 'Offer',
    price: '27',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://enchantinglifeunleashed.com/lunar-alignment-planner',
  },
}

export default function LunarAlignmentPlannerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/* HERO */}
      <section className="pt-24 md:pt-32 pb-24 px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-end">
            {/* Left: Copy */}
            <div className="md:w-3/5 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-[2px] bg-gold" />
                <p className="eyebrow font-bold">
                  The Lunar Alignment System &middot; Step Three
                </p>
              </div>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-light text-primary leading-[0.95]">
                The Lunar Alignment<br />
                <span className="italic font-normal">Planner</span>
              </h1>
              <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-lg">
                Twelve cycles. Undated. 202 pages built to be lived in, not collected. Annual
                theme, quarterly reviews, full year-end reflection — the year-deep version of the
                practice.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <form action="/api/checkout-planner" method="post">
                  <button type="submit" className="btn-primary">
                    Get Instant Access — $27
                  </button>
                </form>
                <span className="font-label text-sm text-primary border-b-2 border-gold pb-1 self-end tracking-wide">
                  202pp PDF &middot; Instant Download
                </span>
              </div>
            </div>

            {/* Right: Cover image */}
            <div className="md:w-2/5 relative">
              <Image
                src="/images/lunar-alignment-planner-cover.jpeg"
                alt="The Lunar Alignment Planner cover"
                width={500}
                height={620}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute bottom-6 left-6 bg-white px-6 py-4">
                <p className="font-script text-3xl text-primary">For Twelve Cycles of Practice</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="bg-surface-low py-24 md:py-32 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col gap-8">
            <h2 className="font-headline text-4xl md:text-5xl font-light text-primary leading-tight">
              A year isn&apos;t<br />365 boxes.
            </h2>
            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              You&apos;ve run a cycle. You&apos;ve felt the difference between flat-calendar
              effort and cycle-aware practice. You&apos;re past the proving stage.
            </p>
            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              Most year planners assume January energy in November and burn out by Valentine&apos;s.
              They run on dates, not on cycles. The Planner runs on twelve cycles — so it stays
              alive in March when grid-day planners have already collapsed.
            </p>
            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              Undated, so you start when you start. Annual theme on page five. Twelve fillable
              cycles. Four quarterly reviews built into the structure. A full year-end reflection
              that doesn&apos;t pretend the year was a clean line.
            </p>
            <div className="flex flex-col gap-4">
              <div className="w-[2px] h-24 bg-gold" />
              <p className="font-headline text-xl italic text-primary leading-snug max-w-xs">
                &ldquo;Polish-first is procrastination wearing a smart outfit.&rdquo;
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white p-10">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-gold mb-4">
                Inside &middot; 01
              </p>
              <h3 className="font-headline text-2xl font-light text-primary mb-4">
                Twelve Cycles
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Fourteen pages per cycle. A cycle opener that ties the year-theme to this cycle, an
                eight-phase practice sequence, a mid-cycle reflection at Day 14, an end-of-cycle
                review spread, a 28-day habit tracker, and a notes page. One cycle at a time.
              </p>
            </div>
            <div className="bg-white p-10">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-gold mb-4">
                Inside &middot; 02
              </p>
              <h3 className="font-headline text-2xl font-light text-primary mb-4">
                Annual Theme + Quarterly Reviews
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Page five is your word for the year. Three intentions with observable measures.
                Four quarterly review spreads built into the cadence — what shipped, what stalled,
                what you&apos;re tightening. The architecture stays visible all year.
              </p>
            </div>
            <div className="bg-white p-10">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-gold mb-4">
                Inside &middot; 03
              </p>
              <h3 className="font-headline text-2xl font-light text-primary mb-4">
                Year-End Reflection
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Fourteen pages of structured close-out. Annual deep audit, year-end celebration
                spread, theme review, bridge to next year, resources you&apos;d hand to past-you,
                and a closing essay. Built for women who actually finish the year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-24 md:py-32 px-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-[2px] bg-gold" />
            <p className="font-label text-xs uppercase tracking-[0.2em] text-gold">
              Who This Is For
            </p>
            <h2 className="font-headline text-4xl md:text-5xl font-light text-primary leading-tight">
              For women done<br />restarting.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              You&apos;ve already run a cycle — or two, or three — and you&apos;re ready for the
              year-deep container. The Planner assumes practice. It doesn&apos;t re-teach the model.
            </p>
            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              You&apos;re tired of January-energy planners that pretend you have flat capacity from
              week one to week fifty-two. You want a structure that bends with the cycle.
            </p>
            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              You don&apos;t want a date-locked book. You want pages you fill in, on your timeline,
              starting on whatever new moon you&apos;re looking at next.
            </p>
            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              You&apos;d rather finish twelve cycles of honest practice than half-fill another
              dated planner that died in March.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-velvet text-white py-24 md:py-32 px-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-10 items-start">
          <div className="w-12 h-[2px] bg-gold" />
          <h2 className="font-headline text-5xl md:text-7xl font-light leading-[0.95]">
            Twelve cycles.<br />
            <span className="italic font-normal">One year, lived honestly.</span>
          </h2>
          <p className="font-body text-lg leading-relaxed max-w-xl opacity-90">
            One cycle proves the model. Three cycles prove the compound. Twelve cycles change the
            architecture of how you live a year. The Planner is the container for all twelve —
            built to use, not to admire.
          </p>
          <div className="flex flex-col gap-4">
            <p className="font-headline text-7xl md:text-8xl font-light">$27</p>
            <p className="font-label text-sm uppercase tracking-[0.2em] opacity-75">
              One-time payment &middot; 202pp PDF &middot; Instant download
            </p>
          </div>
          <form action="/api/checkout-planner" method="post" className="w-full max-w-sm">
            <button type="submit" className="btn-primary w-full block text-center">
              Get the Planner — $27
            </button>
          </form>
          <p className="font-body text-sm leading-relaxed opacity-75 max-w-md">
            After purchase, you&apos;ll receive an email with a link back to your access page —
            the Planner lives there for re-download anytime.
          </p>
        </div>
      </section>
    </>
  )
}
