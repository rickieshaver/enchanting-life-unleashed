import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Enchanting Life Unleashed collects, uses, and protects your personal information — what we store, why we store it, and what we never share.',
  alternates: { canonical: '/privacy' },
}

/**
 * Privacy Policy — /privacy
 *
 * Static server component. No client-side JS needed.
 * Last updated: 2026-05-24
 *
 * Accuracy notes (update this comment when data practices change):
 * - Email collection: Resend (newsletter-subscribe, qsg-optin, quiz-submit routes)
 * - Payment processing: Stripe (checkout-sbs, checkout-starter-kit, checkout-planner routes)
 * - Bot protection: Cloudflare Turnstile (all 3 form endpoints)
 * - Hosting/logs: Vercel
 * - Analytics: Vercel Web Analytics (@vercel/analytics) — cookieless, anonymized, aggregate page-view counts only; no PII, no cross-site tracking. Speed Insights NOT installed.
 * - Pinterest Tag (pintrk): NOT installed
 * - Cookies: Next.js/Vercel infrastructure only (no app-level cookie setting)
 */

const LAST_UPDATED = 'May 24, 2026'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-8 md:px-12 py-20 md:py-28">

        {/* Header */}
        <div className="mb-16">
          <p className="eyebrow text-secondary mb-4">Legal</p>
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-6">
            Privacy Policy
          </h1>
          <p className="font-body text-sm text-on-surface-variant">
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        {/* Body */}
        <div className="prose-elu space-y-12">

          {/* 1 — Who we are */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-primary mb-4">
              Who we are
            </h2>
            <div className="space-y-4 font-body text-base text-on-surface-variant leading-relaxed">
              <p>
                We are <strong className="text-primary">Enchanting Life Unleashed</strong> — a
                digital education and personal development brand focused on sacred living, boundary
                work, and lunar alignment. This site lives at{' '}
                <a
                  href="https://enchantinglifeunleashed.com"
                  className="text-secondary underline decoration-gold/40 hover:decoration-gold transition-colors"
                >
                  enchantinglifeunleashed.com
                </a>
                .
              </p>
              <p>
                The business is owned and operated by Rickie Shaver as a solo founder. There is no
                team beyond Rickie and AI systems that help run operations. For any privacy
                questions, reach out directly using the contact information at the bottom of this
                policy.
              </p>
            </div>
          </section>

          <hr className="border-gold/20" />

          {/* 2 — What we collect */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-primary mb-4">
              What we collect
            </h2>
            <div className="space-y-6 font-body text-base text-on-surface-variant leading-relaxed">

              <div>
                <h3 className="font-headline text-lg font-bold text-primary mb-2">
                  Email address and first name
                </h3>
                <p>
                  When you subscribe to the newsletter, request the free Lunar Alignment Quick Start
                  Guide, or complete the Boundary Archetype Quiz, we ask for your email address.
                  The QSG opt-in form and quiz also ask for your first name so we can address emails
                  to you personally. Providing a name is optional — if you skip it, we use
                  &ldquo;Friend.&rdquo;
                </p>
              </div>

              <div>
                <h3 className="font-headline text-lg font-bold text-primary mb-2">
                  Quiz answers and archetype results
                </h3>
                <p>
                  When you complete the Boundary Archetype Quiz, we store your archetype result
                  (e.g., Open Door, Cracked Window, Sacred Keeper), your primary boundary area, and
                  the individual score breakdown. We use this to deliver a personalized result email
                  and tailor follow-up content to what resonates for you. These values are stored as
                  contact properties in Resend alongside your email address.
                </p>
              </div>

              <div>
                <h3 className="font-headline text-lg font-bold text-primary mb-2">
                  Payment information
                </h3>
                <p>
                  When you purchase a product, you complete checkout through Stripe. Stripe
                  collects your email address, credit card details, and billing name directly. We
                  never see or store your full card number — Stripe handles all payment data. After
                  a successful purchase, Stripe sends us your email address and first name so we
                  can deliver your product and log the transaction. We store those, plus the
                  transaction amount and a Stripe session ID, as contact properties in Resend for
                  order fulfillment records.
                </p>
              </div>

              <div>
                <h3 className="font-headline text-lg font-bold text-primary mb-2">
                  IP address and browser fingerprint (Cloudflare Turnstile)
                </h3>
                <p>
                  Our forms use Cloudflare Turnstile for bot protection. Before your form
                  submission reaches us, Cloudflare evaluates whether you are a human by
                  analyzing your IP address and browser signals. We do not receive this data
                  directly — Cloudflare processes it on their infrastructure and returns a
                  pass/fail result to our server.
                </p>
              </div>

              <div>
                <h3 className="font-headline text-lg font-bold text-primary mb-2">
                  Server request logs (Vercel)
                </h3>
                <p>
                  The site is hosted on Vercel. Like every web host, Vercel logs standard server
                  request data including IP address, user agent, request path, and timestamp. We
                  do not control this logging directly — it is part of Vercel&apos;s infrastructure
                  operation. These logs are retained according to Vercel&apos;s own retention policy.
                </p>
              </div>

              <div>
                <h3 className="font-headline text-lg font-bold text-primary mb-2">
                  What we do NOT collect
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    No Google Analytics, Facebook Pixel, Pinterest Tag, or any other third-party
                    behavioral or advertising tracking is installed on this site.
                  </li>
                  <li>
                    We use Vercel Web Analytics — a privacy-friendly, cookieless tool that records
                    aggregate page-view counts only. It does not use cookies, does not collect
                    personal information, and does not track you across other websites. Vercel Speed
                    Insights is not active.
                  </li>
                  <li>We do not use session recording tools (Hotjar, FullStory, etc.).</li>
                  <li>We do not sell data to data brokers.</li>
                </ul>
              </div>

            </div>
          </section>

          <hr className="border-gold/20" />

          {/* 3 — How we use it */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-primary mb-4">
              How we use it
            </h2>
            <div className="space-y-4 font-body text-base text-on-surface-variant leading-relaxed">
              <ul className="space-y-3">
                <li>
                  <strong className="text-primary">Newsletter delivery.</strong> We send you a
                  welcome sequence and, if you stay subscribed, ongoing emails about sacred living,
                  lunar work, and boundary practice — roughly twice a week.
                </li>
                <li>
                  <strong className="text-primary">Product fulfillment.</strong> We email you your
                  purchased product immediately after checkout completes, using the email address
                  Stripe provides.
                </li>
                <li>
                  <strong className="text-primary">Free resource delivery.</strong> When you
                  request the Lunar Alignment Quick Start Guide, we email it to you.
                </li>
                <li>
                  <strong className="text-primary">Personalization.</strong> Your quiz archetype
                  and boundary area let us tailor the follow-up email sequence to content that
                  actually applies to your pattern — not a generic blast.
                </li>
                <li>
                  <strong className="text-primary">Bot prevention.</strong> Cloudflare Turnstile
                  token verification prevents automated abuse of our forms.
                </li>
                <li>
                  <strong className="text-primary">Order records.</strong> We retain purchase
                  data to fulfill future re-download requests and for basic bookkeeping.
                </li>
              </ul>
              <p>
                We do not use your data for advertising targeting, profile-building for third
                parties, or any purpose beyond what is listed above.
              </p>
            </div>
          </section>

          <hr className="border-gold/20" />

          {/* 4 — Who we share it with */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-primary mb-4">
              Who we share it with
            </h2>
            <div className="space-y-5 font-body text-base text-on-surface-variant leading-relaxed">

              <div>
                <h3 className="font-headline text-lg font-bold text-primary mb-1">Resend</h3>
                <p>
                  Our email service provider. We share your email address, first name (if provided),
                  and any quiz or purchase properties with Resend to store your contact record and
                  send transactional and marketing emails.{' '}
                  <a
                    href="https://resend.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary underline decoration-gold/40 hover:decoration-gold transition-colors"
                  >
                    Resend Privacy Policy
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-headline text-lg font-bold text-primary mb-1">Stripe</h3>
                <p>
                  Our payment processor. When you purchase a product, you interact directly with
                  Stripe&apos;s hosted checkout. Stripe collects and holds all payment details.
                  After purchase, Stripe sends us your email address, name, and transaction
                  amount.{' '}
                  <a
                    href="https://stripe.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary underline decoration-gold/40 hover:decoration-gold transition-colors"
                  >
                    Stripe Privacy Policy
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-headline text-lg font-bold text-primary mb-1">Vercel</h3>
                <p>
                  Our hosting provider. Vercel has access to server logs generated by requests to
                  this site. We do not actively share data with Vercel beyond what their
                  infrastructure naturally processes.{' '}
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary underline decoration-gold/40 hover:decoration-gold transition-colors"
                  >
                    Vercel Privacy Policy
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-headline text-lg font-bold text-primary mb-1">Cloudflare</h3>
                <p>
                  Bot protection via Turnstile. Cloudflare receives IP address and browser signals
                  from form submissions to determine whether the submission is human. We do not
                  receive this data — it stays with Cloudflare.{' '}
                  <a
                    href="https://www.cloudflare.com/privacypolicy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary underline decoration-gold/40 hover:decoration-gold transition-colors"
                  >
                    Cloudflare Privacy Policy
                  </a>
                </p>
              </div>

              <p>
                We share data with no other third parties. We do not sell, rent, or trade your
                information.
              </p>

            </div>
          </section>

          <hr className="border-gold/20" />

          {/* 5 — Your rights */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-primary mb-4">
              Your rights
            </h2>
            <div className="space-y-4 font-body text-base text-on-surface-variant leading-relaxed">
              <p>
                Depending on where you live, you have rights over your personal data. We honor all
                of the following regardless of jurisdiction — because they&apos;re just the right
                thing to do.
              </p>
              <ul className="space-y-3">
                <li>
                  <strong className="text-primary">Access.</strong> You can ask what data we hold
                  about you and receive a copy.
                </li>
                <li>
                  <strong className="text-primary">Correction.</strong> You can ask us to fix
                  inaccurate data.
                </li>
                <li>
                  <strong className="text-primary">Deletion.</strong> You can ask us to delete
                  your data. We will remove your contact record from Resend. Note that Stripe
                  retains payment records for legal and tax purposes even after deletion from our
                  side — request deletion from Stripe separately if needed.
                </li>
                <li>
                  <strong className="text-primary">Portability.</strong> You can ask for your
                  data in a portable format.
                </li>
                <li>
                  <strong className="text-primary">Opt out of marketing.</strong> Every marketing
                  email we send includes an unsubscribe link. You can also email us directly to
                  opt out at any time.
                </li>
                <li>
                  <strong className="text-primary">GDPR (EU/UK residents).</strong> You have the
                  right to object to processing, restrict processing, and lodge a complaint with
                  your local supervisory authority.
                </li>
                <li>
                  <strong className="text-primary">CCPA (California residents).</strong> You have
                  the right to know what personal information is collected, the right to delete,
                  and the right to opt out of sale. We do not sell personal information.
                </li>
              </ul>
              <p>
                To exercise any of these rights, email{' '}
                <a
                  href="mailto:connect@enchantinglifeunleashed.com"
                  className="text-secondary underline decoration-gold/40 hover:decoration-gold transition-colors"
                >
                  connect@enchantinglifeunleashed.com
                </a>
                . We will respond within 30 days.
              </p>
            </div>
          </section>

          <hr className="border-gold/20" />

          {/* 6 — Cookies and tracking */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-primary mb-4">
              Cookies and tracking
            </h2>
            <div className="space-y-4 font-body text-base text-on-surface-variant leading-relaxed">
              <p>
                This site does not set any first-party cookies for analytics, advertising, or
                personalization. Our analytics (Vercel Web Analytics) is cookieless and anonymized —
                it counts page views in aggregate without identifying you or tracking you across
                sites. We do not use advertising pixels or behavioral targeting scripts.
              </p>
              <p>
                Infrastructure-level cookies may be set by Vercel (for routing on preview
                deployments) and by Cloudflare Turnstile (for bot-detection state during form
                interactions). These are strictly functional and do not track you across sites.
              </p>
              <p>
                Because our analytics is cookieless and we run no cross-site or advertising
                tracking, there is no cookie consent banner — there is nothing to consent to beyond
                the infrastructure described above.
              </p>
            </div>
          </section>

          <hr className="border-gold/20" />

          {/* 7 — Data retention */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-primary mb-4">
              Data retention
            </h2>
            <div className="space-y-2 font-body text-base text-on-surface-variant leading-relaxed">
              <ul className="space-y-3">
                <li>
                  <strong className="text-primary">Newsletter subscribers.</strong> Retained until
                  you unsubscribe or request deletion.
                </li>
                <li>
                  <strong className="text-primary">Quiz submissions.</strong> Retained indefinitely
                  as contact properties in Resend, unless you request deletion.
                </li>
                <li>
                  <strong className="text-primary">QSG opt-in records.</strong> Retained until
                  you unsubscribe or request deletion.
                </li>
                <li>
                  <strong className="text-primary">Stripe payment records.</strong> Retained for
                  7 years for tax and legal compliance purposes, per standard accounting practice.
                  Stripe manages this retention independently.
                </li>
                <li>
                  <strong className="text-primary">Vercel server logs.</strong> Retained per
                  Vercel&apos;s own retention policy (typically 30 days for standard log data).
                </li>
              </ul>
            </div>
          </section>

          <hr className="border-gold/20" />

          {/* 8 — Security */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-primary mb-4">
              Security
            </h2>
            <div className="space-y-4 font-body text-base text-on-surface-variant leading-relaxed">
              <p>
                All data in transit between your browser and this site is encrypted via TLS
                (HTTPS). We do not store plain-text passwords — this site has no password-based
                authentication.
              </p>
              <p>
                Email data at rest is protected by Resend&apos;s infrastructure security. Payment
                data at rest is protected by Stripe&apos;s PCI-compliant infrastructure. We do not
                store payment card details ourselves at any point.
              </p>
              <p>
                No security system is perfect. If you believe your data has been compromised,
                contact us immediately at{' '}
                <a
                  href="mailto:connect@enchantinglifeunleashed.com"
                  className="text-secondary underline decoration-gold/40 hover:decoration-gold transition-colors"
                >
                  connect@enchantinglifeunleashed.com
                </a>
                .
              </p>
            </div>
          </section>

          <hr className="border-gold/20" />

          {/* 9 — Children's privacy */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-primary mb-4">
              Children&apos;s privacy
            </h2>
            <div className="font-body text-base text-on-surface-variant leading-relaxed">
              <p>
                This site is not directed at children under 13. We do not knowingly collect
                personal information from anyone under 13. If you believe a child has submitted
                data through this site, contact us and we will delete it promptly.
              </p>
            </div>
          </section>

          <hr className="border-gold/20" />

          {/* 10 — Changes */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-primary mb-4">
              Changes to this policy
            </h2>
            <div className="font-body text-base text-on-surface-variant leading-relaxed">
              <p>
                If our data practices change in a meaningful way, we will update this policy and
                revise the &ldquo;Last updated&rdquo; date at the top. We will not retroactively
                apply a new policy to data collected under a prior one without your consent.
              </p>
            </div>
          </section>

          <hr className="border-gold/20" />

          {/* 11 — Contact */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-primary mb-4">
              Contact
            </h2>
            <div className="space-y-4 font-body text-base text-on-surface-variant leading-relaxed">
              <p>
                For any privacy requests — access, correction, deletion, opt-out, or questions
                about this policy — email:
              </p>
              <p>
                <strong className="text-primary">Rickie Shaver</strong>
                <br />
                Enchanting Life Unleashed
                <br />
                <a
                  href="mailto:connect@enchantinglifeunleashed.com"
                  className="text-secondary underline decoration-gold/40 hover:decoration-gold transition-colors"
                >
                  connect@enchantinglifeunleashed.com
                </a>
              </p>
              <p className="text-sm">
                We will respond to all privacy requests within 30 days.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
