import { Text } from '@react-email/components'
import { BaseEmail, COLORS, Heading, Paragraph, Signature } from '../_base'

export default function NewsletterLunarRhythm() {
  return (
    <BaseEmail preview="The moon is not magic. It is a rhythm.">
      <Heading>The lunar rhythm you can actually use.</Heading>

      <Paragraph>
        I want to name something that might feel weird if you are here for the boundary work but
        got spooked by the word &ldquo;lunar.&rdquo;
      </Paragraph>

      <Paragraph>
        The moon is not magic because it is mystical. It is a rhythm. A 28-day cycle with
        predictable phases that have been used as a time-keeping structure in every culture on the
        planet, long before anyone turned them into candle aesthetics.
      </Paragraph>

      <Paragraph>Here is how I actually use them:</Paragraph>

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
        — <strong>Waxing phase.</strong> Build the reps. Show up daily toward that one thing.
        <br />
        — <strong>Full moon.</strong> Honest audit. What held? What cracked?
        <br />
        — <strong>Waning phase.</strong> Release what did not serve, rest, renegotiate.
        <br />— Repeat.
      </Text>

      <Paragraph>
        That is the whole system. No altar required. No ritual robes. No specific crystals. Just a
        structure that gives a 28-day container to do something, instead of the infinite-scroll of
        &ldquo;I will start Monday.&rdquo;
      </Paragraph>

      <Paragraph>Why this rhythm works for boundary work specifically:</Paragraph>

      <Paragraph>
        Boundary patterns do not change in a weekend. They change through repetition under pressure,
        evaluated honestly, adjusted with data. The lunar cycle gives that process a shape. Four
        stages. Each one with a different job. Nothing you have to remember.
      </Paragraph>

      <Paragraph>
        The Sacred Boundary System (the workbook that arrives in your inbox a couple of emails from
        now) runs on this cycle. Eight of them. One for each domain, with room to double-back on
        the hardest ones.
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
