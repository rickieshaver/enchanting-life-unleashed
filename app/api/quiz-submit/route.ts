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

  // 1. Create / update contact in Resend with properties
  try {
    await resend.contacts.create({
      email,
      firstName,
      unsubscribed: false,
    })
  } catch (err) {
    // Resend returns a 409-style error if contact already exists — safe to ignore.
    const msg = err instanceof Error ? err.message : String(err)
    if (!msg.toLowerCase().includes('already exist')) {
      console.error('[quiz-submit] resend.contacts.create failed', err)
      // Don't block the drip on contact-create failure — contact may already exist.
    }
  }

  // 2. Fire Inngest event — kicks off the drip sequence
  try {
    await inngest.send({
      name: 'quiz.submitted',
      data: { firstName, email, archetype, primaryArea, resultKey, scores },
    })
  } catch (err) {
    console.error('[quiz-submit] inngest.send failed', err)
    return NextResponse.json(
      { ok: false, error: 'could not enqueue drip' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true })
}
