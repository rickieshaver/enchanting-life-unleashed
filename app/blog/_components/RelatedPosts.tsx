import Link from 'next/link'
import type { Post } from '../_lib/types'

export function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null
  return (
    <section className="bg-surface-low py-20 px-8 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="border-l-2 border-gold pl-6 mb-12">
          <p className="font-label text-[10px] uppercase tracking-[0.32em] text-secondary mb-2">
            Keep reading
          </p>
          <h3 className="font-headline text-2xl md:text-3xl text-primary leading-snug">
            More from the transmission.
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {posts.map((p) => (
            <Link
              key={p.meta.slug}
              href={`/blog/${p.meta.slug}`}
              className="group flex flex-col gap-4 border-t border-primary/15 pt-6"
            >
              <span className="font-label text-[10px] uppercase tracking-[0.32em] text-gold">
                {p.meta.tag}
              </span>
              <h4 className="font-headline text-xl md:text-2xl font-light text-primary leading-snug group-hover:text-secondary transition-colors">
                {p.meta.title}
              </h4>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                {p.meta.excerpt}
              </p>
              <span className="font-label text-xs text-secondary mt-auto">{p.meta.readTime}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
