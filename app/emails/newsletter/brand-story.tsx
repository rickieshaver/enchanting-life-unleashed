import { BaseEmail, CTA, Heading, Paragraph, Signature } from '../_base'

export default function NewsletterBrandStory() {
  return (
    <BaseEmail preview="Two weeks in. Quick picture of what this place actually is.">
      <Heading>Here is what is actually being built.</Heading>

      <Paragraph>Two weeks in. Quick picture of what this place actually is.</Paragraph>

      <Paragraph>
        <strong>Enchanting Life Unleashed</strong> exists for one question:
      </Paragraph>

      <Paragraph>
        How do you stop leaking energy, money, and time — and start building a life that holds you?
      </Paragraph>

      <Paragraph>The work is structured in three layers.</Paragraph>

      <Paragraph>
        <strong>Layer 1 — Diagnosis.</strong> The free Boundary Archetype Quiz, the Blueprint, and
        the Domain Deep Dive. If you have been on this list for two weeks, you have been nudged
        toward the quiz already. Because nothing else works until you know what is specifically
        breaking.
      </Paragraph>

      <Paragraph>
        <strong>Layer 2 — Practice.</strong> The Sacred Boundary System ($17 PDF). An eight-cycle
        lunar-aligned workbook. Four domains. Three archetypes. One question every 28 days: what
        held, what cracked, what is next. Built for the leak you actually have, not a vague
        &ldquo;work on your boundaries&rdquo; mood.
      </Paragraph>

      <Paragraph>
        <strong>Layer 3 — Ongoing.</strong> This newsletter plus the Lunar Alignment ecosystem (now
        live). The Lunar Alignment Quick Start Guide is the free entry point: eight phases, 28-day
        cycle map, the model in your hands. The Lunar Alignment Starter Kit ($7) takes you through
        your first real cycle. The Lunar Alignment Planner ($27) is the year-long practice: twelve
        cycles, an annual theme, quarterly reviews. Everything is built to use, not to admire.
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
        If you are still in diagnosis mode and have not taken the quiz, do that first. It is the
        single highest-leverage thing on the free side of all this.
      </Paragraph>

      <Paragraph>
        From here, you will hear from me twice a week. A short field note on Wednesday. A longer
        essay on Sunday. Occasionally something extra when it matters. If the first newsletter you
        get does not feel like your thing, unsubscribe. Truly.
      </Paragraph>

      <Paragraph>
        But if you are still here after two weeks, you are probably my people.
      </Paragraph>

      <Paragraph>Glad you are in.</Paragraph>

      <Signature />
    </BaseEmail>
  )
}
