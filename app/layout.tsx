import type { Metadata } from 'next'
import { Newsreader, Manrope, Plus_Jakarta_Sans, Allura } from 'next/font/google'
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

export const metadata: Metadata = {
  title: 'Enchanting Life Unleashed — Where Soul Meets Strategy',
  description: 'Where modern mystics learn real magic — rooted in intention, guided by intuition, and sprinkled with just the right amount of sparkle.',
  metadataBase: new URL('https://enchantinglifeunleashed.com'),
  openGraph: {
    title: 'Enchanting Life Unleashed',
    description: 'Where Soul Meets Strategy',
    url: 'https://enchantinglifeunleashed.com',
    siteName: 'Enchanting Life Unleashed',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${manrope.variable} ${plusJakartaSans.variable} ${allura.variable}`}
    >
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
