import { BaseEmail, CTA, Heading, Paragraph, Signature } from './_base'

export type PlannerReceiptProps = {
  firstName: string
  amountPaidUsd: string
  downloadUrl: string
}

export default function PlannerReceipt({
  firstName = 'Friend',
  amountPaidUsd = '27.00',
  downloadUrl = 'https://enchantinglifeunleashed.com/lunar-alignment-planner/access',
}: PlannerReceiptProps) {
  return (
    <BaseEmail preview="Your Lunar Alignment Planner is ready.">
      <Paragraph>{firstName} —</Paragraph>
      <Heading>Your Lunar Alignment Planner is ready.</Heading>

      <Paragraph>
        Thank you. Payment confirmed: <strong>${amountPaidUsd} USD</strong>.
      </Paragraph>

      <Paragraph>
        Twelve cycles of practice — built to use, not to admire. The Planner is waiting on your
        access page. Save this email — the link below brings you back anytime, so you can
        re-download as often as you need.
      </Paragraph>

      <CTA href={downloadUrl} label="Open your Planner access page" />

      <Paragraph>
        <strong>Quick orientation.</strong>
      </Paragraph>

      <Paragraph>
        The Planner is the third step in the Lunar Alignment System. Step One was orientation. Step
        Two was your first real cycle. This is the year-deep version — twelve cycles, undated, with
        annual theme + intentions, four quarterly review spreads, and a full year-end reflection.
      </Paragraph>

      <Paragraph>
        Open it once and write your theme word for the year. Then start Cycle 01 on the next new
        moon. The Planner is fillable, undated, and built to be lived in — not collected. One cycle
        at a time. Don&apos;t read ahead.
      </Paragraph>

      <Paragraph>
        Reply to this email anytime with questions or stuck-points. I read every one.
      </Paragraph>

      <Signature />
    </BaseEmail>
  )
}
