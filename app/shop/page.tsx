import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Collection — Enchanting Life Unleashed',
  description:
    'Sacred systems for modern mystics. The Lunar Alignment ecosystem, the Sacred Boundary System, and the Boundary Archetype Quiz. Built to use, not to admire.',
}

type ProductCopy = {
  forYouIf: string[]
  insideYoull: string[]
  pullquote: string
}

type Product = {
  tag: string
  title: string
  price: string
  href: string
  cta: string
  image: string
  alt: string
  copy: ProductCopy
}

const products: Product[] = [
  {
    tag: 'Free · Step One',
    title: 'Lunar Alignment Quick Start Guide',
    price: 'Free',
    href: '/lunar-alignment-quick-start-guide',
    cta: 'Get the Guide',
    image: '/images/lunar-alignment-quick-start-guide-cover.png',
    alt: 'The Lunar Alignment Quick Start Guide cover',
    copy: {
      forYouIf: [
        'You’re curious about cycle-based living and want the model in plain language',
        'You’re tired of vague moon content and want something specific enough to act on',
        'You want orientation before you commit to running a real cycle',
      ],
      insideYoull: [
        'Learn the eight lunar phases and what each one is actually for',
        'Get the Action framework that maps every phase to a verb',
        'Walk away with the 28-day cycle map in one page',
      ],
      pullquote: 'Read once. Run one cycle. Then decide.',
    },
  },
  {
    tag: 'Workbook · Step Two',
    title: 'Lunar Alignment Starter Kit',
    price: '$7',
    href: '/lunar-alignment-starter-kit',
    cta: 'Get Instant Access',
    image: '/images/lunar-alignment-starter-kit-gold.png',
    alt: 'The Lunar Alignment Starter Kit cover',
    copy: {
      forYouIf: [
        'You’ve read the QSG and want a structure for actually running a cycle',
        'You’re tired of starting over every Monday and want a 28-day container',
        'You’d rather run one real cycle than read about cycle-based living for another year',
      ],
      insideYoull: [
        'Fill in a 28-day workbook — eight phases as left-teach / right-practice spreads',
        'Set one commitment for the cycle and track daily action against it',
        'Print a one-page reusable tracker for every cycle that follows',
      ],
      pullquote: 'Wishes don’t survive Wednesday. Commitments do.',
    },
  },
  {
    tag: 'Planner · Step Three',
    title: 'Lunar Alignment Planner',
    price: '$27',
    href: '/lunar-alignment-planner',
    cta: 'Get Instant Access',
    image: '/images/lunar-alignment-planner-gold.png',
    alt: 'The Lunar Alignment Planner cover',
    copy: {
      forYouIf: [
        'You’ve already run a cycle (or three) and you’re ready for the year-deep container',
        'You’re done with January-energy planners that die in March',
        'You want an undated structure that bends with the cycle, not against it',
      ],
      insideYoull: [
        'Set an annual theme + three intentions with observable measures',
        'Run twelve fillable cycles — fourteen pages each, undated',
        'Close the year with quarterly reviews and a full year-end reflection',
      ],
      pullquote: 'Twelve cycles change the architecture of how you live a year.',
    },
  },
  {
    tag: 'Workbook',
    title: 'Sacred Boundary System',
    price: '$17',
    href: '/sacred-boundary-system',
    cta: 'View Details',
    image: '/images/planner-cover.jpeg',
    alt: 'The Sacred Boundary System workbook',
    copy: {
      forYouIf: [
        'You know what your boundary pattern is and you want to actually break it',
        'You’re past awareness and ready for archetype-specific practice',
        'You want a moon-aligned container for the work, not another mindset reframe',
      ],
      insideYoull: [
        'Run eight lunar cycles of structured boundary practice',
        'Work the four domains — Spellbreaker, Time Keeper, Sacred Vessel, Resource Guardian',
        'Use archetype-specific prompts built for Open Door, Cracked Window, or Sacred Keeper',
      ],
      pullquote: 'Boundaries aren’t walls. They’re the architecture of an aligned life.',
    },
  },
  {
    tag: 'Quiz',
    title: 'Boundary Archetype Quiz',
    price: 'Free',
    href: '/boundary-archetype-quiz',
    cta: 'Take the Quiz',
    image: '/images/boundary-quiz-hero.jpeg',
    alt: 'The Boundary Archetype Quiz',
    copy: {
      forYouIf: [
        'You keep over-giving, burning out, or shrinking back and don’t know why',
        'You want a diagnosis before you commit to a practice',
        'You’re skeptical of quizzes and want one that’s actually specific',
      ],
      insideYoull: [
        'Identify your boundary archetype — Open Door, Cracked Window, or Sacred Keeper',
        'See which of the four domains your pattern leaks in first',
        'Get a personalized Blueprint and Domain Deep Dive in your inbox',
      ],
      pullquote: 'Five minutes. Real answers. The diagnosis is the start.',
    },
  },
]

export default function ShopPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-surface-low">
        <div className="max-w-7xl mx-auto px-8 md:px-12 pt-24 pb-12">
          <div className="flex flex-col md:flex-row items-baseline gap-8">
            <div className="editorial-line mb-4 md:mb-0" />
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-primary leading-none">
              This Isn&apos;t Content.<br />
              <span className="italic font-light">It&apos;s Infrastructure for Your Life.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-8 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-10">
          {products.map((product) => (
            <div key={product.title} className="flex flex-col group h-full">
              <div className="relative overflow-hidden aspect-[4/5] bg-surface-low">
                <span className="absolute top-4 left-4 bg-white px-4 py-1 font-label text-[10px] uppercase tracking-widest text-primary z-10">
                  {product.tag}
                </span>
                <Image
                  src={product.image}
                  alt={product.alt}
                  width={600}
                  height={750}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-8 flex flex-col flex-grow">
                <h2 className="font-headline text-2xl lg:text-3xl font-bold text-primary mb-3 leading-tight">
                  {product.title}
                </h2>
                <div className="font-body text-sm text-secondary leading-relaxed mb-6 flex-grow flex flex-col gap-4">
                  <div>
                    <p className="font-label text-xs uppercase tracking-widest text-primary font-bold mb-2">This is for you if:</p>
                    <ul className="flex flex-col gap-1 pl-3">
                      {product.copy.forYouIf.map((line) => (
                        <li key={line}>&mdash; {line}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-label text-xs uppercase tracking-widest text-primary font-bold mb-2">Inside, you&apos;ll:</p>
                    <ul className="flex flex-col gap-1 pl-3">
                      {product.copy.insideYoull.map((line) => (
                        <li key={line}>&mdash; {line}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="font-body text-sm text-primary italic mt-2">
                    {product.copy.pullquote}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-on-surface-variant/10 pt-6">
                  <span className="font-headline text-2xl font-bold text-primary">
                    {product.price}
                  </span>
                  <Link href={product.href} className="btn-primary">
                    {product.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
