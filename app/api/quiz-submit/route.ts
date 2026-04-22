import { NextResponse } from 'next/server'
import { inngest } from '@/lib/inngest/client'
import { resend } from '@/lib/resend/client'

export const runtime = 'nodejs'

type Body = {
  firstName: string
  email: string
  archetype: 'open-door' | 'cracked-window' | 'sacred-keeper'
  primaryArea: 'spellbreaker' | 'time-keeper' | 'sacred-vessel' | 'resource-guardian'
  resultKey: string
  scores: {
    archetype: Record<'open-door' | 'cracked-window' | 'sacred-keeper', number>
    area: Record<'spellbreaker' | 'time-keeper' | 'sacred-vessel' | 'resource-guardian', number>
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
    inngestKeyPresent: Boolean(process.env.INNGEST_EVENT_KEY),
  }

  // 1. Create / update contact in Resend with properties
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
    debug.resendStep = 'ok'
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    debug.resendStep = 'error'
    debug.resendError = msg
    // Resend returns an error if contact already exists — that's fine.
    if (!msg.toLowerCase().includes('already exist') && !msg.toLowerCase().includes('already been')) {
      console.error('[quiz-submit] resend.contacts.create failed', err)
      return NextResponse.json({ ok: false, error: `resend: ${msg}`, debug }, { status: 500 })
    }
  }

  // 2. Fire Inngest event — kicks off the drip sequence
  try {
    await inngest.send({
      name: 'quiz.submitted',
      data: { firstName, email, archetype, primaryArea, resultKey, scores },
    })
    debug.inngestStep = 'ok'
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    debug.inngestStep = 'error'
    debug.inngestError = msg
    console.error('[quiz-submit] inngest.send failed', err)
    return NextResponse.json({ ok: false, error: `inngest: ${msg}`, debug }, { status: 500 })
  }

  return NextResponse.json({ ok: true, debug })
}
