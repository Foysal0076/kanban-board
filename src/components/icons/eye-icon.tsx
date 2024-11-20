import { SVGProps } from 'react'

import { cn } from '@/utils'

interface Props extends SVGProps<SVGSVGElement> {}

export const EyeIcon = ({ className, ...props }: Props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={cn('h-5 w-5', className)}
      fill='currentColor'
      viewBox='0 0 256 256'
      {...props}>
      <rect width='256' height='256' fill='none' />
      <path
        d='M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='16'
      />
      <circle
        cx='128'
        cy='128'
        r='40'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='16'
      />
    </svg>
  )
}
