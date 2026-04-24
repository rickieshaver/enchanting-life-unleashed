import { render } from '@react-email/components'
import { createElement, type ComponentType } from 'react'
import { FROM, resend } from './client'

type ArchetypeKey = 'open-door' | 'cracked-window' | 'sacred-keeper'
type AreaKey = 'spellbreaker' | 'time-keeper' | 'sacred-vessel' | 'resource-guardian'

// Lazy-import templates to keep cold starts light.
const TEMPLATES = {
  'blueprint-delivery': () => import('@/app/emails/blueprint-delivery'),
  'pressure-moment': () => import('@/app/emails/pressure-moment'),
  'insight-vs-behavior': () => import('@/app/emails/insight-vs-behavior'),
  'sbs-intro': () => import('@/app/emails/sbs-intro'),
  'sbs-pitch': () => import('@/app/emails/sbs-pitch'),
  'soft-close': () => import('@/app/emails/soft-close'),
  'sbs-receipt': () => import('@/app/emails/sbs-receipt'),
  'newsletter-welcome': () => import('@/app/emails/newsletter/welcome'),
  'newsletter-insight': () => import('@/app/emails/newsletter/insight'),
  'newsletter-quiz-nudge': () => import('@/app/emails/newsletter/quiz-nudge'),
  'newsletter-lunar-rhythm': () => import('@/app/emails/newsletter/lunar-rhythm'),
  'newsletter-brand-story': () => import('@/app/emails/newsletter/brand-story'),
} as const

export type TemplateKey = keyof typeof TEMPLATES

export type SendProps = {
  to: string
  template: TemplateKey
  subject: string
  firstName: string
  archetype?: ArchetypeKey
  primaryArea?: AreaKey
  scheduledAt?: string
  amountPaidUsd?: string
  downloadUrl?: string
}

export async function sendEmail({
  to,
  template,
  subject,
  firstName,
  archetype,
  primaryArea,
  scheduledAt,
  amountPaidUsd,
  downloadUrl,
}: SendProps) {
  const mod = await TEMPLATES[template]()
  const Component = mod.default as ComponentType<Record<string, unknown>>

  const element = createElement(Component, {
    firstName,
    archetype,
    primaryArea,
    amountPaidUsd,
    downloadUrl,
  })
  const html = await render(element)
  const text = await render(element, { plainText: true })

  const { data, error } = await resend.emails.send({
    from: FROM,
    to,
    subject,
    html,
    text,
    ...(scheduledAt ? { scheduledAt } : {}),
  })

  if (error) {
    throw new Error(`Resend send failed for ${template}: ${error.message}`)
  }

  return data
}
