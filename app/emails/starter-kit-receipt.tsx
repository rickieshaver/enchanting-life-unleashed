import { BaseEmail, CTA, Heading, Paragraph, Signature } from './_base'

export type StarterKitReceiptProps = {
  firstName: string
  amountPaidUsd: string
  downloadUrl: string
}

export default function StarterKitReceipt({
  firstName = 'Friend',
  amountPaidUsd = '7.00',
  downloadUrl = 'https://enchantinglifeunleashed.com/lunar-alignment-starter-kit/access',
}: StarterKitReceiptProps) {
  return (
    <BaseEmail preview="Your Lunar Alignment Starter Kit is ready.">
      <Paragraph>{firstName} —</Paragraph>
      <Heading>Your Lunar Alignment Starter Kit is ready.</Heading>

      <Paragraph>
        Thank you. Payment confirmed: <strong>${amountPaidUsd} USD</strong>.
      </Paragraph>

      <Paragraph>
        Two files are waiting for you on your access page — the 28-day workbook and the reusable
        one-page tracker. Save this email — the link below brings you back to the access page
        anytime, so you can re-download as often as you need.
      </Paragraph>

      <CTA href={downloadUrl} label="Open your Starter Kit access page" />

      <Paragraph>
        <strong>Quick orientation.</strong>
      </Paragraph>

      <Paragraph>
        The Starter Kit is the second step in the Lunar Alignment System. Step One was the Quick
        Start Guide — orientation. This is practice. The workbook isn&apos;t a read-and-close PDF;
        it&apos;s a fillable spread for every phase of the cycle. You open it on Day 1 and close it
        on Day 28.
      </Paragraph>

      <Paragraph>
        Print the tracker. Stick it on your fridge or in your planner. After two or three cycles,
        the tracker is what you&apos;ll reach for — the workbook is the depth-pass for cycles when
        you need it.
      </Paragraph>

      <Paragraph>
        Open the workbook on the next new moon. Write your one commitment for the cycle.{' '}
        <strong>Twenty-eight days. One phase at a time. Don&apos;t read ahead.</strong>
      </Paragraph>

      <Paragraph>
        Reply to this email anytime with questions or stuck-points. I read every one.
      </Paragraph>

      <Signature />
    </BaseEmail>
  )
}
