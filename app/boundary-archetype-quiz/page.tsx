import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Boundary Archetype Quiz — Enchanting Life Unleashed',
  description:
    'Discover your boundary archetype — Open Door, Cracked Window, or Sacred Boundary Keeper — and finally understand why you keep over-giving, burning out, or shrinking back.',
}

const discoveries = [
  {
    title: 'Your Archetype',
    description:
      'Open Door, Cracked Window, or Sacred Boundary Keeper — discover which one is running your energy right now.',
  },
  {
    title: 'Your Strengths',
    description:
      'Every archetype has a superpower. Learn what yours is and how to lean into it instead of fighting against it.',
  },
  {
    title: 'Your Blueprint',
    description:
      'A personalized Empowered Boundary Blueprint tailored to your archetype — with scripts, strategies, and rituals.',
  },
]

export default function BoundaryArchetypeQuizPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-velvet py-24 md:py-32 px-8 md:px-12">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <div className="editorial-line" />
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-white leading-tight">
            What&apos;s Your Boundary Archetype?
          </h1>
          <p className="font-body text-xl text-white/80 leading-relaxed max-w-2xl">
            Discover whether you&apos;re an Open Door, Cracked Window, or Sacred Boundary Keeper —
            and finally understand why you keep over-giving, burning out, or shrinking back.
          </p>
          <p className="font-label text-xs uppercase tracking-widest text-gold">
            Five minutes &middot; Real answers &middot; Free
          </p>
        </div>
      </section>

      {/* WHAT YOU'LL DISCOVER */}
      <section className="py-24 md:py-32 px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="eyebrow font-bold mb-4">The Reveal</p>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
              What You&apos;ll Discover
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {discoveries.map((item, index) => (
              <div key={item.title} className="bg-surface-low p-10 flex flex-col gap-6">
                <span className="font-headline text-3xl text-gold">
                  0{index + 1}
                </span>
                <h3 className="font-headline text-2xl text-primary">{item.title}</h3>
                <p className="font-body text-sm text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPT-IN FORM */}
      <section className="bg-surface-low py-24 md:py-32 px-8 md:px-12">
        <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-8">
          <div className="editorial-line" />
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary leading-tight">
            Ready to find out?
          </h2>
          <p className="font-body text-base text-on-surface-variant leading-relaxed">
            Enter your name and email to start the quiz. Your results and personalized blueprint will
            be delivered to your inbox.
          </p>

          <form
            action="https://app.kit.com/forms/8924567/subscriptions"
            method="post"
            className="w-full flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2 text-left">
              <label className="font-label text-xs uppercase tracking-widest text-primary font-bold">
                First Name
              </label>
              <input
                type="text"
                name="fields[first_name]"
                placeholder="Your name"
                required
                className="w-full bg-transparent border-0 border-b border-gold px-0 py-3 text-lg font-body focus:outline-none focus:ring-0 focus:border-primary transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2 text-left">
              <label className="font-label text-xs uppercase tracking-widest text-primary font-bold">
                Email Address
              </label>
              <input
                type="email"
                name="email_address"
                placeholder="email@example.com"
                required
                className="w-full bg-transparent border-0 border-b border-gold px-0 py-3 text-lg font-body focus:outline-none focus:ring-0 focus:border-primary transition-colors"
              />
            </div>
            <button type="submit" className="btn-primary w-full text-center mt-4">
              Start the Quiz
            </button>
          </form>
          <p className="font-body text-xs text-on-surface-variant/60">
            No spam. Your privacy is sovereign.
          </p>
        </div>
      </section>
    </>
  )
}
