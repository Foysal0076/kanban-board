import { SVGProps } from 'react'

import { cn } from '@/utils'

interface Props extends SVGProps<SVGSVGElement> {}

export const TrashIcon = ({ className, ...props }: Props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={cn('h-5 w-5', className)}
      fill='currentColor'
      viewBox='0 0 256 256'
      {...props}>
      <rect width='256' height='256' fill='none' />
      <line
        x1='216'
        y1='56'
        x2='40'
        y2='56'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='16'
      />
      <line
        x1='88'
        y1='24'
        x2='168'
        y2='24'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='16'
      />
      <path
        d='M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='16'
      />
    </svg>
  )
}
