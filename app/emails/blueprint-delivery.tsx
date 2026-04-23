import { Section, Text } from '@react-email/components'
import {
  ARCHETYPE_LABEL,
  ARCHETYPE_TAGLINE,
  AREA_LABEL,
  BaseEmail,
  COLORS,
  CTA,
  FONTS,
  Heading,
  Paragraph,
  Quote,
  Signature,
} from './_base'

export type BlueprintDeliveryProps = {
  firstName: string
  archetype: 'open-door' | 'cracked-window' | 'sacred-keeper'
  primaryArea: 'spellbreaker' | 'time-keeper' | 'sacred-vessel' | 'resource-guardian'
}

export default function BlueprintDelivery({
  firstName = 'Friend',
  archetype = 'open-door',
  primaryArea = 'spellbreaker',
}: BlueprintDeliveryProps) {
  const archetypeLabel = ARCHETYPE_LABEL[archetype]
  const areaLabel = AREA_LABEL[primaryArea]
  const tagline = ARCHETYPE_TAGLINE[archetype]
  const blueprintUrl = `https://enchantinglifeunleashed.com/downloads/boundary-blueprint-${archetype}.pdf`
  const deepDiveUrl = `https://enchantinglifeunleashed.com/downloads/domain-deep-dive-${primaryArea}.pdf`

  return (
    <BaseEmail preview={`Your Empowered Boundary Blueprint, ${firstName}.`}>
      <Paragraph>{firstName} —</Paragraph>
      <Heading>Your Blueprint is here.</Heading>
      <Paragraph>You just took a quiz that told you something you already knew.</Paragraph>
      <Paragraph>
        You&apos;re <strong>The {archetypeLabel}</strong>. Your pattern leaks hardest in your{' '}
        <strong>{areaLabel}</strong> domain. You&apos;ve known that — in language or not — for a
        long time.
      </Paragraph>
      <Paragraph>So I&apos;m sending you two files, not one.</Paragraph>

      <Text
        style={{
          fontSize: '15px',
          lineHeight: 1.7,
          color: COLORS.burgundy,
          margin: '0 0 14px',
        }}
      >
        <strong>1. Your Blueprint</strong> — the full read on your archetype. How The{' '}
        {archetypeLabel} pattern shows up, what it costs, the exact scripts and warning signs, your
        one-line standard.
        <br />
        <br />
        <strong>2. Your {areaLabel} Deep Dive</strong> — the companion piece. A focused read on
        the one domain that leaked hardest in your results, and the seven-day first move to start
        interrupting it today.
      </Text>

      <CTA href={blueprintUrl} label="Download your Blueprint" />

      <Text
        style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: COLORS.dustyRose,
          fontStyle: 'italic',
          margin: '0 0 14px',
          textAlign: 'center' as const,
        }}
      >
        and —
      </Text>

      <CTA href={deepDiveUrl} label={`Download your ${areaLabel} Deep Dive`} />

      <Paragraph>
        Read the Blueprint first. Then the Deep Dive. They&apos;re meant to be read in that order —
        the archetype first, then the domain where the pattern is currently loudest.
      </Paragraph>

      <Paragraph>
        Print them if you&apos;re the printing kind. Then put them down and walk away for a few
        hours.
      </Paragraph>

      <Paragraph>
        I&apos;ll follow up in two days with what neither PDF tells you.
      </Paragraph>

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
          P.S. &ldquo;{tagline}&rdquo; — let that land for a minute before you open the PDF.
        </Text>
      </Section>
    </BaseEmail>
  )
}
