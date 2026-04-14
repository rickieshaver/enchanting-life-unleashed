import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Collection — Enchanting Life Unleashed',
  description:
    'Sacred systems for modern mystics. Planners, guides, and tools designed to align your energy with your ambition.',
}

const products = [
  {
    tag: 'Planner',
    title: 'Lunar Boundary Planner',
    description:
      'A 12-month moon-aligned planner to set, hold, and honor your boundaries — without guilt or apology.',
    price: '$37',
    href: '/lunar-boundary-planner',
    cta: 'View Details',
    image: '/images/planner-cover.jpeg',
    alt: 'Lunar Boundary Planner',
  },
  {
    tag: 'Planner',
    title: 'Moon Cycle Life Planner',
    description:
      '163 pages synced to the 2026 lunar calendar. Weekly pages, moon rituals, and intention-setting spreads.',
    price: '$47',
    href: '/moon-cycle-life-planner',
    cta: 'View Details',
    image: '/images/moon-cover.jpeg',
    alt: 'Moon Cycle Life Planner',
  },
  {
    tag: 'Freebie',
    title: 'Moon Magic Quick Start Guide',
    description:
      'Your introduction to lunar living — 8 moon phases, rituals, and the magic of working with the cycle.',
    price: 'Free',
    href: '/freebies',
    cta: 'Download',
    image: '/images/freebies-cover.jpeg',
    alt: 'Moon Magic Quick Start Guide',
  },
  {
    tag: 'Quiz',
    title: 'Boundary Archetype Quiz',
    description:
      'Discover your boundary archetype and finally understand why you keep over-giving, burning out, or shrinking back.',
    price: 'Free',
    href: '/boundary-archetype-quiz',
    cta: 'Take the Quiz',
    image: '/images/about-hero.jpeg',
    alt: 'Boundary Archetype Quiz',
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
              Tools for the grounded mystic.
            </h1>
          </div>
          <p className="font-body text-xl text-secondary tracking-wide mt-6 max-w-lg">
            Sacred systems designed to align your energy with your ambition.
          </p>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-8 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {products.map((product) => (
            <div key={product.title} className="flex flex-col group h-full">
              <div className="relative overflow-hidden aspect-[4/5] bg-surface-low">
                <span className="absolute top-4 left-4 bg-white px-4 py-1 font-label text-xs uppercase tracking-widest text-primary z-10">
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
                <h2 className="font-headline text-3xl font-bold text-primary mb-3 leading-tight">
                  {product.title}
                </h2>
                <p className="font-body text-sm text-secondary leading-relaxed mb-6 flex-grow">
                  {product.description}
                </p>
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
