import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Transmission — Blog — Enchanting Life Unleashed',
  description:
    'Insights on lunar living, sacred boundaries, and moon magic for the modern mystic.',
}

const posts = [
  {
    tag: 'Lunar Living',
    title: 'Why Your Morning Routine is Failing Your Strategy',
    excerpt:
      'High-performance is not found in the optimization of chores, but in the reclamation of sovereignty over your first conscious hour.',
    readTime: '8 Min Read',
  },
  {
    tag: 'Boundaries',
    title: 'The Architect\'s Framework: Designing for Uninterrupted Flow',
    excerpt:
      'An examination of physical space and digital hygiene as the core infrastructure of creative output.',
    readTime: '12 Min Read',
  },
  {
    tag: 'Moon Magic',
    title: 'The Cost of Consent: Reclaiming the Attention Economy',
    excerpt:
      'How to decouple your worth from the algorithmic feedback loop and build a fortress of self-direction.',
    readTime: '15 Min Read',
  },
]

export default function BlogPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-surface-low py-24 md:py-32 px-8 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8">
            <h2 className="font-script text-4xl text-secondary mb-4">The Transmission</h2>
            <div className="w-24 h-[2px] bg-gold mb-8" />
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary leading-tight tracking-tighter italic">
              Insights for the Grounded Mystic
            </h1>
          </div>
          <div className="md:col-span-4 flex items-end">
            <p className="font-body text-lg text-secondary leading-relaxed">
              Systems, rituals, and sovereignty — transmissions from the intersection of soul and
              strategy.
            </p>
          </div>
        </div>
      </section>

      {/* POST CARDS */}
      <section className="max-w-7xl mx-auto px-8 md:px-12 py-20">
        <div className="flex justify-between items-end mb-16">
          <div className="border-l-2 border-gold pl-6">
            <h3 className="font-headline text-3xl italic text-primary">Recent Intelligence</h3>
            <p className="font-label text-xs uppercase tracking-widest text-secondary mt-2">
              Systems, Rituals, &amp; Sovereignty
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {posts.map((post) => (
            <article key={post.title} className="group flex flex-col">
              <div className="aspect-[4/5] overflow-hidden mb-8 bg-surface-low" />
              <div className="flex flex-col flex-grow">
                <span className="font-label text-[10px] uppercase tracking-[0.3em] text-gold mb-4">
                  {post.tag}
                </span>
                <h4 className="font-headline text-2xl font-bold text-primary mb-4 leading-snug group-hover:text-secondary transition-colors">
                  {post.title}
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>
                <div className="w-12 h-[1px] bg-gold/40 mb-6" />
                <span className="font-label text-[10px] uppercase tracking-widest text-secondary">
                  {post.readTime}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="bg-velvet py-20">
        <div className="max-w-3xl mx-auto px-8 md:px-12 text-center flex flex-col items-center gap-8">
          <h2 className="font-headline text-4xl md:text-5xl font-light italic text-white leading-snug">
            &ldquo;True luxury is not the possession of objects, but the absolute control over how
            one spends their finite time.&rdquo;
          </h2>
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-[1px] bg-gold" />
            <p className="font-label text-xs uppercase tracking-[0.25em] text-gold">
              The ELU Philosophy
            </p>
          </div>
          <Link href="/freebies" className="btn-ghost mt-4">
            Get Free Resources
          </Link>
        </div>
      </section>
    </>
  )
}
