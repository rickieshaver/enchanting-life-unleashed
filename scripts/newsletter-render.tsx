#!/usr/bin/env npx tsx
/**
 * newsletter-render.tsx — CLI render helper for Wren's broadcast pipeline.
 *
 * Called by Barbara's renderer.mjs via child_process.spawn.
 * Reads a JSON payload from argv[2], renders the named template,
 * and writes { html, text } JSON to stdout.
 *
 * Usage (internal — do not call directly):
 *   npx tsx scripts/newsletter-render.tsx '<json-payload>'
 *
 * Payload shape:
 *   {
 *     template: 'wed-digest' | 'sun-editorial',
 *     props: WedDigestProps | SunEditorialProps
 *   }
 *
 * Output (stdout):
 *   { html: string, text: string }
 *
 * Exits 1 on any error — stderr carries the message.
 * This script must stay pure I/O: no file writes, no Resend calls.
 */

import { render } from '@react-email/render'
import React from 'react'
import WedDigest from '../app/emails/newsletter/wed-digest.tsx'
import type { WedDigestProps } from '../app/emails/newsletter/wed-digest.tsx'
import SunEditorial from '../app/emails/newsletter/sun-editorial.tsx'
import type { SunEditorialProps } from '../app/emails/newsletter/sun-editorial.tsx'

const TEMPLATES: Record<string, React.ComponentType<any>> = {
  'wed-digest': WedDigest,
  'sun-editorial': SunEditorial,
}

async function main() {
  const payloadArg = process.argv[2]

  if (!payloadArg) {
    process.stderr.write('[newsletter-render] ERROR: payload JSON must be passed as argv[2]\n')
    process.exit(1)
  }

  let payload: { template: string; props: Record<string, unknown> }
  try {
    payload = JSON.parse(payloadArg)
  } catch {
    process.stderr.write('[newsletter-render] ERROR: argv[2] is not valid JSON\n')
    process.exit(1)
  }

  const { template, props } = payload

  if (!template || !TEMPLATES[template]) {
    process.stderr.write(
      `[newsletter-render] ERROR: unknown template "${template}". Must be one of: ${Object.keys(TEMPLATES).join(', ')}\n`
    )
    process.exit(1)
  }

  if (!props || typeof props !== 'object') {
    process.stderr.write('[newsletter-render] ERROR: props must be a non-null object\n')
    process.exit(1)
  }

  const Component = TEMPLATES[template]

  let html: string
  let text: string
  try {
    const element = React.createElement(Component, props as any)
    html = await render(element)
    text = await render(element, { plainText: true })
  } catch (err: any) {
    process.stderr.write(
      `[newsletter-render] ERROR: render failed for template "${template}": ${err?.message ?? String(err)}\n`
    )
    process.exit(1)
  }

  // Emit JSON on stdout — renderer.mjs captures this
  process.stdout.write(JSON.stringify({ html, text }) + '\n')
}

main()
