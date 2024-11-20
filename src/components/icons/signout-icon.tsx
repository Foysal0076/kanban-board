import { SVGProps } from 'react'

import { cn } from '@/utils'

interface Props extends SVGProps<SVGSVGElement> {}

export const SignOutIcon = ({ className, ...props }: Props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={cn('h-5 w-5', className)}
      fill='currentColor'
      viewBox='0 0 256 256'
      {...props}>
      <rect width='256' height='256' fill='none' />
      <polyline
        points='112 40 48 40 48 216 112 216'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='16'
      />
      <line
        x1='112'
        y1='128'
        x2='224'
        y2='128'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='16'
      />
      <polyline
        points='184 88 224 128 184 168'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='16'
      />
    </svg>
  )
}
