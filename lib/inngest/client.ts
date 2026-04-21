import { Inngest } from 'inngest'

// Vercel Marketplace install prefixes Inngest env vars with ELU_.
// Bridge them to the standard names so the Inngest SDK + serve handler
// pick them up through default lookups.
if (process.env.ELU_INNGEST_EVENT_KEY && !process.env.INNGEST_EVENT_KEY) {
  process.env.INNGEST_EVENT_KEY = process.env.ELU_INNGEST_EVENT_KEY
}
if (process.env.ELU_INNGEST_SIGNING_KEY && !process.env.INNGEST_SIGNING_KEY) {
  process.env.INNGEST_SIGNING_KEY = process.env.ELU_INNGEST_SIGNING_KEY
}

export type QuizSubmittedData = {
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

export const inngest = new Inngest({ id: 'enchanting-life-unleashed' })
