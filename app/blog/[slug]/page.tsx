import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allPosts, getPost, getRelatedPosts } from '@/app/blog/_lib/posts'
import { PostHero } from '@/app/blog/_components/PostHero'
import { PostBody } from '@/app/blog/_components/PostBody'
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
  const ogImage = post.meta.image
    ? `https://enchantinglifeunleashed.com${post.meta.image}`
    : 'https://enchantinglifeunleashed.com/images/og-default.jpg'
  return {
    title: post.meta.seoTitle ?? post.meta.title,
    description: post.meta.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: post.meta.ogTitle ?? post.meta.title,
      description: post.meta.metaDescription,
      url,
      type: 'article',
      publishedTime: post.meta.publishedAt,
      modifiedTime: post.meta.updatedAt ?? post.meta.publishedAt,
      images: [{ url: ogImage, alt: post.meta.imageAlt ?? post.meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.ogTitle ?? post.meta.title,
      description: post.meta.metaDescription,
      images: [ogImage],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const SITE = 'https://enchantinglifeunleashed.com'
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.meta.title,
    description: post.meta.metaDescription,
    datePublished: post.meta.publishedAt,
    dateModified: post.meta.updatedAt ?? post.meta.publishedAt,
    ...(post.meta.image ? { image: `${SITE}${post.meta.image}` } : {}),
    author: { '@type': 'Person', name: 'Ren', url: `${SITE}/about` },
    publisher: { '@id': `${SITE}/#organization` },
    mainEntityOfPage: `${SITE}/blog/${post.meta.slug}`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: post.meta.title, item: `${SITE}/blog/${post.meta.slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PostHero meta={post.meta} />
      <PostBody>
        <post.Body />
      </PostBody>
      <RelatedPosts posts={getRelatedPosts(post.meta.slug)} />
    </>
  )
}
