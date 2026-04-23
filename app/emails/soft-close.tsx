import { BaseEmail, CTA, Heading, Paragraph, Signature } from './_base'

export type SoftCloseProps = {
  firstName: string
}

export default function SoftClose({ firstName = 'Friend' }: SoftCloseProps) {
  return (
    <BaseEmail preview="One more thing.">
      <Paragraph>{firstName} —</Paragraph>
      <Heading>One more thing.</Heading>
      <Paragraph>Last note on this before I let it go.</Paragraph>
      <Paragraph>
        The Blueprint told you what&apos;s happening. I&apos;ve shown you the system that changes
        it.
      </Paragraph>
      <Paragraph>
        If it&apos;s a yes — you know where to go. <strong>Sacred Boundary System, $17.</strong>
      </Paragraph>

      <CTA href="https://enchantinglifeunleashed.com/lunar-boundary-planner" label="Get it here" />

      <Paragraph>
        If it&apos;s a not yet — stay on my newsletter. Three notes a week from me. Boundaries,
        sovereignty, the work of building a life that doesn&apos;t leak. No pitch every time. No
        pressure.
      </Paragraph>
      <Paragraph>Either way — you&apos;re seen.</Paragraph>
      <Paragraph>
        The pattern didn&apos;t survive this long because it&apos;s broken. It survived because it
        kept you safe once. What you&apos;re doing now is deciding you don&apos;t need it anymore.
      </Paragraph>
      <Paragraph>That decision is sovereign work. I respect it either way.</Paragraph>

      <Signature />
    </BaseEmail>
  )
}
