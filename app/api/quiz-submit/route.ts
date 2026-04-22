import { NextResponse } from 'next/server'
import { resend } from '@/lib/resend/client'
import { sendEmail } from '@/lib/resend/send'

export const runtime = 'nodejs'

type ArchetypeKey = 'open-door' | 'cracked-window' | 'sacred-keeper'
type AreaKey = 'spellbreaker' | 'time-keeper' | 'sacred-vessel' | 'resource-guardian'

type Body = {
  firstName: string
  email: string
  archetype: ArchetypeKey
  primaryArea: AreaKey
  resultKey: string
  scores: {
    archetype: Record<ArchetypeKey, number>
    area: Record<AreaKey, number>
  }
}

function isValidBody(b: unknown): b is Body {
  if (!b || typeof b !== 'object') return false
  const o = b as Record<string, unknown>
  return (
    typeof o.firstName === 'string' &&
    typeof o.email === 'string' &&
    typeof o.archetype === 'string' &&
    typeof o.primaryArea === 'string' &&
    typeof o.resultKey === 'string' &&
    typeof o.scores === 'object'
  )
}

const DAY_MS = 24 * 60 * 60 * 1000

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid JSON' }, { status: 400 })
  }

  if (!isValidBody(body)) {
    return NextResponse.json({ ok: false, error: 'invalid payload' }, { status: 400 })
  }

  const { firstName, email, archetype, primaryArea, resultKey, scores } = body

  const debug: Record<string, unknown> = {
    resendKeyPresent: Boolean(process.env.RESEND_API_KEY),
  }

  // 1. Create / update contact in Resend with quiz properties
  try {
    await resend.contacts.create({
      email,
      firstName,
      unsubscribed: false,
      properties: {
        archetype,
        primary_boundary_area: primaryArea,
        result_key: resultKey,
        spellbreaker_score: scores.area.spellbreaker,
        time_keeper_score: scores.area['time-keeper'],
        sacred_vessel_score: scores.area['sacred-vessel'],
        resource_guardian_score: scores.area['resource-guardian'],
        source: 'boundary-archetype-quiz',
      },
    })
    debug.contactStep = 'ok'
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    debug.contactStep = 'error'
    debug.contactError = msg
    if (!msg.toLowerCase().includes('already exist') && !msg.toLowerCase().includes('already been')) {
      console.error('[quiz-submit] resend.contacts.create failed', err)
      return NextResponse.json({ ok: false, error: `contact: ${msg}`, debug }, { status: 500 })
    }
  }

  // 2. Fire the 6-email drip — Day 0 immediate, rest scheduled via Resend.
  const now = Date.now()
  const at = (days: number) => new Date(now + days * DAY_MS).toISOString()

  const sends = [
    sendEmail({
      to: email,
      template: 'blueprint-delivery',
      subject: `Your Empowered Boundary Blueprint, ${firstName}.`,
      firstName,
      archetype,
      primaryArea,
    }),
    sendEmail({
      to: email,
      template: 'pressure-moment',
      subject: 'The moment after the no.',
      firstName,
      scheduledAt: at(2),
    }),
    sendEmail({
      to: email,
      template: 'insight-vs-behavior',
      subject: "You don't have a knowledge problem.",
      firstName,
      scheduledAt: at(5),
    }),
    sendEmail({
      to: email,
      template: 'sbs-intro',
      subject: 'This is where the pattern actually changes.',
      firstName,
      archetype,
      scheduledAt: at(8),
    }),
    sendEmail({
      to: email,
      template: 'sbs-pitch',
      subject: 'What $17 gets you.',
      firstName,
      archetype,
      scheduledAt: at(11),
    }),
    sendEmail({
      to: email,
      template: 'soft-close',
      subject: 'One more thing.',
      firstName,
      scheduledAt: at(14),
    }),
  ]

  const results = await Promise.allSettled(sends)
  const labels = ['day-0', 'day-2', 'day-5', 'day-8', 'day-11', 'day-14']

  const failures = results
    .map((r, i) => ({ r, label: labels[i] }))
    .filter(({ r }) => r.status === 'rejected')
    .map(({ r, label }) => {
      const reason = (r as PromiseRejectedResult).reason
      return { step: label, error: reason instanceof Error ? reason.message : String(reason) }
    })

  if (failures.length > 0) {
    console.error('[quiz-submit] drip sends partially failed', failures)
    debug.emailStep = failures.length === results.length ? 'all-failed' : 'partial'
    debug.failures = failures
  } else {
    debug.emailStep = 'ok'
  }

  // Day 0 send is the user-facing one — if it failed, surface a 500 so the UI can retry.
  if (results[0].status === 'rejected') {
    const reason = (results[0] as PromiseRejectedResult).reason
    const msg = reason instanceof Error ? reason.message : String(reason)
    return NextResponse.json({ ok: false, error: `email: ${msg}`, debug }, { status: 500 })
  }

  return NextResponse.json({ ok: true, debug })
}
