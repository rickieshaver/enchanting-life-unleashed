import { BaseEmail, CTA, Heading, Paragraph, Signature } from './_base'

export type SbsReceiptProps = {
  firstName: string
  amountPaidUsd: string
  downloadUrl: string
}

export default function SbsReceipt({
  firstName = 'Friend',
  amountPaidUsd = '17.00',
  downloadUrl = 'https://enchantinglifeunleashed.com/downloads/sacred-boundary-system.pdf',
}: SbsReceiptProps) {
  return (
    <BaseEmail preview="Your Sacred Boundary System is ready.">
      <Paragraph>{firstName} —</Paragraph>
      <Heading>Your Sacred Boundary System is ready.</Heading>

      <Paragraph>
        Thank you. Payment confirmed: <strong>${amountPaidUsd} USD</strong>.
      </Paragraph>

      <Paragraph>
        Your workbook is linked below. Save this email — the download link is yours to keep and
        re-access anytime.
      </Paragraph>

      <CTA href={downloadUrl} label="Download your Sacred Boundary System" />

      <Paragraph>
        <strong>Quick orientation.</strong>
      </Paragraph>

      <Paragraph>
        The Sacred Boundary System isn&apos;t a read-and-close PDF. It&apos;s a practice workbook —
        structured around the lunar cycle (28 days per cycle, eight cycles total) to give you a
        container for actually changing the pattern instead of reading about it one more time.
      </Paragraph>

      <Paragraph>
        Read through it once this week. Then on the next new moon, begin cycle one.{' '}
        <strong>One domain. One practice. For 28 days. Don&apos;t stack.</strong>
      </Paragraph>

      <Paragraph>
        The system works through repetition, not intensity. You&apos;re not behind. Start at the
        next new moon and the calendar meets you where you are.
      </Paragraph>

      <Paragraph>
        If you haven&apos;t taken the Boundary Archetype Quiz yet, take it before you start cycle
        one. Your practice gets significantly sharper when you know your archetype and your primary
        leak domain.
      </Paragraph>

      <CTA
        href="https://enchantinglifeunleashed.com/boundary-archetype-quiz"
        label="Take the Boundary Archetype Quiz"
      />

      <Paragraph>
        Reply to this email anytime with questions or stuck-points. I read every one.
      </Paragraph>

      <Signature />
    </BaseEmail>
  )
}
