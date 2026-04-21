import { Inngest } from 'inngest'

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
