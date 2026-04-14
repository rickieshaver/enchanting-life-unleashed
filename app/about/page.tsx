import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — Enchanting Life Unleashed',
  description:
    'Redefining the architecture of a spiritual life through the lens of authority, precision, and unapologetic self-governance.',
}

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-surface-low pt-12">
        <div className="max-w-7xl mx-auto px-8 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-0 items-end">
          <div className="md:col-span-5 pb-24 z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-gold" />
              <span className="eyebrow font-bold">Founder&apos;s Statement</span>
            </div>
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-primary tracking-tighter">
              Boundaries are doors with locks{' '}
              <span className="italic font-light">YOU</span> control.
            </h1>
            <p className="mt-12 font-body text-xl text-secondary max-w-sm leading-relaxed">
              Redefining the architecture of a spiritual life through the lens of authority,
              precision, and unapologetic self-governance.
            </p>
          </div>
          <div className="md:col-span-7 relative">
            <Image
              src="/images/about-hero.jpeg"
              alt="Founder Portrait"
              width={800}
              height={1000}
              className="w-full aspect-[4/5] object-cover"
              priority
            />
            <div className="absolute bottom-12 -left-12 bg-surface p-12 hidden md:block max-w-xs">
              <span className="font-script text-4xl text-gold block mb-2">The Oracle</span>
              <p className="font-label text-[10px] uppercase tracking-widest leading-loose">
                Established 2024 — A movement for the grounded mystic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section className="py-24 md:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
          <div className="order-2 md:order-1">
            <div className="flex flex-col gap-12">
              <h2 className="font-headline text-4xl text-primary leading-tight">
                Why magic needs systems.
              </h2>
              <div className="flex flex-col gap-8 text-secondary text-lg leading-relaxed font-light">
                <p>
                  For years, I watched the world of &ldquo;self-growth&rdquo; dissolve into a cloud
                  of vague intentions and ungrounded rituals. It lacked the one thing that truly
                  transforms a life: <strong>Structure.</strong>
                </p>
                <p>
                  I realized that without a system, magic is just a wish. Without boundaries, energy
                  is just a leak. Enchanting Life Unleashed was born from the necessity of bridging
                  the ethereal with the industrial.
                </p>
                <div className="pl-8 border-l-2 border-gold">
                  <p className="font-headline italic text-primary text-2xl">
                    &ldquo;Power isn&apos;t found in the flow; it&apos;s found in the banks that
                    direct the river.&rdquo;
                  </p>
                </div>
                <p>
                  I don&apos;t offer fluff. I offer blueprints. We aren&apos;t here to escape
                  reality; we are here to master it using the very tools most are afraid to touch:
                  discipline, authority, and radical intentionality.
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 flex flex-col items-end">
            <Image
              src="/images/about-hero.jpeg"
              alt="Office Detail"
              width={500}
              height={500}
              className="w-4/5 aspect-square object-cover mb-12"
            />
            <div className="w-full text-right">
              <span className="font-script text-5xl text-gold block -mb-4 mr-4">
                Directness is Kindness
              </span>
              <p className="font-label text-xs uppercase tracking-widest text-primary">
                The Philosophy of the Grounded Oracle
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS BENTO */}
      <section className="py-24 md:py-32 bg-surface-low">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="mb-20 text-center max-w-2xl mx-auto">
            <span className="font-label text-[10px] uppercase tracking-[0.3rem] text-secondary block mb-4">
              Core Architecture
            </span>
            <h2 className="font-headline text-5xl text-primary">The Pillars of the Practice</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-surface p-12 flex flex-col h-full">
              <span className="font-headline text-3xl text-gold mb-6">01</span>
              <h3 className="font-headline text-2xl text-primary mb-6">Radical Authority</h3>
              <p className="text-secondary leading-relaxed">
                Stop seeking permission from external sources. You are the architect, the judge, and
                the jury of your own experience.
              </p>
            </div>
            <div className="bg-surface p-12 flex flex-col h-full">
              <span className="font-headline text-3xl text-gold mb-6">02</span>
              <h3 className="font-headline text-2xl text-primary mb-6">Intentional Systems</h3>
              <p className="text-secondary leading-relaxed">
                Vague goals lead to vague results. We use systems to isolate intent and execute with
                surgical accuracy.
              </p>
            </div>
            <div className="bg-surface p-12 flex flex-col h-full">
              <span className="font-headline text-3xl text-gold mb-6">03</span>
              <h3 className="font-headline text-2xl text-primary mb-6">Sacred Boundaries</h3>
              <p className="text-secondary leading-relaxed">
                Luxury is not about price; it is about the space between thoughts. It is the refusal
                to settle for the chaotic or the common.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUIZ CTA */}
      <section className="py-24 md:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="bg-velvet p-12 md:p-20 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="font-headline text-4xl md:text-5xl text-white mb-12">
                Your evolution is not an accident.{' '}
                <br />
                <span className="italic font-light">It is a strategy.</span>
              </h2>
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <Link href="/boundary-archetype-quiz" className="btn-primary">
                  Take the Quiz
                </Link>
                <Link href="/shop" className="btn-ghost">
                  Browse the Shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
