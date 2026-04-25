import type { ReactNode } from 'react'

export type PostMeta = {
  slug: string
  title: string
  tag: 'Boundaries' | 'Lunar Living' | 'Practice'
  excerpt: string
  metaDescription: string
  readTime: string
  publishedAt: string
  routesTo: 'quiz' | 'sbs'
  image?: string
  imageAlt?: string
  ogTitle?: string
}

export type Post = {
  meta: PostMeta
  Body: () => ReactNode
}
