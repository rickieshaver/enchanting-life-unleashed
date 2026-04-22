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
  // Sends are sequential to stay under Resend's per-second rate limit.
  const now = Date.now()
  const at = (days: number) => new Date(now + days * DAY_MS).toISOString()

  const dripSteps = [
    {
      label: 'day-0',
      props: {
        to: email,
        template: 'blueprint-delivery' as const,
        subject: `Your Empowered Boundary Blueprint, ${firstName}.`,
        firstName,
        archetype,
        primaryArea,
      },
    },
    {
      label: 'day-2',
      props: {
        to: email,
        template: 'pressure-moment' as const,
        subject: 'The moment after the no.',
        firstName,
        scheduledAt: at(2),
      },
    },
    {
      label: 'day-5',
      props: {
        to: email,
        template: 'insight-vs-behavior' as const,
        subject: "You don't have a knowledge problem.",
        firstName,
        scheduledAt: at(5),
      },
    },
    {
      label: 'day-8',
      props: {
        to: email,
        template: 'sbs-intro' as const,
        subject: 'This is where the pattern actually changes.',
        firstName,
        archetype,
        scheduledAt: at(8),
      },
    },
    {
      label: 'day-11',
      props: {
        to: email,
        template: 'sbs-pitch' as const,
        subject: 'What $17 gets you.',
        firstName,
        archetype,
        scheduledAt: at(11),
      },
    },
    {
      label: 'day-14',
      props: {
        to: email,
        template: 'soft-close' as const,
        subject: 'One more thing.',
        firstName,
        scheduledAt: at(14),
      },
    },
  ]

  const failures: Array<{ step: string; error: string }> = []
  for (const [i, step] of dripSteps.entries()) {
    try {
      await sendEmail(step.props)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      failures.push({ step: step.label, error: msg })
      // Day 0 is the user-facing send — if it fails, surface a 500 immediately.
      if (i === 0) {
        console.error('[quiz-submit] day-0 send failed', err)
        debug.emailStep = 'day-0-failed'
        debug.failures = failures
        return NextResponse.json({ ok: false, error: `email: ${msg}`, debug }, { status: 500 })
      }
      console.error(`[quiz-submit] ${step.label} scheduling failed`, err)
    }
  }

  debug.emailStep = failures.length === 0 ? 'ok' : 'partial'
  if (failures.length > 0) debug.failures = failures

  return NextResponse.json({ ok: true, debug })
}
