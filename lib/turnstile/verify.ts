/**
 * Cloudflare Turnstile server-side token verification.
 *
 * Docs: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 *
 * Required env var: TURNSTILE_SECRET_KEY
 * Test always-passes secret: 1x0000000000000000000000000000000AA
 * Test always-blocks secret:  2x0000000000000000000000000000000AA
 */

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

type SiteverifyResponse = {
  success: boolean
  'error-codes'?: string[]
  challenge_ts?: string
  hostname?: string
}

/**
 * Verifies a Turnstile challenge token.
 *
 * Returns `{ success: true }` when Cloudflare confirms the token is valid.
 * Returns `{ success: false, errorCodes }` on any failure — network errors
 * are treated as failures to prevent bypass via transport disruption.
 */
export async function verifyTurnstileToken(token: string): Promise<
  | { success: true }
  | { success: false; errorCodes: string[] }
> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.error('[turnstile] TURNSTILE_SECRET_KEY env var not set')
    return { success: false, errorCodes: ['missing-secret'] }
  }

  let data: SiteverifyResponse
  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }).toString(),
    })
    data = (await res.json()) as SiteverifyResponse
  } catch (err) {
    console.error('[turnstile] siteverify network error', err)
    return { success: false, errorCodes: ['network-error'] }
  }

  if (data.success) {
    return { success: true }
  }

  return { success: false, errorCodes: data['error-codes'] ?? ['unknown'] }
}
