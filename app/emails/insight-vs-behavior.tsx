import { BaseEmail, Heading, Paragraph, Signature } from './_base'

export type InsightVsBehaviorProps = {
  firstName: string
}

export default function InsightVsBehavior({ firstName = 'Friend' }: InsightVsBehaviorProps) {
  return (
    <BaseEmail preview="You don't have a knowledge problem.">
      <Paragraph>{firstName} —</Paragraph>
      <Heading>You don&apos;t have a knowledge problem.</Heading>
      <Paragraph>Quick check-in.</Paragraph>
      <Paragraph>
        If knowing your pattern changed your pattern, you would have fixed this years ago.
      </Paragraph>
      <Paragraph>
        You&apos;ve read the books. You&apos;ve listened to the podcasts. You&apos;ve journaled.
        You&apos;ve probably told a friend &ldquo;I know, I need to work on my boundaries&rdquo;
        more times than you can count.
      </Paragraph>
      <Paragraph>And the yes still fires. The limit still cracks. The guilt still runs.</Paragraph>
      <Paragraph>That&apos;s not a failure of understanding.</Paragraph>
      <Paragraph>
        <strong>It&apos;s a failure of structure.</strong>
      </Paragraph>
      <Paragraph>
        Insight is slow. The pattern is fast. In the moment it matters — when someone&apos;s
        looking at you, when the silence hits, when the body tightens — insight is always late. The
        pattern has already moved.
      </Paragraph>
      <Paragraph>
        The fix isn&apos;t more awareness. It&apos;s a practice that runs faster than the pattern —
        built, rehearsed, anchored to a rhythm so it becomes reflex instead of effort.
      </Paragraph>
      <Paragraph>
        That&apos;s what I built the Sacred Boundary System to do. I&apos;ll show it to you on
        Monday.
      </Paragraph>

      <Signature />
    </BaseEmail>
  )
}
