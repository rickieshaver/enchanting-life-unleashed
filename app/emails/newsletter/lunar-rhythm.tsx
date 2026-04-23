import { Text } from '@react-email/components'
import { BaseEmail, COLORS, Heading, Paragraph, Signature } from '../_base'

export default function NewsletterLunarRhythm() {
  return (
    <BaseEmail preview="The lunar rhythm you can actually use.">
      <Heading>The lunar rhythm you can actually use.</Heading>

      <Paragraph>
        I want to name something that might feel weird if you&apos;re here for the boundary work
        but got spooked by the word &ldquo;lunar.&rdquo;
      </Paragraph>

      <Paragraph>
        The moon isn&apos;t magic because it&apos;s mystical. It&apos;s a rhythm. A 28-day cycle
        with predictable phases that have been used as a time-keeping structure in every culture on
        the planet, long before anyone turned them into candle aesthetics.
      </Paragraph>

      <Paragraph>Here&apos;s how I actually use them:</Paragraph>

      <Text
        style={{
          fontSize: '15px',
          lineHeight: 1.8,
          color: COLORS.burgundy,
          margin: '0 0 20px',
        }}
      >
        — <strong>New moon</strong> — set one thing. Not a list. One.
        <br />
        — <strong>Waxing phase</strong> — build the reps. Show up daily toward that one thing.
        <br />
        — <strong>Full moon</strong> — honest audit. What held? What cracked?
        <br />
        — <strong>Waning phase</strong> — release what didn&apos;t serve, rest, renegotiate.
        <br />— Repeat.
      </Text>

      <Paragraph>
        That&apos;s the whole system. No altar required. No ritual robes. No specific crystals.
        Just a structure that gives a 28-day container to do something — instead of the
        infinite-scroll of &ldquo;I&apos;ll start Monday.&rdquo;
      </Paragraph>

      <Paragraph>Why I use it for boundary work specifically:</Paragraph>

      <Paragraph>
        Boundary patterns don&apos;t change in a weekend. They change through repetition under
        pressure, evaluated honestly, adjusted with data. The lunar cycle gives that process a
        shape. Four stages. Each one with a different job. Nothing you have to remember.
      </Paragraph>

      <Paragraph>
        The Sacred Boundary System — the thing I&apos;ll tell you more about next email — runs on
        this cycle. Eight of them. One for each domain, with room to double-back on the hardest
        ones.
      </Paragraph>

      <Paragraph>
        Not because the moon is mystical. Because a structure that repeats is how practice becomes
        identity.
      </Paragraph>

      <Paragraph>More on that next.</Paragraph>

      <Signature />
    </BaseEmail>
  )
}
