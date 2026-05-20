import { Text } from '@react-email/components'
import { BaseEmail, COLORS, CTA, Heading, Paragraph, Signature } from '../_base'

export default function NewsletterWelcome() {
  return (
    <BaseEmail preview="You're in. Here's what just landed in your inbox.">
      <Heading>Welcome in.</Heading>
      <Paragraph>You just joined a list that does not do cute.</Paragraph>

      <Paragraph>Here is what lands in your inbox:</Paragraph>
      <Text
        style={{
          fontSize: '15px',
          lineHeight: 1.8,
          color: COLORS.burgundy,
          margin: '0 0 20px',
        }}
      >
        — Twice a week. A short field note on Wednesday recapping what published on the blog. A
        longer essay on Sunday on something I have been turning over in my own practice.
        <br />
        — The work itself. Boundaries. The lunar rhythm as a real container, not a candle aesthetic.
        The way old reflexes keep firing even after you have read every book.
        <br />— Occasional notes on what is live over here — the workbook, the planner, the next
        thing — when it is actually ready and not before.
      </Text>

      <Paragraph>Here is what does not:</Paragraph>
      <Text
        style={{
          fontSize: '15px',
          lineHeight: 1.8,
          color: COLORS.burgundy,
          margin: '0 0 20px',
        }}
      >
        — Hype.
        <br />
        — Affirmation content that dodges the hard part.
        <br />
        — &ldquo;Signs the universe is testing you&rdquo; posts.
        <br />— More than two emails a week unless something is actually happening.
      </Text>

      <Paragraph>One thing before you close this tab.</Paragraph>
      <Paragraph>
        If you want to know — specifically — where your boundaries are leaking right now, take the
        quiz. Five minutes. Real answers. You walk away knowing your archetype (how you react under
        pressure) and your primary domain (which area of your life is bleeding hardest). Free. No
        upsell in the quiz itself.
      </Paragraph>

      <CTA
        href="https://enchantinglifeunleashed.com/boundary-archetype-quiz"
        label="Take the Boundary Archetype Quiz"
      />

      <Paragraph>
        If you have already taken it, ignore me. The next email lands in two days.
      </Paragraph>

      <Signature />

      <Text
        style={{
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          fontSize: '14px',
          lineHeight: 1.5,
          color: COLORS.dustyRose,
          margin: '20px 0 0',
        }}
      >
        P.S. If the first email in the next two weeks does not feel like it is for you, unsubscribe.
        Truly. This list is small on purpose.
      </Text>
    </BaseEmail>
  )
}
