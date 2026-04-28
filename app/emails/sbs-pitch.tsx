import { Section, Text } from '@react-email/components'
import {
  ARCHETYPE_LABEL,
  BaseEmail,
  COLORS,
  CTA,
  FONTS,
  Heading,
  Paragraph,
  Signature,
} from './_base'

export type SbsPitchProps = {
  firstName: string
  archetype: 'open-door' | 'cracked-window' | 'sacred-keeper'
}

export default function SbsPitch({ firstName = 'Friend', archetype = 'open-door' }: SbsPitchProps) {
  const archetypeLabel = ARCHETYPE_LABEL[archetype]

  return (
    <BaseEmail preview="What $17 gets you.">
      <Paragraph>{firstName} —</Paragraph>
      <Heading>What $17 gets you.</Heading>
      <Paragraph>Straight answer on what&apos;s inside:</Paragraph>

      <Text
        style={{
          fontSize: '15px',
          lineHeight: 1.8,
          color: COLORS.burgundy,
          margin: '0 0 20px',
        }}
      >
        — <strong>45-page lunar-aligned workbook.</strong> Print it, fill it in, use it through 8
        cycles (about 8 months).
        <br />— <strong>Archetype-specific prompts</strong> on every page. Your work as a{' '}
        {archetypeLabel} is different from the other two. The system knows that.
        <br />— <strong>Four domain tracks</strong>: Spellbreaker (voice), Time Keeper (time),
        Sacred Vessel (energy), Resource Guardian (capacity).
        <br />— <strong>Six-stage cycle framework</strong>: Diagnosis, Intention, Application,
        Evaluation, Repair, Progression. Repeating. Compound.
        <br />— <strong>No dates pre-printed.</strong> Fill in moon phases as they arrive. Start
        any time. Start now.
      </Text>

      <Paragraph>It&apos;s not a planner. Planners are calendars with pretty covers.</Paragraph>
      <Paragraph>
        It&apos;s a <strong>practice system</strong>. Designed to rewire the moment after the no —
        in real life, repeatedly, until the new reflex wins.
      </Paragraph>
      <Paragraph>
        You&apos;ve already diagnosed the pattern. This is the execution layer.
      </Paragraph>
      <Paragraph>$17. Instant PDF download. Works on printed paper or on a tablet.</Paragraph>

      <CTA href="https://enchantinglifeunleashed.com/sacred-boundary-system" label="Get it here" />

      <Signature />

      <Section style={{ marginTop: '32px' }}>
        <Text
          style={{
            fontFamily: FONTS.display,
            fontStyle: 'italic',
            fontSize: '14px',
            lineHeight: 1.5,
            color: COLORS.dustyRose,
            margin: 0,
          }}
        >
          P.S. If you&apos;re not ready yet, no pressure. You&apos;re on my newsletter — I&apos;ll
          keep showing up with the work. One more email from me on this, then I shift gears.
        </Text>
      </Section>
    </BaseEmail>
  )
}
