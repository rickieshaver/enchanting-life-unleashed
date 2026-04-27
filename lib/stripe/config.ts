// Stripe product + price IDs for Sacred Boundary System.
// Created via scripts/stripe-create-sbs.mjs on 2026-04-24.
// NOTE: These IDs are sandbox/test-mode. When flipping to live mode,
// re-run the script against live keys and update these constants.
export const SBS = {
  productId: 'prod_UOWhnkq1Dt3L7j',
  priceId: 'price_1TPjdoQdsuKUn5hCLegAx7Lc',
  priceUsd: 17,
  slug: 'sacred-boundary-system',
  pdfPath: '/downloads/sacred-boundary-system.pdf',
  name: 'The Sacred Boundary System',
} as const

// Stripe product + price IDs for Lunar Alignment Starter Kit ($7 tripwire).
// Created via scripts/stripe-create-starter-kit.mjs on 2026-04-27.
// NOTE: These IDs are sandbox/test-mode. When flipping to live mode,
// re-run the script against live keys and update these constants.
// Two-PDF delivery: workbook (26pp paid product) + tracker (1pp companion).
export const STARTER_KIT = {
  productId: 'prod_UPgJ0Ot2rPzaRX',
  priceId: 'price_1TQqwfQdsuKUn5hCnXPtMWnv',
  priceUsd: 7,
  slug: 'lunar-alignment-starter-kit',
  workbookPdfPath: '/downloads/lunar-alignment-starter-kit-workbook.pdf',
  trackerPdfPath: '/downloads/lunar-alignment-starter-kit-tracker.pdf',
  name: 'The Lunar Alignment Starter Kit',
} as const
