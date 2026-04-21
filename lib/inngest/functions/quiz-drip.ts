import { sendEmail } from '@/lib/resend/send'
import { inngest, type QuizSubmittedData } from '../client'

export const quizDrip = inngest.createFunction(
  {
    id: 'quiz-drip',
    name: 'Quiz → Blueprint Drip',
    triggers: [{ event: 'quiz.submitted' }],
  },
  async ({ event, step }) => {
    const { firstName, email, archetype, primaryArea } = event.data as QuizSubmittedData

    // Day 0 — Blueprint delivery (archetype-specific)
    await step.run('day-0-blueprint', async () => {
      await sendEmail({
        to: email,
        template: 'blueprint-delivery',
        subject: `Your Empowered Boundary Blueprint, ${firstName}.`,
        firstName,
        archetype,
        primaryArea,
      })
    })

    // Day 2 — Pressure moment
    await step.sleep('wait-until-day-2', '2d')
    await step.run('day-2-pressure', async () => {
      await sendEmail({
        to: email,
        template: 'pressure-moment',
        subject: 'The moment after the no.',
        firstName,
      })
    })

    // Day 5 — Insight vs behavior
    await step.sleep('wait-until-day-5', '3d')
    await step.run('day-5-insight', async () => {
      await sendEmail({
        to: email,
        template: 'insight-vs-behavior',
        subject: "You don't have a knowledge problem.",
        firstName,
      })
    })

    // Day 8 — SBS intro
    await step.sleep('wait-until-day-8', '3d')
    await step.run('day-8-sbs-intro', async () => {
      await sendEmail({
        to: email,
        template: 'sbs-intro',
        subject: 'This is where the pattern actually changes.',
        firstName,
        archetype,
      })
    })

    // Day 11 — SBS pitch
    await step.sleep('wait-until-day-11', '3d')
    await step.run('day-11-pitch', async () => {
      await sendEmail({
        to: email,
        template: 'sbs-pitch',
        subject: 'What $17 gets you.',
        firstName,
        archetype,
      })
    })

    // Day 14 — Soft close
    await step.sleep('wait-until-day-14', '3d')
    await step.run('day-14-close', async () => {
      await sendEmail({
        to: email,
        template: 'soft-close',
        subject: 'One more thing.',
        firstName,
      })
    })

    return { ok: true, email, archetype }
  }
)
