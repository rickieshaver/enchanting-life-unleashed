import { Text } from '@react-email/components'
import {
  ARCHETYPE_LABEL,
  BaseEmail,
  COLORS,
  CTA,
  Heading,
  Paragraph,
  Signature,
} from './_base'

export type SbsIntroProps = {
  firstName: string
  archetype: 'open-door' | 'cracked-window' | 'sacred-keeper'
}

export default function SbsIntro({ firstName = 'Friend', archetype = 'open-door' }: SbsIntroProps) {
  const archetypeLabel = ARCHETYPE_LABEL[archetype]

  return (
    <BaseEmail preview="This is where the pattern actually changes.">
      <Paragraph>{firstName} —</Paragraph>
      <Heading>This is where the pattern actually changes.</Heading>
      <Paragraph>Here&apos;s what I kept hitting when I worked on my own boundaries:</Paragraph>
      <Paragraph>
        Every self-help system I tried was built on insight. &ldquo;Notice your pattern. Name it.
        Set the intention.&rdquo;
      </Paragraph>
      <Paragraph>
        That&apos;s fine for the first week. By week two, the pattern was back. Because insight
        doesn&apos;t survive pressure.
      </Paragraph>
      <Paragraph>So I built something different.</Paragraph>
      <Paragraph>
        The <strong>Sacred Boundary System</strong> is a cycle-based practice. Eight lunar cycles.
        Six repeating stages per cycle. Structured daily work that puts the boundary rep into your
        actual life — not in your head.
      </Paragraph>

      <Text
        style={{
          fontSize: '15px',
          lineHeight: 1.8,
          color: COLORS.burgundy,
          margin: '0 0 20px',
        }}
      >
        <strong>New Moon:</strong> set the limit you&apos;re working with this cycle.
        <br />
        <strong>Waxing phase:</strong> practice holding it. In real situations. Under real pressure.
        <br />
        <strong>Full Moon:</strong> audit what held. Audit what cracked. No judgment, just data.
        <br />
        <strong>Waning phase:</strong> release the self-judgment around the cave. Reset for next
        cycle.
      </Text>

      <Paragraph>
        Cycle after cycle, the hold gets sturdier. The guilt gets quieter. The apology stops
        following the no.
      </Paragraph>
      <Paragraph>
        It&apos;s built for the <strong>{archetypeLabel}</strong> specifically. Archetype-specific
        prompts on every stage. Your pattern. Your work.
      </Paragraph>
      <Paragraph>It&apos;s $17. Instant download. You can start this cycle.</Paragraph>

      <CTA
        href="https://enchantinglifeunleashed.com/lunar-boundary-planner"
        label="Get The Sacred Boundary System"
      />

      <Signature />
    </BaseEmail>
  )
}
