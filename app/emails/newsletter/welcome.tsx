import { Text } from '@react-email/components'
import { BaseEmail, COLORS, CTA, Heading, Paragraph, Signature } from '../_base'

export default function NewsletterWelcome() {
  return (
    <BaseEmail preview="You're in. Here's what you just joined.">
      <Heading>Welcome in.</Heading>
      <Paragraph>You just joined a list that doesn&apos;t do cute.</Paragraph>

      <Paragraph>Here&apos;s what I send:</Paragraph>
      <Text
        style={{
          fontSize: '15px',
          lineHeight: 1.8,
          color: COLORS.burgundy,
          margin: '0 0 20px',
        }}
      >
        — Weekly intel on boundaries, work, and the lunar rhythm — the stuff that actually makes a
        difference, not the stuff that sounds like a meme.
        <br />
        — Occasional longer pieces when something needs more than a tweet&apos;s worth of thinking.
        <br />— Straight-talk about what I&apos;m building over here, why, and what it costs you
        (or doesn&apos;t).
      </Text>

      <Paragraph>Here&apos;s what I don&apos;t send:</Paragraph>
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
        <br />— More than one email a week unless something is actually happening.
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
        If you&apos;ve already taken it, ignore me. The next email lands in two days.
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
        P.S. If the first email in the next two weeks doesn&apos;t feel like it&apos;s for you,
        unsubscribe. Truly. My list is small on purpose.
      </Text>
    </BaseEmail>
  )
}
