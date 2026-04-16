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
    price: '$17',
    href: '/lunar-boundary-planner',
    cta: 'View Details',
    image: '/images/planner-cover.jpeg',
    alt: 'Lunar Boundary Planner',
  },
  {
    tag: 'Planner',
    title: 'Moon Cycle Life Planner',
    price: '$17',
    href: '/moon-cycle-life-planner',
    cta: 'View Details',
    image: '/images/moon-cover.jpeg',
    alt: 'Moon Cycle Life Planner',
  },
  {
    tag: 'Freebie',
    title: 'Moon Magic Quick Start Guide',
    price: 'Free',
    href: '/freebies',
    cta: 'Download',
    image: '/images/freebies-cover.jpeg',
    alt: 'Moon Magic Quick Start Guide',
  },
  {
    tag: 'Quiz',
    title: 'Boundary Archetype Quiz',
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
              This Isn&apos;t Content.<br />
              <span className="italic font-light">It&apos;s Infrastructure for Your Life.</span>
            </h1>
          </div>
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
                <div className="font-body text-sm text-secondary leading-relaxed mb-6 flex-grow flex flex-col gap-4">
                  <div>
                    <p className="font-label text-xs uppercase tracking-widest text-primary font-bold mb-2">This is for you if:</p>
                    <ul className="flex flex-col gap-1 pl-3">
                      <li>— You&apos;re tired of overgiving</li>
                      <li>— You&apos;re done second-guessing yourself</li>
                      <li>— You want actual change—not more awareness</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-label text-xs uppercase tracking-widest text-primary font-bold mb-2">Inside, you&apos;ll:</p>
                    <ul className="flex flex-col gap-1 pl-3">
                      <li>— Identify exactly where you&apos;re leaking</li>
                      <li>— Build boundaries that actually hold</li>
                      <li>— Create systems you can maintain long-term</li>
                    </ul>
                  </div>
                  <p className="font-body text-sm text-primary italic mt-2">
                    This isn&apos;t a journal. It&apos;s a system.
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
