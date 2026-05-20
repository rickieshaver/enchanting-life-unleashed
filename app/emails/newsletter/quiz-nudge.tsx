import { BaseEmail, CTA, Heading, Paragraph, Signature } from '../_base'

export default function NewsletterQuizNudge() {
  return (
    <BaseEmail preview="Five minutes. Two specific answers. Free.">
      <Heading>Take the quiz if you have not.</Heading>

      <Paragraph>Quick check-in.</Paragraph>

      <Paragraph>
        If you are reading this without having taken the Boundary Archetype Quiz, you are flying
        blind on your own pattern.
      </Paragraph>

      <Paragraph>The quiz takes five minutes. It tells you two things:</Paragraph>

      <Paragraph>
        <strong>1. Your archetype</strong> — how you handle the moment the boundary gets tested.
        There are three: The Open Door (says yes before the question finishes), The Cracked Window
        (sets the limit, caves in the first 60 seconds), The Sacred Keeper (holds the line, then
        guilt-audits it for the next hour).
      </Paragraph>

      <Paragraph>
        <strong>2. Your primary domain</strong> — which of four life arenas is leaking hardest right
        now. Voice. Time. Energy. Or the promises you keep breaking to yourself.
      </Paragraph>

      <Paragraph>
        You already have an archetype. You already have a primary leak domain. The only question is
        whether you have named it yet — or you are still trying to fix &ldquo;your boundaries&rdquo;{' '}
        in general.
      </Paragraph>

      <Paragraph>General does not change. Specific does.</Paragraph>

      <CTA
        href="https://enchantinglifeunleashed.com/boundary-archetype-quiz"
        label="Take the Boundary Archetype Quiz"
      />

      <Paragraph>
        When you finish, you will get your Blueprint (archetype) and a Domain Deep Dive (the one
        that is leaking hardest) — both PDFs, delivered instantly. They are built to be read once
        and reread quarterly.
      </Paragraph>

      <Paragraph>No charge. No upsell on the result page. It is a real diagnostic.</Paragraph>

      <Signature />
    </BaseEmail>
  )
}
