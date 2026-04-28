import { BaseEmail, CTA, Heading, Paragraph, Signature } from './_base'

export type QsgDeliveryProps = {
  firstName: string
  downloadUrl: string
}

export default function QsgDelivery({
  firstName = 'Friend',
  downloadUrl = 'https://enchantinglifeunleashed.com/downloads/lunar-alignment-quick-start-guide.pdf',
}: QsgDeliveryProps) {
  return (
    <BaseEmail preview="Your Lunar Alignment Quick Start Guide is here.">
      <Paragraph>{firstName} —</Paragraph>
      <Heading>Your Lunar Alignment Quick Start Guide is here.</Heading>

      <Paragraph>
        Welcome to the Lunar Alignment System. The Quick Start Guide is Step One — orientation, not
        practice. Read it once, then come back to it when you forget which phase you&apos;re in.
      </Paragraph>

      <CTA href={downloadUrl} label="Download the Quick Start Guide" />

      <Paragraph>
        <strong>What&apos;s inside.</strong>
      </Paragraph>

      <Paragraph>
        Eight lunar phases. The Action framework — what each phase is actually for. A 28-day cycle
        map you can hold in one hand. Enough to start running a real cycle on the next new moon.
      </Paragraph>

      <Paragraph>
        <strong>Where this fits.</strong>
      </Paragraph>

      <Paragraph>
        The QSG is the model. The Starter Kit ($7) is your first real cycle — a 28-day workbook
        plus a reusable tracker, built so you actually finish it. The Planner ($27) is the
        year-deep version — twelve cycles, annual theme, quarterly reviews. Don&apos;t skip ahead.
        Read this first. Run one cycle. Then decide.
      </Paragraph>

      <Paragraph>
        Reply to this email anytime with questions or stuck-points. I read every one.
      </Paragraph>

      <Signature />
    </BaseEmail>
  )
}
