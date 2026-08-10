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
import * as intuitionVsAnxiety from '@/app/blog/posts/intuition-vs-anxiety-how-to-tell-the-difference'
import * as planAroundMoon from '@/app/blog/posts/how-to-plan-your-month-around-the-moon'
import * as imJustBusy from '@/app/blog/posts/the-im-just-busy-excuse'
import * as overExplaining from '@/app/blog/posts/over-explaining-yourself'
import * as altarIdeas from '@/app/blog/posts/altar-ideas-no-explanation-needed'
import * as stopApologizing from '@/app/blog/posts/stop-apologizing-for-things-that-dont-need-it'

import * as fawnResponseNervousSystem from '@/app/blog/posts/fawn-response-nervous-system'
import * as emotionalBandwidthNotCommunityResource from '@/app/blog/posts/emotional-bandwidth-not-community-resource'
import * as stopPeoplePleasingKeepingPeaceSurvival from '@/app/blog/posts/stop-people-pleasing-keeping-peace-survival'
import * as livingAuthenticallyMeansUnlearningWhatYouWerePraisedFor from '@/app/blog/posts/living-authentically-means-unlearning-what-you-were-praised-for'
import * as midYearEnergyAuditWomenRunningOnEmpty from '@/app/blog/posts/mid-year-energy-audit-women-running-on-empty'
import * as needForApprovalWhatItMeans from '@/app/blog/posts/need-for-approval-what-it-means'
import * as whyDoIFeelGuiltyWhenIRest from '@/app/blog/posts/why-do-i-feel-guilty-when-i-rest'
import * as howToSetTextingBoundaries from '@/app/blog/posts/how-to-set-texting-boundaries'
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
  [intuitionVsAnxiety.meta.slug]: { meta: intuitionVsAnxiety.meta, Body: intuitionVsAnxiety.Body },
  [planAroundMoon.meta.slug]: { meta: planAroundMoon.meta, Body: planAroundMoon.Body },
  [imJustBusy.meta.slug]: { meta: imJustBusy.meta, Body: imJustBusy.Body },
  [overExplaining.meta.slug]: { meta: overExplaining.meta, Body: overExplaining.Body },
  [altarIdeas.meta.slug]: { meta: altarIdeas.meta, Body: altarIdeas.Body },
  [stopApologizing.meta.slug]: { meta: stopApologizing.meta, Body: stopApologizing.Body },
  [fawnResponseNervousSystem.meta.slug]: { meta: fawnResponseNervousSystem.meta, Body: fawnResponseNervousSystem.Body },
  [emotionalBandwidthNotCommunityResource.meta.slug]: { meta: emotionalBandwidthNotCommunityResource.meta, Body: emotionalBandwidthNotCommunityResource.Body },
  [stopPeoplePleasingKeepingPeaceSurvival.meta.slug]: { meta: stopPeoplePleasingKeepingPeaceSurvival.meta, Body: stopPeoplePleasingKeepingPeaceSurvival.Body },
  [livingAuthenticallyMeansUnlearningWhatYouWerePraisedFor.meta.slug]: { meta: livingAuthenticallyMeansUnlearningWhatYouWerePraisedFor.meta, Body: livingAuthenticallyMeansUnlearningWhatYouWerePraisedFor.Body },
  [midYearEnergyAuditWomenRunningOnEmpty.meta.slug]: { meta: midYearEnergyAuditWomenRunningOnEmpty.meta, Body: midYearEnergyAuditWomenRunningOnEmpty.Body },
  [needForApprovalWhatItMeans.meta.slug]: { meta: needForApprovalWhatItMeans.meta, Body: needForApprovalWhatItMeans.Body },
  [whyDoIFeelGuiltyWhenIRest.meta.slug]: { meta: whyDoIFeelGuiltyWhenIRest.meta, Body: whyDoIFeelGuiltyWhenIRest.Body },
  [howToSetTextingBoundaries.meta.slug]: { meta: howToSetTextingBoundaries.meta, Body: howToSetTextingBoundaries.Body },
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
