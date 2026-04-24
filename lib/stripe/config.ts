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
