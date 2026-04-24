// One-shot: create the Sacred Boundary System product + $17 price in Stripe.
// Run from project root: node --env-file=.env.local scripts/stripe-create-sbs.mjs
// Copy the PRICE_ID output into lib/stripe/config.ts (or wherever we reference it).

import Stripe from 'stripe'

const key = process.env.STRIPE_SECRET_KEY
if (!key) {
  console.error('STRIPE_SECRET_KEY missing from env')
  process.exit(1)
}
if (!key.startsWith('sk_test_')) {
  console.error(`Refusing to run against non-test key. Expected sk_test_..., got ${key.slice(0, 8)}...`)
  process.exit(1)
}

const stripe = new Stripe(key)

const PRODUCT_METADATA_SLUG = 'sacred-boundary-system'

async function findOrCreateProduct() {
  const existing = await stripe.products.search({
    query: `metadata['slug']:'${PRODUCT_METADATA_SLUG}'`,
  })
  if (existing.data.length > 0) {
    console.log(`↩ Product already exists: ${existing.data[0].id}`)
    return existing.data[0]
  }
  const product = await stripe.products.create({
    name: 'The Sacred Boundary System',
    description:
      'A repeatable, cycle-based system for women who know what they need to do and still aren\'t doing it. Eight lunar cycles. Four boundary domains. Three archetypes. Built to interrupt the pattern at the nervous system level — through daily structured practice tied to the lunar rhythm.',
    metadata: {
      slug: PRODUCT_METADATA_SLUG,
      version: 'v1',
      format: 'pdf',
    },
    statement_descriptor: 'ELU SBS',
    tax_code: 'txcd_10000000', // digital goods
  })
  console.log(`✓ Created product: ${product.id}`)
  return product
}

async function findOrCreatePrice(productId) {
  const prices = await stripe.prices.list({ product: productId, active: true, limit: 10 })
  const existing = prices.data.find(
    (p) => p.unit_amount === 1700 && p.currency === 'usd' && p.type === 'one_time',
  )
  if (existing) {
    console.log(`↩ Price already exists: ${existing.id}`)
    return existing
  }
  const price = await stripe.prices.create({
    product: productId,
    unit_amount: 1700,
    currency: 'usd',
    tax_behavior: 'inclusive',
    metadata: { slug: PRODUCT_METADATA_SLUG },
  })
  console.log(`✓ Created price: ${price.id}`)
  return price
}

const product = await findOrCreateProduct()
const price = await findOrCreatePrice(product.id)

console.log('')
console.log('═══════════════════════════════════')
console.log(`PRODUCT_ID = ${product.id}`)
console.log(`PRICE_ID   = ${price.id}`)
console.log('═══════════════════════════════════')
