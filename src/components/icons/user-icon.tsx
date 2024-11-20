import { SVGProps } from 'react'

import { cn } from '@/utils'

interface Props extends SVGProps<SVGSVGElement> {}

export const UserIcon = ({ className, ...props }: Props) => {
  return (
    <svg
      fill='currentColor'
      viewBox='0 0 256 256'
      className={cn('h-5 w-5', className)}
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <rect width='256' height='256' fill='none' />
      <circle
        cx='128'
        cy='96'
        r='64'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='16'
      />
      <path
        d='M32,216c19.37-33.47,54.55-56,96-56s76.63,22.53,96,56'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='16'
      />
    </svg>
  )
}
