import type { Post } from './types'

import * as sayingYes from '@/app/blog/posts/saying-yes-when-you-mean-no'

const modules: Record<string, Post> = {
  [sayingYes.meta.slug]: { meta: sayingYes.meta, Body: sayingYes.Body },
}

export const allPosts: Post[] = Object.values(modules).sort(
  (a, b) =>
    new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime(),
)

export function getPost(slug: string): Post | undefined {
  return modules[slug]
}

export function getRelatedPosts(currentSlug: string, limit = 2): Post[] {
  return allPosts.filter((p) => p.meta.slug !== currentSlug).slice(0, limit)
}
