import { SVGProps } from 'react'

import { cn } from '@/utils'

interface Props extends SVGProps<SVGSVGElement> {}

export const AppIcon = ({ className, ...props }: Props) => {
  return (
    <svg
      className={cn('h-8 w-8', className)}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 26'
      {...props}>
      <title>Kanban Icon</title>
      <g>
        <g transform='translate(0 1)' fill='currentColor'>
          <rect width='6' height='25' rx='2' />
          <rect opacity='.75' x='9' width='6' height='25' rx='2' />
          <rect opacity='.5' x='18' width='6' height='25' rx='2' />
        </g>
      </g>
    </svg>
  )
}
