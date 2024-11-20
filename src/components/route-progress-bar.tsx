'use client'

import NextTopLoader from 'nextjs-toploader'

export default function RouteProgressBar() {
  return (
    <NextTopLoader
      color='hsl(var(--primary))'
      showSpinner={false}
      crawlSpeed={100}
      speed={100}
    />
  )
}
