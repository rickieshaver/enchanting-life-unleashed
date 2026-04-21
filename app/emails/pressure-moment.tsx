import { Text } from '@react-email/components'
import { BaseEmail, COLORS, Heading, Paragraph, Signature } from './_base'

export type PressureMomentProps = {
  firstName: string
}

export default function PressureMoment({ firstName = 'Friend' }: PressureMomentProps) {
  return (
    <BaseEmail preview="The moment after the no.">
      <Paragraph>{firstName} —</Paragraph>
      <Heading>The moment after the no.</Heading>
      <Paragraph>
        The Blueprint told you your pattern. It didn&apos;t tell you where the pattern actually
        lives.
      </Paragraph>
      <Paragraph>Your pattern doesn&apos;t live in the moment you set the boundary.</Paragraph>
      <Paragraph>
        <strong>It lives in the 30 seconds after.</strong>
      </Paragraph>
      <Paragraph>The 30 seconds where:</Paragraph>

      <Text
        style={{
          fontSize: '15px',
          lineHeight: 1.8,
          color: COLORS.burgundy,
          margin: '0 0 20px',
        }}
      >
        — Someone pushes back
        <br />
        — Their face drops
        <br />
        — The silence gets uncomfortable
        <br />— The guilt fires before the words even leave your mouth
      </Text>

      <Paragraph>
        That 30-second window is where every boundary you&apos;ve ever set goes to die.
      </Paragraph>
      <Paragraph>
        Not because you weren&apos;t clear. Not because the limit was wrong. Because you don&apos;t
        have a rehearsed response for what happens <em>in that window.</em>
      </Paragraph>
      <Paragraph>Willpower doesn&apos;t work there. You already know. You&apos;ve tried.</Paragraph>
      <Paragraph>
        What works is repetition. Building the new reflex so it fires before the old one can.
      </Paragraph>
      <Paragraph>That&apos;s the work. That&apos;s what the Blueprint can&apos;t teach you in a PDF.</Paragraph>
      <Paragraph>I&apos;ll show you the system that does it on Friday.</Paragraph>

      <Signature />
    </BaseEmail>
  )
}
