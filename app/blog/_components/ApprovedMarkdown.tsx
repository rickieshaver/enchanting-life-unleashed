import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

export function ApprovedMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, children: linkChildren }) =>
          href?.startsWith('/') ? (
            <Link href={href}>{linkChildren}</Link>
          ) : (
            <a href={href} rel="noreferrer noopener">
              {linkChildren}
            </a>
          ),
        ol: ({ children: listChildren }) => (
          <ol className="my-4 list-decimal space-y-2 pl-6">{listChildren}</ol>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
