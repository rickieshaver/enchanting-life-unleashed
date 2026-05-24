/**
 * /sitemap.xml — Next.js app-router sitemap
 *
 * Auto-generates at build time. Blog posts are read from posts.ts (single
 * source of truth). When Caldwell adds posts to posts.ts, they appear
 * in sitemap.xml at next deploy — no separate update needed.
 *
 * Excluded: post-purchase/delivery/access pages, API routes, draft posts.
 * Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import type { MetadataRoute } from 'next'
import { allPosts } from '@/app/blog/_lib/posts'

const SITE = 'https://enchantinglifeunleashed.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  // Static pages — high priority, evergreen
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Product / funnel pages
    {
      url: `${SITE}/sacred-boundary-system`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE}/lunar-alignment-starter-kit`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE}/lunar-alignment-planner`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE}/lunar-alignment-quick-start-guide`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE}/boundary-archetype-quiz`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Shop / discovery
    {
      url: `${SITE}/shop`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Blog index
    {
      url: `${SITE}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // About / contact
    {
      url: `${SITE}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    // Legal
    {
      url: `${SITE}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]

  // Blog posts — read from canonical registry, sorted newest-first
  const blogPages: MetadataRoute.Sitemap = allPosts.map((p) => ({
    url: `${SITE}/blog/${p.meta.slug}`,
    lastModified: new Date(p.meta.publishedAt).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
}
