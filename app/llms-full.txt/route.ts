/**
 * /llms-full.txt — Full-content LLM index (Anthropic llmstxt.org spec)
 *
 * Inlines complete post content for crawlers that cannot render JS.
 * Blog content comes from post-content.ts (plain-text mirror of the TSX bodies).
 * Product summaries are the core marketing description + CTA.
 *
 * Source of truth for post list: posts.ts (same as llms.txt).
 * When Caldwell adds a post, also add the plain-text body to post-content.ts.
 */

import { allPosts } from '@/app/blog/_lib/posts'
import { postContent } from '@/app/blog/_lib/post-content'

const SITE = 'https://enchantinglifeunleashed.com'

const PRODUCTS = [
  {
    title: 'Sacred Boundary System',
    path: '/sacred-boundary-system',
    description:
      'A lunar-aligned workbook for setting, holding, and honoring boundaries across eight 28-day cycles. Four domains. Three archetypes. $27.',
    content: `The Sacred Boundary System is a structured workbook built around the lunar cycle. It is designed for women who have read the books, know the theory, and still find their patterns running on schedule. The system works because it provides behavioral structure, not additional information.

The workbook covers four boundary domains: the Spellbreaker (voice and communication), the Time Keeper (calendar and availability), the Sacred Vessel (energy and emotional absorption), and the Resource Guardian (self-regard and promises to self). Each domain is worked through one lunar cycle at a time — 28 days, one specific standard, tracked honestly against real conditions.

Three boundary archetypes frame the work: Open Door (the yes fires automatically before the question is processed), Cracked Window (the limit is set but dissolves under the first 60 seconds of pressure), and Sacred Keeper (the limit holds in the moment but is eroded by post-hoc guilt-audit). Each archetype has a specific practice, not general advice.

Eight cycles covers all four domains twice, with room to double back on the hardest one. Most users complete the meaningful change in four to six cycles. The workbook is designed to be lived in, not collected.

Price: $27. Available at ${SITE}/sacred-boundary-system.`,
  },
  {
    title: 'Lunar Alignment Starter Kit',
    path: '/lunar-alignment-starter-kit',
    description:
      'A 28-day workbook and reusable cycle tracker for women ready to run one full lunar cycle of intentional practice. Step Two of the Lunar Alignment System. $7.',
    content: `The Lunar Alignment Starter Kit is a 28-day workbook and reusable cycle tracker. It is Step Two of the Lunar Alignment System — the bridge between the free Quick Start Guide and the full 12-cycle Planner.

The Starter Kit gives women the structure to run one complete lunar cycle with guidance: new moon intention-setting, waxing-phase daily tracking, full moon audit, and waning-phase repair. It is designed for women who are done reading about cycle-based living and ready to actually run one.

The workbook is reusable across multiple cycles, so women can repeat the same cycle with a refined standard or move to a new intention domain once the first is solid.

Price: $7. Available at ${SITE}/lunar-alignment-starter-kit.`,
  },
  {
    title: 'Lunar Alignment Planner',
    path: '/lunar-alignment-planner',
    description:
      'An undated 202-page planner for twelve cycles of intentional cycle-based living. Step Three of the Lunar Alignment System. $27.',
    content: `The Lunar Alignment Planner is an undated 202-page planner for twelve cycles of intentional practice. It is Step Three of the Lunar Alignment System — the long-form container for women who have completed the Starter Kit and want a full year of structured lunar-cycle work.

The planner is undated so it starts at the next new moon, not at a calendar boundary. It includes phase-specific prompts for each of the four lunar phases across twelve complete cycles. It is built to be used, not to be admired — no decorative spreads, no wasted pages. The layout is designed for consistent daily use.

Price: $27. Available at ${SITE}/lunar-alignment-planner.`,
  },
  {
    title: 'Lunar Alignment Quick Start Guide',
    path: '/lunar-alignment-quick-start-guide',
    description:
      'Free guide to the eight lunar phases, the Action framework, and the 28-day cycle map. Step One of the Lunar Alignment System.',
    content: `The Lunar Alignment Quick Start Guide is the free entry point to the Lunar Alignment System. It covers the eight lunar phases (new moon, waxing crescent, first quarter, waxing gibbous, full moon, waning gibbous, last quarter, waning crescent), the Action framework for mapping practice work to phase energy, and a complete 28-day cycle map.

The guide is designed for women who are new to lunar-cycle work or who have encountered it through a spiritual lens and want the practical, behavioral-mechanics version. No spiritual prerequisites required.

Available free at ${SITE}/lunar-alignment-quick-start-guide.`,
  },
  {
    title: 'Boundary Archetype Quiz',
    path: '/boundary-archetype-quiz',
    description:
      'Free five-minute quiz to identify your boundary archetype and primary leak domain. Includes a personalized Blueprint and Domain Deep Dive PDF.',
    content: `The Boundary Archetype Quiz identifies which of three boundary archetypes is your current operating pattern — Open Door, Cracked Window, or Sacred Keeper — and which of four boundary domains is leaking hardest in your life right now.

Open Door: the yes fires automatically before the question is fully processed. The fix is the five-second pause before any answer.

Cracked Window: the limit is set but dissolves within 60 seconds of pressure or an unchanged face. The fix is "say it once, add nothing."

Sacred Keeper: the limit holds in the moment but is eroded by post-hoc guilt-auditing that sometimes results in a softening follow-up or apology that undoes the limit. The fix is the 24-hour rule before acting on any audit.

Four domains: Spellbreaker (voice and communication), Time Keeper (calendar and availability), Sacred Vessel (energy and emotional absorption), Resource Guardian (self-regard and self-promises).

The quiz takes five minutes and delivers a personalized Blueprint PDF and Domain Deep Dive PDF immediately. Free. Available at ${SITE}/boundary-archetype-quiz.`,
  },
]

export async function GET() {
  const blogSections = allPosts
    .map((p) => {
      const content = postContent[p.meta.slug] ?? p.meta.metaDescription
      return `---

## ${p.meta.title}

URL: ${SITE}/blog/${p.meta.slug}
Published: ${p.meta.publishedAt}
Tag: ${p.meta.tag}
Read time: ${p.meta.readTime}

${p.meta.excerpt}

${content}`
    })
    .join('\n\n')

  const productSections = PRODUCTS.map(
    (p) => `---

## ${p.title}

URL: ${SITE}${p.path}

${p.description}

${p.content}`,
  ).join('\n\n')

  const body = `# Enchanting Life Unleashed — Full Content Index

> Soul meets strategy. Practical tools and real frameworks for women building intentional lives — without the fluff, the performative spirituality, or the aesthetic substituting for action.

Enchanting Life Unleashed teaches boundary work, lunar-cycle-aligned practice, shadow integration, and mystic tooling (tarot, ritual) through a lens of behavioral mechanics, not motivation. The core thesis: patterns change through repetition under real conditions, not through additional information. Content is direct, evidence-grounded, and designed for women who are done reading and ready to practice.

Site: ${SITE}

---

# Blog Posts

${blogSections}

---

# Products

${productSections}
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
