import { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utils'

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export default function ScreenCenteredContent({ children, className }: Props) {
  return (
    <div
      className={cn(
        'flex min-h-[80vh] items-center justify-center',
        className
      )}>
      {children}
    </div>
  )
}
