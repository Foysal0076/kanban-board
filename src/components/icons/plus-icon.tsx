import { SVGProps } from 'react'

import { cn } from '@/utils'

interface Props extends SVGProps<SVGSVGElement> {}

export const PlusIcon = ({ className, ...props }: Props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={cn('h-5 w-5', className)}
      fill='currentColor'
      viewBox='0 0 256 256'
      {...props}>
      <rect width='256' height='256' fill='none' />
      <line
        x1='40'
        y1='128'
        x2='216'
        y2='128'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='16'
      />
      <line
        x1='128'
        y1='40'
        x2='128'
        y2='216'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='16'
      />
    </svg>
  )
}
