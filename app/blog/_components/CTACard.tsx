import Link from 'next/link'

type Variant = 'quiz' | 'sbs'

const COPY: Record<Variant, { kicker: string; title: string; body: string; ctaLabel: string; href: string }> = {
  quiz: {
    kicker: 'Start with the diagnosis',
    title: 'Find your boundary archetype.',
    body: 'Five minutes. Three archetypes. Four domains. You walk away knowing exactly where the pattern lives — and a personalized Blueprint + Domain Deep Dive land in your inbox immediately.',
    ctaLabel: 'Take the Boundary Quiz',
    href: '/boundary-archetype-quiz',
  },
  sbs: {
    kicker: 'Where the pattern actually changes',
    title: 'The Sacred Boundary System.',
    body: 'A repeatable, cycle-based practice for women who know what they need to do and still aren\'t doing it. Eight lunar cycles. Four domains. Three archetypes. Built to interrupt the pattern at the nervous system level — not through more awareness, but through daily structured practice tied to the lunar rhythm.',
    ctaLabel: 'See the Sacred Boundary System — $17',
    href: '/lunar-boundary-planner',
  },
}

export function CTACard({ variant }: { variant: Variant }) {
  const { kicker, title, body, ctaLabel, href } = COPY[variant]
  return (
    <aside className="my-16 border border-primary/20 bg-surface-low p-10 md:p-12 flex flex-col gap-6">
      <span className="font-label text-[10px] uppercase tracking-[0.32em] text-secondary">
        {kicker}
      </span>
      <h3 className="font-headline text-3xl md:text-4xl font-light text-primary leading-tight tracking-tight">
        {title}
      </h3>
      <div className="editorial-line" />
      <p className="font-body text-base text-on-surface-variant leading-relaxed">{body}</p>
      <div>
        <Link href={href} className="btn-primary">
          {ctaLabel}
        </Link>
      </div>
    </aside>
  )
}
