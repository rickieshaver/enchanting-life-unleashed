import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { allPosts } from './_lib/posts'

export const metadata: Metadata = {
  title: 'The Transmission — Blog',
  description:
    'The Transmission — essays on lunar living, sacred boundaries, and shadow work for the modern mystic. No fluff, no performative spirituality. Weekly.',
  alternates: { canonical: '/blog' },
}

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
              This Isn&apos;t Content.<br />It&apos;s Calibration.
            </h1>
          </div>
          <div className="md:col-span-4 flex items-end">
            <p className="font-body text-lg text-secondary leading-relaxed">
              If you&apos;re looking for inspiration, this isn&apos;t it.<br />
              If you&apos;re ready to see where you&apos;re leaking—and fix it—start anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* POST CARDS */}
      <section className="max-w-7xl mx-auto px-8 md:px-12 py-20">
        <div className="flex justify-between items-end mb-16">
          <div className="border-l-2 border-gold pl-6">
            <h3 className="font-headline text-3xl italic text-primary">Most people don&apos;t have a motivation problem.</h3>
            <p className="font-label text-xs uppercase tracking-widest text-secondary mt-2">
              They have a pattern problem. These are the patterns.
            </p>
          </div>
        </div>

        {allPosts.length === 0 ? (
          <p className="font-body text-base text-on-surface-variant italic">
            New posts landing soon. In the meantime — take the quiz.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {allPosts.map((post) => (
              <Link
                key={post.meta.slug}
                href={`/blog/${post.meta.slug}`}
                className="group flex flex-col border border-primary/10 hover:border-primary/30 transition-colors"
              >
                <div className="aspect-[4/5] relative overflow-hidden bg-surface-mid">
                  <Image
                    src={post.meta.image ?? '/images/boundary-quiz-hero.jpeg'}
                    alt={post.meta.imageAlt ?? post.meta.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <span className="font-label text-[10px] uppercase tracking-[0.3em] text-gold bg-primary/90 px-3 py-2">
                      {post.meta.tag}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-grow p-8">
                  <h4 className="font-headline text-2xl font-bold text-primary mb-4 leading-snug group-hover:text-secondary transition-colors">
                    {post.meta.title}
                  </h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6 flex-grow">
                    {post.meta.excerpt}
                  </p>
                  <div className="w-12 h-[1px] bg-gold/40 mb-4" />
                  <div className="flex items-center justify-between">
                    <span className="font-label text-[10px] uppercase tracking-widest text-secondary">
                      {post.meta.readTime}
                    </span>
                    <span className="font-label text-[10px] uppercase tracking-widest text-primary group-hover:text-gold transition-colors">
                      Read &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
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
