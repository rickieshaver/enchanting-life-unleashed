import { resend } from '@/lib/resend/client'

/**
 * Soft opt-in: attach a contact to the ELU Newsletter segment.
 *
 * Two-step pattern required by Resend v6 — contacts.create with inline segment
 * IDs is accepted but silently drops the attachment. The correct path is:
 *   contacts.create(...) → contacts.segments.add({ contactId|email, segmentId })
 *
 * This helper is non-throwing: a segment-attach failure is logged but swallowed
 * so the primary user flow (quiz result / QSG delivery) is never interrupted.
 *
 * @param contactId  The Resend contact ID returned by contacts.create (fresh
 *                   create). Pass null if the contact already existed — the
 *                   helper will fall back to matching by email.
 * @param email      Email address, used as fallback when contactId is null.
 * @param caller     Short label for log prefixing, e.g. '[quiz-submit]'.
 */
export async function attachToNewsletter(
  contactId: string | null,
  email: string,
  caller: string,
): Promise<void> {
  const segmentId = process.env.RESEND_NEWSLETTER_AUDIENCE_ID
  if (!segmentId) {
    // Env var missing — log and bail. Do NOT throw (non-fatal for callers).
    console.error(
      `${caller} attachToNewsletter: RESEND_NEWSLETTER_AUDIENCE_ID is not set — skipping segment attach`,
    )
    return
  }

  const addOptions = contactId ? { contactId, segmentId } : { email, segmentId }

  const segmentResult = await resend.contacts.segments.add(addOptions)
  if (segmentResult.error) {
    const msg = segmentResult.error.message ?? String(segmentResult.error)
    // Non-fatal: primary flow continues. Log so ops can triage.
    console.error(`${caller} contacts.segments.add failed`, segmentResult.error, { msg })
  }
}
