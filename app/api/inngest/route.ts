import { serve } from 'inngest/next'
import { inngest } from '@/lib/inngest/client'
import { quizDrip } from '@/lib/inngest/functions/quiz-drip'

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [quizDrip],
})
