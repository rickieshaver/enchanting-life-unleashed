// Stripe product + price IDs.
//
// Resolution order:
//   1. Environment variable (production sets these to live IDs)
//   2. Hardcoded fallback (test-mode IDs created via scripts/stripe-create-*.mjs)
//
// Production env in Vercel sets STRIPE_*_PRODUCT_ID + STRIPE_*_PRICE_ID to the
// live-mode IDs. Preview/dev environments fall through to the test IDs below,
// which pair with the test-mode STRIPE_SECRET_KEY in those scopes.

export const SBS = {
  productId: process.env.STRIPE_SBS_PRODUCT_ID || 'prod_UOWhnkq1Dt3L7j',
  priceId: process.env.STRIPE_SBS_PRICE_ID || 'price_1TPjdoQdsuKUn5hCLegAx7Lc',
  priceUsd: 17,
  slug: 'sacred-boundary-system',
  pdfPath: '/downloads/sacred-boundary-system.pdf',
  name: 'The Sacred Boundary System',
}

// Two-PDF delivery: workbook (26pp paid product) + tracker (1pp companion).
export const STARTER_KIT = {
  productId: process.env.STRIPE_STARTER_KIT_PRODUCT_ID || 'prod_UPgJ0Ot2rPzaRX',
  priceId: process.env.STRIPE_STARTER_KIT_PRICE_ID || 'price_1TQqwfQdsuKUn5hCnXPtMWnv',
  priceUsd: 7,
  slug: 'lunar-alignment-starter-kit',
  workbookPdfPath: '/downloads/lunar-alignment-starter-kit-workbook.pdf',
  trackerPdfPath: '/downloads/lunar-alignment-starter-kit-tracker.pdf',
  name: 'The Lunar Alignment Starter Kit',
}

export const PLANNER = {
  productId: process.env.STRIPE_PLANNER_PRODUCT_ID || 'prod_UPmFKjrZFfOqtI',
  priceId: process.env.STRIPE_PLANNER_PRICE_ID || 'price_1TQwgxQdsuKUn5hCvPdd5ikg',
  priceUsd: 27,
  slug: 'lunar-alignment-planner',
  pdfPath: '/downloads/lunar-alignment-planner.pdf',
  name: 'The Lunar Alignment Planner',
}
