import { SVGProps } from 'react'

import { cn } from '@/utils'

interface Props extends SVGProps<SVGSVGElement> {}

export const CheckIcon = ({
  className,
  strokeWidth = '16',
  ...props
}: Props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={cn('h-5 w-5', className)}
      fill='currentColor'
      viewBox='0 0 256 256'
      strokeWidth={strokeWidth}
      {...props}>
      <rect width='256' height='256' fill='none' />
      <polyline
        points='40 144 96 200 224 72'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
