import Image from 'next/image'
import type { PostMeta } from '../_lib/types'

export function PostHero({ meta }: { meta: PostMeta }) {
  return (
    <header className="bg-surface-low">
      {meta.image && (
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-surface-mid">
          <Image
            src={meta.image}
            alt={meta.imageAlt ?? meta.title}
            fill
            sizes="100vw"
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-surface-low/40" />
        </div>
      )}
      <div className="py-16 md:py-20 px-8 md:px-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <span className="font-label text-[10px] uppercase tracking-[0.32em] text-gold">
            {meta.tag}
          </span>
          <h1 className="font-headline text-4xl md:text-6xl font-light text-primary leading-[1.05] tracking-tight">
            {meta.title}
          </h1>
          <div className="editorial-line" />
          <div className="flex items-center gap-6 text-sm text-secondary font-body">
            <span>By Ren</span>
            <span aria-hidden="true">·</span>
            <time dateTime={meta.publishedAt}>
              {new Date(meta.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span aria-hidden="true">·</span>
            <span>{meta.readTime}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
