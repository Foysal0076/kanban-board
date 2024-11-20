import Link from 'next/link'

import { Button } from '@/components/ui'
import { pageRoutes } from '@/shared/config/page-routes'
import { cn } from '@/utils'

type Props = {
  fullWidth?: boolean
}

export default function AuthButtons({ fullWidth }: Props) {
  return (
    <div className={cn('flex items-center gap-2', fullWidth && 'w-full')}>
      <Link href={pageRoutes.login} className='w-full'>
        <Button
          variant='outline'
          size='sm'
          className={cn('', fullWidth && 'w-full')}>
          Login
        </Button>
      </Link>
      <Link href={pageRoutes.register} className='w-full'>
        <Button size='sm' className={cn('', fullWidth && 'w-full')}>
          Register
        </Button>
      </Link>
    </div>
  )
}
