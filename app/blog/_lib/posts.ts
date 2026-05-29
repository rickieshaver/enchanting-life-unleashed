import type { Post } from './types'

import * as sayingYes from '@/app/blog/posts/saying-yes-when-you-mean-no'
import * as archetypes from '@/app/blog/posts/what-are-boundary-archetypes'
import * as lunar from '@/app/blog/posts/lunar-cycle-for-boundary-work'
import * as justSayNo from '@/app/blog/posts/just-say-no-doesnt-work'
import * as practice from '@/app/blog/posts/practice-problem-not-knowledge'
import * as absorbing from '@/app/blog/posts/stop-absorbing-other-peoples-stress'
import * as shadowWork from '@/app/blog/posts/when-shadow-work-becomes-shadow-avoidance'
import * as newMoonRitual from '@/app/blog/posts/new-moon-ritual-without-the-pinterest-aesthetic'
import * as tarot from '@/app/blog/posts/how-to-read-tarot-without-becoming-insufferable'
import * as mercuryRetrograde from '@/app/blog/posts/mercury-retrograde-and-contract-signing'
import * as morningRitual from '@/app/blog/posts/what-a-sacred-morning-routine-actually-looks-like'
import * as spiritualBypassing from '@/app/blog/posts/spiritual-bypassing-is-real-and-youve-probably-done-it'

const modules: Record<string, Post> = {
  [sayingYes.meta.slug]: { meta: sayingYes.meta, Body: sayingYes.Body },
  [archetypes.meta.slug]: { meta: archetypes.meta, Body: archetypes.Body },
  [lunar.meta.slug]: { meta: lunar.meta, Body: lunar.Body },
  [justSayNo.meta.slug]: { meta: justSayNo.meta, Body: justSayNo.Body },
  [practice.meta.slug]: { meta: practice.meta, Body: practice.Body },
  [absorbing.meta.slug]: { meta: absorbing.meta, Body: absorbing.Body },
  [shadowWork.meta.slug]: { meta: shadowWork.meta, Body: shadowWork.Body },
  [newMoonRitual.meta.slug]: { meta: newMoonRitual.meta, Body: newMoonRitual.Body },
  [tarot.meta.slug]: { meta: tarot.meta, Body: tarot.Body },
  [mercuryRetrograde.meta.slug]: { meta: mercuryRetrograde.meta, Body: mercuryRetrograde.Body },
  [morningRitual.meta.slug]: { meta: morningRitual.meta, Body: morningRitual.Body },
  [spiritualBypassing.meta.slug]: { meta: spiritualBypassing.meta, Body: spiritualBypassing.Body },
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
