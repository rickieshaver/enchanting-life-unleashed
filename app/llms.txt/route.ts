/**
 * /llms.txt — LLM discoverability index (Anthropic llmstxt.org spec)
 *
 * Dynamically generated from the canonical posts registry (posts.ts).
 * When Caldwell adds a post to posts.ts, it appears here automatically
 * at next deploy — no separate build step required.
 */

import { allPosts } from '@/app/blog/_lib/posts'

const SITE = 'https://enchantinglifeunleashed.com'

const PRODUCTS = [
  {
    title: 'Sacred Boundary System',
    path: '/sacred-boundary-system',
    description:
      'A lunar-aligned workbook for setting, holding, and honoring boundaries across eight 28-day cycles. Four domains. Three archetypes. $27.',
  },
  {
    title: 'Lunar Alignment Starter Kit',
    path: '/lunar-alignment-starter-kit',
    description:
      'A 28-day workbook and reusable cycle tracker for women ready to run one full lunar cycle of intentional practice. Step Two of the Lunar Alignment System. $7.',
  },
  {
    title: 'Lunar Alignment Planner',
    path: '/lunar-alignment-planner',
    description:
      'An undated 202-page planner for twelve cycles of intentional cycle-based living. Step Three of the Lunar Alignment System. $27.',
  },
  {
    title: 'Lunar Alignment Quick Start Guide',
    path: '/lunar-alignment-quick-start-guide',
    description:
      'Free guide to the eight lunar phases, the Action framework, and the 28-day cycle map. Step One of the Lunar Alignment System. No cost.',
  },
  {
    title: 'Boundary Archetype Quiz',
    path: '/boundary-archetype-quiz',
    description:
      'Free five-minute quiz to identify your boundary archetype (Open Door, Cracked Window, or Sacred Keeper) and primary leak domain. Includes a personalized Blueprint and Domain Deep Dive PDF.',
  },
]

export async function GET() {
  const blogLines = allPosts
    .map((p) => `- [${p.meta.title}](${SITE}/blog/${p.meta.slug}): ${p.meta.excerpt}`)
    .join('\n')

  const productLines = PRODUCTS.map(
    (p) => `- [${p.title}](${SITE}${p.path}): ${p.description}`,
  ).join('\n')

  const body = `# Enchanting Life Unleashed

> Soul meets strategy. Practical tools and real frameworks for women building intentional lives — without the fluff, the performative spirituality, or the aesthetic substituting for action.

Enchanting Life Unleashed teaches boundary work, lunar-cycle-aligned practice, shadow integration, and mystic tooling (tarot, ritual) through a lens of behavioral mechanics, not motivation. The core thesis: patterns change through repetition under real conditions, not through additional information. Content is direct, evidence-grounded, and designed for women who are done reading and ready to practice.

## Blog

${blogLines}

## Products

${productLines}

## About

- [About](${SITE}/about): The philosophy and voice behind Enchanting Life Unleashed.
- [Shop](${SITE}/shop): Full product collection — the Lunar Alignment ecosystem and the Sacred Boundary System.
- [Contact](${SITE}/contact): Direct channels and collaboration inquiries.
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
