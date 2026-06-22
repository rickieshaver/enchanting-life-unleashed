import type { Metadata } from 'next'
import { Newsreader, Manrope, Plus_Jakarta_Sans, Allura } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const allura = Allura({
  subsets: ['latin'],
  variable: '--font-allura',
  weight: '400',
  display: 'swap',
})

const SITE_URL = 'https://enchantinglifeunleashed.com'
const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/images/og-default.jpg`,
  width: 1200,
  height: 630,
  alt: 'Enchanting Life Unleashed — Where Soul Meets Strategy',
}

export const metadata: Metadata = {
  title: {
    default: 'Enchanting Life Unleashed — Where Soul Meets Strategy',
    template: '%s — Enchanting Life Unleashed',
  },
  description: 'Where modern mystics learn real magic — boundary work, lunar-cycle practice, and shadow integration rooted in intention and built to actually hold.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'Enchanting Life Unleashed',
    description: 'Where Soul Meets Strategy — boundary work, lunar-cycle practice, and shadow integration for modern mystics.',
    url: SITE_URL,
    siteName: 'Enchanting Life Unleashed',
    locale: 'en_US',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enchanting Life Unleashed — Where Soul Meets Strategy',
    description: 'Boundary work, lunar-cycle practice, and shadow integration for modern mystics.',
    images: [DEFAULT_OG_IMAGE.url],
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Enchanting Life Unleashed',
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  description:
    'Enchanting Life Unleashed teaches modern mystics practical boundary work, lunar-cycle alignment, and shadow integration — systems over vibes, structure over endless healing.',
  founder: {
    '@type': 'Person',
    name: 'Ren',
    url: `${SITE_URL}/about`,
  },
  email: 'connect@enchantinglifeunleashed.com',
  sameAs: [
    'https://www.instagram.com/enchantinglifeunleashed/',
    'https://www.tiktok.com/@enchantinglifeunleashed',
    'https://www.pinterest.com/enchantinglifeunleashed/',
    'https://www.youtube.com/@EnchantingLifeUnleashed',
    'https://www.linkedin.com/company/enchantinglifeunleashed/',
    'https://x.com/enchantinglifeU',
    'https://www.facebook.com/enchantinglifeunleashed/',
  ],
}

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Enchanting Life Unleashed',
  alternateName: 'ELU',
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#organization` },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${manrope.variable} ${plusJakartaSans.variable} ${allura.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <Nav />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
