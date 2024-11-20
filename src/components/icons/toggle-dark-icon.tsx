import { SVGProps } from 'react'

import { cn } from '@/utils'

interface Props extends SVGProps<SVGSVGElement> {}

export const ToggleDarkIcon = ({ className, ...props }: Props) => {
  return (
    <svg
      fill='currentColor'
      viewBox='0 0 20 20'
      className={cn('h-5 w-5', className)}
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'></path>
    </svg>
  )
}
