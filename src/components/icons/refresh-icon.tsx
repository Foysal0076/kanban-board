import { SVGProps } from 'react'

import { cn } from '@/utils'

interface Props extends SVGProps<SVGSVGElement> {}

export const RefreshIcon = ({ className, ...props }: Props) => {
  return (
    <svg
      fill='currentColor'
      viewBox='0 0 256 256'
      className={cn('h-5 w-5', className)}
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <rect width='256' height='256' fill='none' />
      <polyline
        points='184 104 232 104 232 56'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='16'
      />
      <path
        d='M188.4,192a88,88,0,1,1,1.83-126.23L232,104'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='16'
      />
    </svg>
  )
}
