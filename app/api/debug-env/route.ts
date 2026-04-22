import { NextResponse } from 'next/server'

// Temporary debug endpoint — reveals env var presence (NOT values).
// Remove after the funnel is verified working.
export const runtime = 'nodejs'

export async function GET() {
  return NextResponse.json({
    RESEND_API_KEY: Boolean(process.env.RESEND_API_KEY),
    INNGEST_EVENT_KEY: Boolean(process.env.INNGEST_EVENT_KEY),
    INNGEST_SIGNING_KEY: Boolean(process.env.INNGEST_SIGNING_KEY),
    ELU_INNGEST_EVENT_KEY: Boolean(process.env.ELU_INNGEST_EVENT_KEY),
    ELU_INNGEST_SIGNING_KEY: Boolean(process.env.ELU_INNGEST_SIGNING_KEY),
    VERCEL_ENV: process.env.VERCEL_ENV || null,
    NODE_ENV: process.env.NODE_ENV || null,
  })
}
