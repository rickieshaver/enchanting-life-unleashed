'use client'

import { useState } from 'react'
import {
  questions,
  archetypes,
  areaLabels,
  areaDescriptions,
  calculateResult,
  type ArchetypeKey,
  type AreaKey,
  type QuizResult,
} from './quiz-data'

type Stage = 'intro' | 'questions' | 'email-gate' | 'submitting' | 'results'

const KIT_FORM_ID = '8924567'

async function submitToKit(
  firstName: string,
  email: string,
  result: QuizResult
): Promise<void> {
  const archetypeKey = result.archetype
  const primaryArea = result.primaryArea
  const resultKey = `${archetypeKey}--${primaryArea}`

  const params = new URLSearchParams({
    email_address: email,
    'fields[first_name]': firstName,
    'fields[bb_archetype]': archetypeKey,
    'fields[bb_primary_boundary_area]': primaryArea,
    'fields[bb_result_key]': resultKey,
    'fields[bb_source]': 'boundary-archetype-quiz',
    'fields[bb_timestamp]': new Date().toISOString(),
    'fields[bb_spellbreaker_score]': String(result.scores.area.spellbreaker),
    'fields[bb_time_keeper_score]': String(result.scores.area['time-keeper']),
    'fields[bb_sacred_vessel_score]': String(result.scores.area['sacred-vessel']),
    'fields[bb_resource_guardian_score]': String(result.scores.area['resource-guardian']),
  })

  await fetch(`https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
    mode: 'no-cors',
  })
}

export default function QuizClient() {
  const [stage, setStage] = useState<Stage>('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [result, setResult] = useState<QuizResult | null>(null)
  const [error, setError] = useState('')

  const question = questions[currentQuestion]
  const progress = (currentQuestion / questions.length) * 100

  function handleOptionSelect(index: number) {
    setSelectedOption(index)
  }

  function handleNext() {
    if (selectedOption === null) return
    const newAnswers = [...answers, selectedOption]
    setAnswers(newAnswers)
    setSelectedOption(null)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setStage('email-gate')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!firstName.trim() || !email.trim()) return

    setStage('submitting')
    const quizResult = calculateResult(answers)
    setResult(quizResult)

    try {
      await submitToKit(firstName.trim(), email.trim(), quizResult)
    } catch {
      // no-cors fetch always throws — result still goes through
    }

    setStage('results')
  }

  if (stage === 'intro') {
    return (
      <div className="min-h-screen bg-[#FFFCF7] flex flex-col items-center justify-center px-8 py-24">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-8">
          <p className="font-label text-xs uppercase tracking-widest text-[#EDB74D] font-bold">
            12 questions &middot; 5 minutes &middot; Real answers
          </p>
          <h1 className="font-headline text-5xl md:text-6xl font-bold text-[#6D2E46] leading-tight">
            What&apos;s Your Boundary Archetype?
          </h1>
          <p className="font-body text-lg text-[#A26769] leading-relaxed">
            Find out whether you&apos;re an Open Door, Cracked Window, or Sacred Keeper —
            and exactly which domain your pattern is costing you the most.
          </p>
          <button
            onClick={() => setStage('questions')}
            className="btn-primary px-12 py-4 text-base mt-4"
          >
            Take the Quiz
          </button>
          <p className="font-body text-xs text-[#A26769]/60">
            Your results + personalized Empowered Boundary Blueprint delivered to your inbox. Free.
          </p>
        </div>
      </div>
    )
  }

  if (stage === 'questions') {
    return (
      <div className="min-h-screen bg-[#FFFCF7] flex flex-col px-8 py-16 md:py-24">
        <div className="max-w-2xl mx-auto w-full flex flex-col gap-10">

          {/* Progress */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <p className="font-label text-xs uppercase tracking-widest text-[#A26769]">
                {areaLabels[question.area]}
              </p>
              <p className="font-label text-xs text-[#A26769]/60">
                {currentQuestion + 1} / {questions.length}
              </p>
            </div>
            <div className="w-full h-px bg-[#D5B9B2]">
              <div
                className="h-px bg-[#EDB74D] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-[#6D2E46] leading-snug">
            {question.text}
          </h2>

          {/* Options */}
          <div className="flex flex-col gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`text-left px-8 py-6 border transition-all duration-200 font-body text-base leading-relaxed ${
                  selectedOption === index
                    ? 'border-[#6D2E46] bg-[#6D2E46] text-white'
                    : 'border-[#D5B9B2] bg-white text-[#6D2E46] hover:border-[#6D2E46]'
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`btn-primary w-full text-center py-4 transition-opacity ${
              selectedOption === null ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
            }`}
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'See My Results'}
          </button>

          {currentQuestion > 0 && (
            <button
              onClick={() => {
                const newAnswers = answers.slice(0, -1)
                setAnswers(newAnswers)
                setCurrentQuestion(currentQuestion - 1)
                setSelectedOption(null)
              }}
              className="font-body text-sm text-[#A26769]/60 text-center hover:text-[#A26769] transition-colors"
            >
              Back
            </button>
          )}
        </div>
      </div>
    )
  }

  if (stage === 'email-gate') {
    return (
      <div className="min-h-screen bg-[#FFFCF7] flex flex-col items-center justify-center px-8 py-24">
        <div className="max-w-xl mx-auto w-full flex flex-col gap-8">
          <div className="text-center flex flex-col gap-4">
            <p className="font-label text-xs uppercase tracking-widest text-[#EDB74D] font-bold">
              Almost there
            </p>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-[#6D2E46] leading-tight">
              Where should we send your results?
            </h2>
            <p className="font-body text-base text-[#A26769] leading-relaxed">
              Your archetype reveal + your personalized Empowered Boundary Blueprint — delivered to your inbox instantly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-label text-xs uppercase tracking-widest text-[#6D2E46] font-bold">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Your name"
                required
                className="w-full bg-transparent border-0 border-b border-[#EDB74D] px-0 py-3 text-lg font-body text-[#6D2E46] focus:outline-none focus:ring-0 focus:border-[#6D2E46] transition-colors placeholder:text-[#A26769]/40"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label text-xs uppercase tracking-widest text-[#6D2E46] font-bold">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                className="w-full bg-transparent border-0 border-b border-[#EDB74D] px-0 py-3 text-lg font-body text-[#6D2E46] focus:outline-none focus:ring-0 focus:border-[#6D2E46] transition-colors placeholder:text-[#A26769]/40"
              />
            </div>

            {error && (
              <p className="font-body text-sm text-red-600">{error}</p>
            )}

            <button type="submit" className="btn-primary w-full text-center py-4 mt-2">
              Reveal My Archetype
            </button>
          </form>

          <p className="font-body text-xs text-[#A26769]/60 text-center">
            No spam. Your privacy is sovereign.
          </p>
        </div>
      </div>
    )
  }

  if (stage === 'submitting') {
    return (
      <div className="min-h-screen bg-[#FFFCF7] flex items-center justify-center px-8">
        <div className="text-center flex flex-col gap-4">
          <div className="w-12 h-12 border-2 border-[#EDB74D] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-body text-base text-[#A26769]">Revealing your archetype...</p>
        </div>
      </div>
    )
  }

  if (stage === 'results' && result) {
    const archetype = archetypes[result.archetype]
    const area = areaDescriptions[result.primaryArea]
    const areaLabel = areaLabels[result.primaryArea]

    const archetypeDisplayNames: Record<ArchetypeKey, string> = {
      'open-door': 'Open Door',
      'cracked-window': 'Cracked Window',
      'sacred-keeper': 'Sacred Keeper',
    }

    return (
      <div className="bg-[#FFFCF7]">
        {/* Result hero */}
        <section className="bg-[#6D2E46] py-24 md:py-32 px-8">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
            <p className="font-label text-xs uppercase tracking-widest text-[#EDB74D] font-bold">
              Your Result
            </p>
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-white leading-tight">
              You are a {archetypeDisplayNames[result.archetype]}<br />
              <span className="text-[#EDB74D]">in your {areaLabel}.</span>
            </h1>
            <div className="w-12 h-px bg-[#EDB74D] mt-2" />
            <p className="font-body text-lg text-white/70 italic leading-relaxed max-w-xl">
              &ldquo;{archetype.tagline}&rdquo;
            </p>
          </div>
        </section>

        {/* Pattern breakdown */}
        <section className="py-20 md:py-28 px-8">
          <div className="max-w-3xl mx-auto flex flex-col gap-12">

            {/* Archetype description */}
            <div className="flex flex-col gap-6">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-[#6D2E46]">
                This is your pattern.
              </h2>
              <p className="font-body text-lg text-[#6D2E46]/80 leading-relaxed">
                {archetype.description}
              </p>
            </div>

            {/* Superpower / Challenge */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#D5B9B2]/20 p-8 flex flex-col gap-4">
                <p className="font-label text-xs uppercase tracking-widest text-[#EDB74D] font-bold">
                  What You Have
                </p>
                <p className="font-body text-base text-[#6D2E46] leading-relaxed">
                  {archetype.superpower}
                </p>
              </div>
              <div className="bg-[#D5B9B2]/20 p-8 flex flex-col gap-4">
                <p className="font-label text-xs uppercase tracking-widest text-[#EDB74D] font-bold">
                  Where It Breaks
                </p>
                <p className="font-body text-base text-[#6D2E46] leading-relaxed">
                  {archetype.challenge}
                </p>
              </div>
            </div>

            {/* Primary domain */}
            <div className="border-l-2 border-[#EDB74D] pl-8 flex flex-col gap-4">
              <p className="font-label text-xs uppercase tracking-widest text-[#A26769] font-bold">
                This Is Where It Shows Up Most
              </p>
              <p className="font-headline text-2xl font-bold text-[#6D2E46]">
                {areaLabel}
              </p>
              <p className="font-body text-base text-[#6D2E46]/80 leading-relaxed">
                {area.what}
              </p>
              <p className="font-body text-base text-[#6D2E46]/70 leading-relaxed">
                {area.where}
              </p>
            </div>
          </div>
        </section>

        {/* Blueprint bridge */}
        <section className="bg-[#6D2E46] py-20 md:py-28 px-8">
          <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
            <p className="font-label text-xs uppercase tracking-widest text-[#EDB74D] font-bold">
              What&apos;s Next
            </p>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-white leading-tight">
              Your Blueprint is on its way.
            </h2>
            <p className="font-body text-base text-white/70 leading-relaxed max-w-xl">
              Check your inbox — your personalized{' '}
              <span className="font-bold text-white">Empowered Boundary Blueprint for the {archetypeDisplayNames[result.archetype]}</span>{' '}
              is heading there now. It maps exactly how your pattern breaks in your{' '}
              <span className="font-bold text-[#EDB74D]">{areaLabel}</span> domain — and gives you the scripts,
              warning signs, and one-line standard to start changing it today.
            </p>
            <div className="bg-white/10 border border-white/20 px-8 py-5 max-w-lg w-full text-left">
              <p className="font-body text-sm text-white/80 leading-relaxed">
                <strong className="text-white">The Blueprint tells you what&apos;s happening.</strong><br />
                The Sacred Boundary System is where you change it — a structured, cycle-based practice that interrupts your specific pattern in real time, not just the days you remember to try.
              </p>
            </div>
            <p className="font-body text-xs text-white/40">
              Don&apos;t see the email? Check your spam and add connect@enchantinglifeunleashed.com to your contacts.
            </p>
          </div>
        </section>

        {/* System upsell */}
        <section className="py-20 md:py-28 px-8">
          <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-8">
            <p className="font-label text-xs uppercase tracking-widest text-[#EDB74D] font-bold">
              The Execution Layer
            </p>
            <h2 className="font-headline text-4xl font-bold text-[#6D2E46] leading-tight">
              Ready to actually change it?
            </h2>
            <p className="font-body text-base text-[#A26769] leading-relaxed max-w-xl">
              The Sacred Boundary System is where the Blueprint becomes behavior. 8 repeatable lunar cycles,
              4 domains, archetype-specific prompts — built to interrupt your{' '}
              <strong className="text-[#6D2E46]">{archetypeDisplayNames[result.archetype]}</strong>{' '}
              pattern in your{' '}
              <strong className="text-[#6D2E46]">{areaLabel}</strong>{' '}
              domain, in real time, until the new response is the automatic one.
            </p>
            <a href="/lunar-boundary-planner" className="btn-primary px-12 py-4 text-base">
              Get The Sacred Boundary System &rarr;
            </a>
            <p className="font-body text-xs text-[#A26769]/60">$17 &middot; Instant download &middot; Use it this lunar cycle</p>
          </div>
        </section>
      </div>
    )
  }

  return null
}
