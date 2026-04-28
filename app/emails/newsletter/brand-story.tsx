import { BaseEmail, CTA, Heading, Paragraph, Signature } from '../_base'

export default function NewsletterBrandStory() {
  return (
    <BaseEmail preview="Here's what we're actually building.">
      <Heading>Here&apos;s what we&apos;re actually building.</Heading>

      <Paragraph>Two weeks in. Quick picture of what this place actually is.</Paragraph>

      <Paragraph>
        <strong>Enchanting Life Unleashed</strong> is the home for one question:
      </Paragraph>

      <Paragraph>
        How do you stop leaking energy, money, and time — and start building a life that holds you?
      </Paragraph>

      <Paragraph>My answer is structured in three layers:</Paragraph>

      <Paragraph>
        <strong>Layer 1 — Diagnosis.</strong> The free Boundary Archetype Quiz + the Blueprint +
        the Domain Deep Dive. If you&apos;ve been on this list for two weeks, I&apos;ve nudged you
        toward the quiz already. Because nothing else works until you know what&apos;s specifically
        breaking.
      </Paragraph>

      <Paragraph>
        <strong>Layer 2 — Practice.</strong> The Sacred Boundary System ($17 PDF). Eight-cycle
        lunar-aligned workbook. Four domains. Three archetypes. One question every 28 days: what
        held, what cracked, what&apos;s next. Built for the leak you actually have, not a general
        &ldquo;work on your boundaries&rdquo; mood.
      </Paragraph>

      <Paragraph>
        <strong>Layer 3 — Ongoing.</strong> This newsletter + the Lunar Alignment ecosystem (now
        live). The Lunar Alignment Quick Start Guide is the free entry point — eight phases, 28-day
        cycle map, the model in your hands. The Lunar Alignment Starter Kit ($7) takes you through
        your first real cycle. The Lunar Alignment Planner ($27) is the year-long practice — twelve
        cycles, annual theme, quarterly reviews. Everything is built to use, not to admire.
      </Paragraph>

      <Paragraph>
        If the practice layer is where you are right now, the Sacred Boundary System is $17 and
        delivered instantly.
      </Paragraph>

      <CTA
        href="https://enchantinglifeunleashed.com/sacred-boundary-system"
        label="See the Sacred Boundary System"
      />

      <Paragraph>
        If you&apos;re still in diagnosis mode and haven&apos;t taken the quiz, do that first. I
        keep saying it because it&apos;s the single highest-leverage thing on the free side of this.
      </Paragraph>

      <Paragraph>
        From here, I show up once a week with something useful. Occasionally something longer when
        it matters. If the first newsletter you get doesn&apos;t feel like your thing, unsubscribe.
        Truly.
      </Paragraph>

      <Paragraph>
        But if you&apos;re still here after two weeks — you probably are my people.
      </Paragraph>

      <Paragraph>Glad you&apos;re in.</Paragraph>

      <Signature />
    </BaseEmail>
  )
}
