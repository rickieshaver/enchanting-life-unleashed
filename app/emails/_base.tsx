import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { ReactNode } from 'react'

export const COLORS = {
  cream: '#FFFCF7',
  burgundy: '#6D2E46',
  dustyRose: '#A26769',
  softPink: '#D5B9B2',
  gold: '#EDB74D',
  ink: '#3A1525',
  inkSoft: 'rgba(109,46,70,0.72)',
}

export const FONTS = {
  display: "'Newsreader', Georgia, serif",
  body: "'Plus Jakarta Sans', Helvetica, Arial, sans-serif",
  label: "'Manrope', Helvetica, Arial, sans-serif",
  script: "'Allura', cursive",
}

export function BaseEmail({
  preview,
  children,
}: {
  preview: string
  children: ReactNode
}) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: COLORS.cream,
          fontFamily: FONTS.body,
          color: COLORS.burgundy,
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            maxWidth: '580px',
            margin: '0 auto',
            padding: '40px 32px',
          }}
        >
          {/* Brand bar */}
          <Section style={{ paddingBottom: '32px' }}>
            <Text
              style={{
                fontFamily: FONTS.label,
                fontSize: '10px',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: COLORS.dustyRose,
                margin: 0,
                fontWeight: 500,
              }}
            >
              Enchanting Life Unleashed
            </Text>
          </Section>

          {/* Content */}
          <Section>{children}</Section>

          {/* Footer */}
          <Hr
            style={{
              borderTop: `1px solid ${COLORS.softPink}`,
              margin: '40px 0 24px',
              borderBottom: 'none',
            }}
          />
          <Section>
            <Text
              style={{
                fontFamily: FONTS.label,
                fontSize: '10px',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: COLORS.dustyRose,
                margin: 0,
                fontWeight: 500,
              }}
            >
              Where soul meets strategy
            </Text>
            <Text
              style={{
                fontSize: '11px',
                color: COLORS.dustyRose,
                marginTop: '16px',
                lineHeight: 1.6,
              }}
            >
              <Link
                href="https://enchantinglifeunleashed.com"
                style={{ color: COLORS.dustyRose, textDecoration: 'none' }}
              >
                enchantinglifeunleashed.com
              </Link>
              {' · '}
              <Link
                href="{{{RESEND_UNSUBSCRIBE_URL}}}"
                style={{ color: COLORS.dustyRose, textDecoration: 'underline' }}
              >
                unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Reusable typography primitives
export function Heading({ children }: { children: ReactNode }) {
  return (
    <Text
      style={{
        fontFamily: FONTS.display,
        fontSize: '32px',
        lineHeight: 1.1,
        color: COLORS.burgundy,
        margin: '0 0 20px',
        fontWeight: 300,
        letterSpacing: '-0.02em',
      }}
    >
      {children}
    </Text>
  )
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <Text
      style={{
        fontSize: '16px',
        lineHeight: 1.65,
        color: COLORS.burgundy,
        margin: '0 0 18px',
      }}
    >
      {children}
    </Text>
  )
}

export function Paragraph({ children }: { children: ReactNode }) {
  return (
    <Text
      style={{
        fontSize: '15px',
        lineHeight: 1.65,
        color: COLORS.burgundy,
        margin: '0 0 16px',
      }}
    >
      {children}
    </Text>
  )
}

export function Quote({ children }: { children: ReactNode }) {
  return (
    <Section
      style={{
        backgroundColor: COLORS.softPink,
        padding: '20px 24px',
        margin: '24px 0',
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.display,
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: '17px',
          lineHeight: 1.45,
          color: COLORS.burgundy,
          margin: 0,
        }}
      >
        {children}
      </Text>
    </Section>
  )
}

export function CTA({ href, label }: { href: string; label: string }) {
  return (
    <Section style={{ textAlign: 'center', margin: '28px 0' }}>
      <Link
        href={href}
        style={{
          backgroundColor: COLORS.burgundy,
          color: COLORS.cream,
          padding: '14px 28px',
          fontFamily: FONTS.label,
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          display: 'inline-block',
        }}
      >
        {label}
      </Link>
    </Section>
  )
}

export function Signature() {
  return (
    <Text
      style={{
        fontSize: '15px',
        color: COLORS.burgundy,
        margin: '28px 0 0',
      }}
    >
      — Ren
    </Text>
  )
}

export const ARCHETYPE_LABEL: Record<string, string> = {
  'open-door': 'Open Door',
  'cracked-window': 'Cracked Window',
  'sacred-keeper': 'Sacred Keeper',
}

export const ARCHETYPE_TAGLINE: Record<string, string> = {
  'open-door': "You give the yes before you've checked in with yourself.",
  'cracked-window': 'You set the limit. It breaks in the first 60 seconds.',
  'sacred-keeper': 'You hold the boundary. Then audit it for an hour.',
}

export const AREA_LABEL: Record<string, string> = {
  spellbreaker: 'Spellbreaker',
  'time-keeper': 'Time Keeper',
  'sacred-vessel': 'Sacred Vessel',
  'resource-guardian': 'Resource Guardian',
}
