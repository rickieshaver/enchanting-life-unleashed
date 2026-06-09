import type { ReactNode } from 'react'

export type PostMeta = {
  slug: string
  title: string
  tag: 'Boundaries' | 'Lunar Living' | 'Practice'
  excerpt: string
  metaDescription: string
  readTime: string
  publishedAt: string
  /** Set when a post is materially edited after publish — feeds dateModified in Article schema */
  updatedAt?: string
  routesTo: 'quiz' | 'sbs'
  image?: string
  imageAlt?: string
  ogTitle?: string
}

export type Post = {
  meta: PostMeta
  Body: () => ReactNode
}
