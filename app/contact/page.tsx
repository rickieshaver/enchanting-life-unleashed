import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Enchanting Life Unleashed',
  description:
    'Get in touch with Enchanting Life Unleashed. Inquiries, collaborations, and direct channels.',
}

const socialLinks = [
  { href: 'https://www.instagram.com/enchantinglifeunleashed/', label: 'Instagram' },
  { href: 'https://www.tiktok.com/@enchantinglifeunleashed', label: 'TikTok' },
  { href: 'https://www.pinterest.com/enchantinglifeunleashed/', label: 'Pinterest' },
  { href: 'https://www.youtube.com/@EnchantingLifeUnleashed', label: 'YouTube' },
  { href: 'https://www.linkedin.com/company/enchantinglifeunleashed/', label: 'LinkedIn' },
  { href: 'https://x.com/enchantinglifeU', label: 'X' },
  { href: 'https://www.facebook.com/enchantinglifeunleashed/', label: 'Facebook' },
]

export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-24 md:pt-32 pb-24 px-8 md:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-7">
            <div className="editorial-line mb-6" />
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline italic text-primary leading-tight tracking-tighter">
              Inquiries of <br />
              <span className="pl-12 md:pl-24 text-secondary">Intent.</span>
            </h1>
          </div>
          <div className="md:col-span-5 pb-4">
            <div className="flex items-start gap-4">
              <div className="w-px h-24 bg-gold/40" />
              <p className="font-script text-3xl text-secondary -mt-2">
                Where Soul Meets Strategy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHANNELS + FORM */}
      <section className="bg-surface-low py-24 md:py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Left: Direct Channels */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <h2 className="font-label text-xs uppercase tracking-[0.3em] text-secondary">
                Direct Channels
              </h2>
              <p className="text-3xl font-headline text-primary leading-relaxed">
                Your message is an inquiry of intent. We respond with the same precision we apply to
                our systems.
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-4 border-l border-gold/20 pl-8">
              <h3 className="font-label text-sm uppercase tracking-widest text-primary">Email</h3>
              <a
                href="mailto:connect@enchantinglifeunleashed.com"
                className="font-body text-lg text-secondary hover:text-primary transition-colors"
              >
                connect@enchantinglifeunleashed.com
              </a>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-4 border-l border-gold/20 pl-8">
              <h3 className="font-label text-sm uppercase tracking-widest text-primary">
                Social
              </h3>
              <div className="flex flex-col gap-3">
                {socialLinks.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-secondary hover:text-primary transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-surface p-10 md:p-16 relative z-10">
            <form
              action="mailto:connect@enchantinglifeunleashed.com"
              method="post"
              encType="text/plain"
              className="flex flex-col gap-10"
            >
              <div className="flex flex-col gap-8">
                <div className="relative">
                  <label className="block text-[10px] font-label uppercase tracking-widest text-primary mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    className="w-full bg-transparent border-0 border-b border-gold py-4 focus:outline-none focus:ring-0 focus:border-primary transition-colors font-body"
                  />
                </div>
                <div className="relative">
                  <label className="block text-[10px] font-label uppercase tracking-widest text-primary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    required
                    className="w-full bg-transparent border-0 border-b border-gold py-4 focus:outline-none focus:ring-0 focus:border-primary transition-colors font-body"
                  />
                </div>
                <div className="relative">
                  <label className="block text-[10px] font-label uppercase tracking-widest text-primary mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="What is this regarding?"
                    required
                    className="w-full bg-transparent border-0 border-b border-gold py-4 focus:outline-none focus:ring-0 focus:border-primary transition-colors font-body"
                  />
                </div>
                <div className="relative">
                  <label className="block text-[10px] font-label uppercase tracking-widest text-primary mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Describe what you need"
                    rows={6}
                    required
                    className="w-full bg-transparent border-0 border-b border-gold py-4 focus:outline-none focus:ring-0 focus:border-primary transition-colors font-body resize-none"
                  />
                </div>
              </div>
              <div className="pt-4">
                <button type="submit" className="btn-primary w-full text-center">
                  Submit
                </button>
                <p className="mt-6 text-[10px] text-center text-on-surface-variant/60 uppercase tracking-widest leading-relaxed">
                  We respond within 48 business hours.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
