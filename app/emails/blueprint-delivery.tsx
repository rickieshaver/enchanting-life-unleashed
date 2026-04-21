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
      <Paragraph>The Blueprint doesn&apos;t reveal anything new.</Paragraph>
      <Paragraph>It makes it impossible to keep pretending.</Paragraph>

      <CTA href={blueprintUrl} label="Download your Blueprint" />

      <Paragraph>Inside:</Paragraph>
      <Text
        style={{
          fontSize: '15px',
          lineHeight: 1.8,
          color: COLORS.burgundy,
          margin: '0 0 20px',
        }}
      >
        — Where the pattern is actually showing up (in three domains, not just the one)
        <br />
        — The exact scripts for the moments that break you
        <br />
        — The warning signs that fire <em>before</em> you cave
        <br />
        — Your one-line standard — the rule you hold, even when it&apos;s loud
      </Text>

      <Paragraph>
        Read it once. Print it if you&apos;re the printing kind. Then put it down and walk away
        from it for a few hours.
      </Paragraph>

      <Paragraph>
        I&apos;ll follow up in two days with what the Blueprint doesn&apos;t tell you.
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
