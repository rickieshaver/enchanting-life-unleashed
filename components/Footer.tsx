import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/freebies', label: 'Freebies' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

const socialLinks = [
  { href: 'https://www.instagram.com/enchantinglifeunleashed/', label: 'Instagram' },
  { href: 'https://www.tiktok.com/@enchantinglifeunleashed', label: 'TikTok' },
  { href: 'https://www.pinterest.com/enchantinglifeunleashed/', label: 'Pinterest' },
  { href: 'https://www.youtube.com/@EnchantingLifeUnleashed', label: 'YouTube' },
  { href: 'https://www.linkedin.com/company/enchantinglifeunleashed/', label: 'LinkedIn' },
  { href: 'https://x.com/enchantinglifeU', label: 'X / Twitter' },
  { href: 'https://www.facebook.com/enchantinglifeunleashed/', label: 'Facebook' },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-surface">
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          {/* Brand */}
          <div>
            <p className="font-headline text-2xl font-bold italic text-surface mb-4">
              Enchanting Life Unleashed
            </p>
            <p className="font-script text-2xl text-gold mb-6">Where Soul Meets Strategy</p>
            <p className="font-body text-sm text-surface/60 leading-relaxed max-w-xs">
              Where modern mystics learn real magic — rooted in intention, guided by intuition.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="eyebrow text-gold mb-6">Navigate</p>
            <div className="flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-body text-sm text-surface/60 hover:text-surface transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social + Contact */}
          <div>
            <p className="eyebrow text-gold mb-6">Connect</p>
            <div className="flex flex-col gap-3 mb-8">
              {socialLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-surface/60 hover:text-surface transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
            <a
              href="mailto:connect@enchantinglifeunleashed.com"
              className="font-body text-sm text-gold hover:text-gold/80 transition-colors"
            >
              connect@enchantinglifeunleashed.com
            </a>
          </div>
        </div>

        <div className="border-t border-surface/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-label text-xs text-surface/40 uppercase tracking-widest">
            © {new Date().getFullYear()} Enchanting Life Unleashed. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="font-label text-xs text-surface/40 uppercase tracking-widest hover:text-surface/60 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="font-label text-xs text-surface/40 uppercase tracking-widest hover:text-surface/60 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
