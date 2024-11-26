import { SVGProps } from 'react'

import { cn } from '@/utils'

interface Props extends SVGProps<SVGSVGElement> {}

export const KeyIcon = ({ className, ...props }: Props) => {
  return (
    <svg
      fill='currentColor'
      viewBox='0 0 256 256'
      className={cn('h-5 w-5', className)}
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <rect width='256' height='256' fill='none' />
      <path
        d='M93.17,122.83A71.68,71.68,0,0,1,88,95.91c0-38.58,31.08-70.64,69.64-71.87A72,72,0,0,1,232,98.36C230.73,136.92,198.67,168,160.09,168a71.68,71.68,0,0,1-26.92-5.17h0L120,176H96v24H72v24H40a8,8,0,0,1-8-8V187.31a8,8,0,0,1,2.34-5.65l58.83-58.83Z'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='16'
      />
      <circle cx='180' cy='76' r='12' />
    </svg>
  )
}