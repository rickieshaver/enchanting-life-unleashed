import { BaseEmail, CTA, Heading, Lead, Paragraph, Signature } from '../_base'

export interface SunEditorialProps {
  subject: string
  openingLine: string
  body: string
  ctaHref?: string
  ctaLabel?: string
  previewText?: string
}

export default function SunEditorial({
  subject,
  openingLine,
  body,
  ctaHref,
  ctaLabel,
  previewText,
}: SunEditorialProps) {
  const preview = previewText ?? openingLine.slice(0, 120)

  // Split body on double newlines → one paragraph per block
  const paragraphs = body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <BaseEmail preview={preview}>
      <Heading>{subject}</Heading>

      <Lead>{openingLine}</Lead>

      {paragraphs.map((para, i) => (
        <Paragraph key={i}>{para}</Paragraph>
      ))}

      {ctaHref && ctaLabel && <CTA href={ctaHref} label={ctaLabel} />}

      <Signature />
    </BaseEmail>
  )
}
