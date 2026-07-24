'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/freebies', label: 'Freebies' },
  { href: '/blog', label: 'Blog' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="w-full bg-surface border-b border-gold/20 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 md:px-12 py-6">
        <Link href="/" className="font-headline text-2xl font-bold italic text-primary">
          Enchanting Life Unleashed
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-headline text-sm uppercase tracking-widest transition-colors duration-200 ${
                pathname === href
                  ? 'text-primary border-b border-gold pb-0.5'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-primary p-2"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen(!open)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>

        {/* CTA */}
        <div className="hidden md:block">
          <Link href="/boundary-archetype-quiz" className="btn-primary">
            Take the Quiz
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface border-b border-gold/20 px-8 py-6">
          <div className="flex flex-col gap-6">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-headline text-sm uppercase tracking-widest text-secondary hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/boundary-archetype-quiz"
              className="btn-primary text-center"
              onClick={() => setOpen(false)}
            >
              Take the Quiz
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
