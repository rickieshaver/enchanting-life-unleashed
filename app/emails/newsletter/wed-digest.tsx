import { Hr, Section, Text } from '@react-email/components'
import { BaseEmail, COLORS, CTA, FONTS, Heading, Paragraph, Signature } from '../_base'

export interface WedDigestPost {
  title: string
  slug: string
  excerpt: string
  tag: string
  url: string
}

export interface WedDigestPreview {
  title: string
  tag: string
  url: string
}

export interface WedDigestProps {
  heroPost: WedDigestPost
  previews?: WedDigestPreview[]
  weekLabel: string
  previewText?: string
}

export default function WedDigest({
  heroPost,
  previews = [],
  weekLabel,
  previewText,
}: WedDigestProps) {
  const preview = previewText ?? heroPost.excerpt.slice(0, 120)

  return (
    <BaseEmail preview={preview}>
      {/* Section label */}
      <Text
        style={{
          fontFamily: FONTS.label,
          fontSize: '10px',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: COLORS.dustyRose,
          margin: '0 0 28px',
          fontWeight: 500,
        }}
      >
        {weekLabel} &middot; This week on ELU
      </Text>

      {/* Hero post */}
      <Heading>{heroPost.title}</Heading>

      <Text
        style={{
          fontFamily: FONTS.label,
          fontSize: '10px',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: COLORS.gold,
          margin: '0 0 12px',
          fontWeight: 600,
        }}
      >
        {heroPost.tag}
      </Text>

      <Paragraph>{heroPost.excerpt}</Paragraph>

      {heroPost.url && (
        <CTA href={heroPost.url} label={`Read — ${heroPost.tag}`} />
      )}

      {/* Previews */}
      {previews.length > 0 && (
        <>
          <Hr
            style={{
              borderTop: `1px solid ${COLORS.softPink}`,
              margin: '32px 0 24px',
              borderBottom: 'none',
            }}
          />

          <Text
            style={{
              fontFamily: FONTS.label,
              fontSize: '10px',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: COLORS.dustyRose,
              margin: '0 0 20px',
              fontWeight: 500,
            }}
          >
            Also this week
          </Text>

          {previews.map((post, i) => (
            <Section
              key={i}
              style={{
                marginBottom: '16px',
                paddingBottom: '16px',
                borderBottom:
                  i < previews.length - 1
                    ? `1px solid ${COLORS.softPink}`
                    : 'none',
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.label,
                  fontSize: '10px',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: COLORS.gold,
                  margin: '0 0 4px',
                  fontWeight: 600,
                }}
              >
                {post.tag}
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.display,
                  fontSize: '18px',
                  lineHeight: 1.2,
                  color: COLORS.burgundy,
                  margin: '0 0 6px',
                  fontWeight: 300,
                }}
              >
                {post.url ? (
                  <a
                    href={post.url}
                    style={{
                      color: COLORS.burgundy,
                      textDecoration: 'underline',
                      textDecorationColor: COLORS.softPink,
                    }}
                  >
                    {post.title}
                  </a>
                ) : (
                  post.title
                )}
              </Text>
            </Section>
          ))}
        </>
      )}

      {/* Closing line */}
      <Paragraph>
        That is what landed this week. Read what fits. Skip what does not.
      </Paragraph>

      <Signature />
    </BaseEmail>
  )
}
