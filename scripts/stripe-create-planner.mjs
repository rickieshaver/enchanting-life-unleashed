// One-shot: create the Lunar Alignment Planner product + $27 price in Stripe.
// Run from project root: node --env-file=.env.local scripts/stripe-create-planner.mjs
// Copy the PRODUCT_ID + PRICE_ID output into lib/stripe/config.ts (PLANNER).

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

const PRODUCT_METADATA_SLUG = 'lunar-alignment-planner'

async function findOrCreateProduct() {
  const existing = await stripe.products.search({
    query: `metadata['slug']:'${PRODUCT_METADATA_SLUG}'`,
  })
  if (existing.data.length > 0) {
    console.log(`↩ Product already exists: ${existing.data[0].id}`)
    return existing.data[0]
  }
  const product = await stripe.products.create({
    name: 'The Lunar Alignment Planner',
    description:
      'An undated 202-page planner for twelve cycles of intentional practice. The third step of the Lunar Alignment System. Built to use, not to admire — fillable spreads for every cycle, annual theme + intentions worksheet, four quarterly review spreads, full year-end reflection.',
    metadata: {
      slug: PRODUCT_METADATA_SLUG,
      version: 'v1',
      format: 'pdf',
    },
    statement_descriptor: 'ELU PLANNER',
    tax_code: 'txcd_10000000', // digital goods
  })
  console.log(`✓ Created product: ${product.id}`)
  return product
}

async function findOrCreatePrice(productId) {
  const prices = await stripe.prices.list({ product: productId, active: true, limit: 10 })
  const existing = prices.data.find(
    (p) => p.unit_amount === 2700 && p.currency === 'usd' && p.type === 'one_time',
  )
  if (existing) {
    console.log(`↩ Price already exists: ${existing.id}`)
    return existing
  }
  const price = await stripe.prices.create({
    product: productId,
    unit_amount: 2700,
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
