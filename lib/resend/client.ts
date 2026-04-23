import { Resend } from 'resend'

// Lazy: module load must not throw during build-time page collection.
// The real env-var check runs at send time, inside sendEmail().
let _client: Resend | null = null

export function getResend(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set. Check Vercel env vars or run `vercel env pull`.')
  }
  if (!_client) {
    _client = new Resend(process.env.RESEND_API_KEY)
  }
  return _client
}

// Eager export kept for callers that don't hit send paths (avoid breaking imports).
// The lazy getter above is the recommended way to access Resend.
export const resend = new Proxy({} as Resend, {
  get(_target, prop: string | symbol) {
    const client = getResend()
    const value = (client as unknown as Record<string | symbol, unknown>)[prop]
    if (typeof value === 'function') return (value as (...a: unknown[]) => unknown).bind(client)
    return value
  },
})

export const FROM = 'Ren — Enchanting Life Unleashed <connect@enchantinglifeunleashed.com>'
export const SITE_URL = 'https://enchantinglifeunleashed.com'
