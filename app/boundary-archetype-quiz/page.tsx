import type { Metadata } from 'next'
import QuizClient from './QuizClient'

export const metadata: Metadata = {
  title: 'Boundary Archetype Quiz — Enchanting Life Unleashed',
  description:
    'Discover your boundary archetype — Open Door, Cracked Window, or Sacred Boundary Keeper — and finally understand why you keep over-giving, burning out, or shrinking back.',
}

export default function BoundaryArchetypeQuizPage() {
  return <QuizClient />
}
