import Link from 'next/link'

import { BoardIcon } from '@/icons'
import { cn } from '@/utils'

type Props = {
  isActive?: boolean
  title: string
  href: string
}

export default function BoardListItem({
  title,
  href,
  isActive = false,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        'mb-1 flex w-full items-center gap-3 rounded-l-none rounded-r-full py-2.5 pl-8 font-semibold tracking-wide transition-colors',
        {
          'bg-primary text-primary-foreground': isActive,
        },
        { 'text-muted-foreground/90 hover:bg-primary/20': !isActive }
      )}>
      <BoardIcon className='h-4 w-4' />
      <span>{title}</span>
    </Link>
  )
}
