import type { ReactNode } from 'react'

export function PostBody({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto px-8 md:px-12 py-16 md:py-20 post-body">
      {children}
    </div>
  )
}
