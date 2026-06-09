import type { Metadata } from 'next'
import QuizClient from './QuizClient'

export const metadata: Metadata = {
  title: 'Boundary Archetype Quiz',
  description:
    'Find your boundary archetype — Open Door, Cracked Window, or Sacred Keeper — and why you keep over-giving, burning out, or shrinking back. Free, 5 minutes.',
  alternates: { canonical: '/boundary-archetype-quiz' },
  openGraph: {
    images: [{ url: 'https://enchantinglifeunleashed.com/images/boundary-quiz-hero.jpeg' }],
  },
}

const faqs = [
  {
    question: 'What is a boundary archetype?',
    answer:
      'A boundary archetype is the pattern your boundaries default to under pressure. There are three: the Open Door (you absorb everything), the Cracked Window (you leak — usually to the same people), and the Sacred Keeper (you hold the line, sometimes at a cost). The quiz identifies which one is running you.',
  },
  {
    question: 'How long does the quiz take?',
    answer:
      'About five minutes. Every question maps to a real scenario — no astrology-adjacent filler, no questions about your favorite color.',
  },
  {
    question: 'Is the quiz actually free?',
    answer:
      'Yes. No card, no mid-quiz upsell. You answer, you get your result, and your personalized Blueprint and Domain Deep Dive PDF land in your inbox.',
  },
  {
    question: 'What do I get with my result?',
    answer:
      'Your archetype, the life domain where your pattern leaks first, and a personalized Blueprint with archetype-specific practice — not generic advice about “just saying no.”',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

export default function BoundaryArchetypeQuizPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <QuizClient />
      {/* FAQ — visible content backing the FAQPage schema above */}
      <section className="bg-surface-low">
        <div className="max-w-3xl mx-auto px-8 md:px-12 py-20">
          <p className="eyebrow text-gold mb-4">Before You Start</p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-10">
            Questions, Answered
          </h2>
          <div className="flex flex-col gap-8">
            {faqs.map((f) => (
              <div key={f.question}>
                <h3 className="font-headline text-xl font-bold text-primary mb-2">{f.question}</h3>
                <p className="font-body text-sm leading-relaxed text-primary/70">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
