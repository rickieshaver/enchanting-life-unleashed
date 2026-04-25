import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allPosts, getPost, getRelatedPosts } from '@/app/blog/_lib/posts'
import { PostHero } from '@/app/blog/_components/PostHero'
import { PostBody } from '@/app/blog/_components/PostBody'
import { CTACard } from '@/app/blog/_components/CTACard'
import { RelatedPosts } from '@/app/blog/_components/RelatedPosts'

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.meta.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  const url = `https://enchantinglifeunleashed.com/blog/${post.meta.slug}`
  return {
    title: `${post.meta.title} — Enchanting Life Unleashed`,
    description: post.meta.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: post.meta.ogTitle ?? post.meta.title,
      description: post.meta.metaDescription,
      url,
      type: 'article',
      publishedTime: post.meta.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.ogTitle ?? post.meta.title,
      description: post.meta.metaDescription,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.meta.title,
    description: post.meta.metaDescription,
    datePublished: post.meta.publishedAt,
    author: { '@type': 'Person', name: 'Ren', url: 'https://enchantinglifeunleashed.com' },
    publisher: {
      '@type': 'Organization',
      name: 'Enchanting Life Unleashed',
      url: 'https://enchantinglifeunleashed.com',
    },
    mainEntityOfPage: `https://enchantinglifeunleashed.com/blog/${post.meta.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <PostHero meta={post.meta} />
      <PostBody>
        <post.Body />
        <CTACard variant={post.meta.routesTo} />
      </PostBody>
      <RelatedPosts posts={getRelatedPosts(post.meta.slug)} />
    </>
  )
}
