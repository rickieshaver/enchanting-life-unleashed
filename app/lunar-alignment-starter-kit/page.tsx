import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'The Lunar Alignment Starter Kit — Enchanting Life Unleashed',
  description:
    'A 28-day workbook and reusable cycle tracker for women done reading about cycle-based living and ready to actually run one. $7. Step Two of the Lunar Alignment System.',
}

export default function LunarAlignmentStarterKitPage() {
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
                  The Lunar Alignment System &middot; Step Two
                </p>
              </div>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-light text-primary leading-[0.95]">
                The Lunar Alignment<br />
                <span className="italic font-normal">Starter Kit</span>
              </h1>
              <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-lg">
                A 28-day workbook and reusable cycle tracker. For women done reading about
                cycle-based living and ready to actually run one. Built to use, not to admire.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <form action="/api/checkout-starter-kit" method="post">
                  <button type="submit" className="btn-primary">
                    Get Instant Access — $7
                  </button>
                </form>
                <span className="font-label text-sm text-primary border-b-2 border-gold pb-1 self-end tracking-wide">
                  Two PDFs &middot; Instant Download
                </span>
              </div>
            </div>

            {/* Right: Cover image */}
            <div className="md:w-2/5 relative">
              <Image
                src="/images/lunar-alignment-starter-kit-cover.jpeg"
                alt="The Lunar Alignment Starter Kit cover"
                width={500}
                height={620}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute bottom-6 left-6 bg-white px-6 py-4">
                <p className="font-script text-3xl text-primary">For Your First Real Cycle</p>
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
              Reading the model<br />isn&apos;t running it.
            </h2>
            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              You&apos;ve read the Quick Start Guide. You know the eight phases. You know what each
              one is for. Knowing isn&apos;t doing.
            </p>
            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              Most planning tools collapse around week three because they run on a flat calendar —
              same effort, same energy, every day. You don&apos;t have flat energy. Nobody does.
              You have a cycle.
            </p>
            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              The Starter Kit is what doing the cycle looks like. Twenty-eight days. Eight phases.
              One commitment. Pages you fill in, not pages you flip through.
            </p>
            <div className="flex flex-col gap-4">
              <div className="w-[2px] h-24 bg-gold" />
              <p className="font-headline text-xl italic text-primary leading-snug max-w-xs">
                &ldquo;Wishes don&apos;t survive Wednesday. Commitments do.&rdquo;
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white p-10">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-gold mb-4">
                Inside &middot; 01
              </p>
              <h3 className="font-headline text-2xl font-light text-primary mb-4">
                The 28-Day Workbook
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                26 pages. Eight phases as left-teach / right-practice spreads. A cycle calendar you
                fill in. Fillable commitment lines, daily action checklists, a Full Moon audit, an
                end-of-cycle review. The workbook you open on Day 1 and close on Day 28.
              </p>
            </div>
            <div className="bg-white p-10">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-gold mb-4">
                Inside &middot; 02
              </p>
              <h3 className="font-headline text-2xl font-light text-primary mb-4">
                The Reusable Cycle Tracker
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                A one-page printable. Eight phase boxes, fillable date and note for each, intention
                and reflection strip. After two or three cycles, the tracker is what you&apos;ll
                reach for. The workbook stays on the shelf for cycles when you need the depth back.
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
              For women done<br />reading about it.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              You&apos;ve read the Quick Start Guide and felt the &ldquo;huh, that&apos;s
              actually true&rdquo; click — and now you want a structure for actually running it.
            </p>
            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              You&apos;re tired of starting over every Monday. The cycle gives you something else:
              a 28-day container that doesn&apos;t need willpower to hold.
            </p>
            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              You don&apos;t want a journaling deck or a meditation app. You want pages you fill
              in, with prompts that ask hard questions and leave room for honest answers.
            </p>
            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              You&apos;d rather run one cycle and prove the model than read about cycle-based
              living for another year.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-velvet text-white py-24 md:py-32 px-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-10 items-start">
          <div className="w-12 h-[2px] bg-gold" />
          <h2 className="font-headline text-5xl md:text-7xl font-light leading-[0.95]">
            Run one cycle.<br />
            <span className="italic font-normal">Prove the model.</span>
          </h2>
          <p className="font-body text-lg leading-relaxed max-w-xl opacity-90">
            One cycle proves the model. Three cycles prove the compound. Twelve cycles change the
            architecture of how you live. The Starter Kit is the first one — designed so you
            actually finish it.
          </p>
          <div className="flex flex-col gap-4">
            <p className="font-headline text-7xl md:text-8xl font-light">$7</p>
            <p className="font-label text-sm uppercase tracking-[0.2em] opacity-75">
              One-time payment &middot; Two PDFs &middot; Instant download
            </p>
          </div>
          <form action="/api/checkout-starter-kit" method="post" className="w-full max-w-sm">
            <button type="submit" className="btn-primary w-full block text-center">
              Get the Starter Kit — $7
            </button>
          </form>
          <p className="font-body text-sm leading-relaxed opacity-75 max-w-md">
            After purchase, you&apos;ll receive an email with a link back to your access page —
            the workbook and tracker live there for re-download anytime.
          </p>
        </div>
      </section>
    </>
  )
}
