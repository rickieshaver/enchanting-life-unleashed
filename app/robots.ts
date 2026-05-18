/**
 * /robots.txt — AI crawler allow rules
 *
 * Explicit opt-in for all major LLM/AI crawlers so ELU content is
 * citable in Perplexity, ChatGPT, Claude, Grok, and other LLM search
 * surfaces. No crawlers are blocked.
 *
 * Next.js 13+ app-router file-based robots generation.
 * Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow everything
      {
        userAgent: '*',
        allow: '/',
      },
      // OpenAI
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      // Anthropic / Claude
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      {
        userAgent: 'ClaudeUser',
        allow: '/',
      },
      // Perplexity
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'Perplexity-User',
        allow: '/',
      },
      // Google AI
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      // Common Crawl (trains many LLMs)
      {
        userAgent: 'CCBot',
        allow: '/',
      },
      // Apple
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },
      // TikTok / ByteDance
      {
        userAgent: 'Bytespider',
        allow: '/',
      },
      // Amazon
      {
        userAgent: 'Amazonbot',
        allow: '/',
      },
      // Meta
      {
        userAgent: 'Meta-ExternalAgent',
        allow: '/',
      },
      // Cohere
      {
        userAgent: 'cohere-ai',
        allow: '/',
      },
    ],
    sitemap: 'https://enchantinglifeunleashed.com/sitemap.xml',
  }
}
