import Image from 'next/image'

import { cn, createInitial } from '@/utils'

type Props = {
  name: string
  url?: string
  size?: number
  className?: string
  textClassName?: string
}

const Avatar = ({ name, url, className, textClassName }: Props) => {
  const initial = createInitial(name)

  return (
    <div
      data-testid='avatar'
      className={cn(
        `relative flex h-8 w-8 items-center justify-center rounded-full border bg-card text-sm font-bold text-card-foreground`,
        className
      )}>
      {url ? (
        <Image
          src={url}
          alt={name}
          fill
          className='rounded-full object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          placeholder='blur'
          blurDataURL={`_next/image?url=${url}&w=16&q=1`}
        />
      ) : (
        <span className={cn('text-inherit', textClassName)}>{initial}</span>
      )}
    </div>
  )
}
Avatar.displayName = 'Avatar'

export { Avatar }
