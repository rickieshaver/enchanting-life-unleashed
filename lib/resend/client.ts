import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set. Run `vercel env pull` to sync.')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM = 'Ren — Enchanting Life Unleashed <connect@enchantinglifeunleashed.com>'
export const SITE_URL = 'https://enchantinglifeunleashed.com'
