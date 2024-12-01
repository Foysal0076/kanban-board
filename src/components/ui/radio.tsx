import { forwardRef, InputHTMLAttributes } from 'react'

import { cn } from '@/utils'

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className='flex items-center space-x-2'>
        <input
          {...props}
          ref={ref}
          type='radio'
          id={id}
          className={cn(
            'text-primary-600 h-4 w-4 border-border bg-accent focus:ring-2 focus:ring-primary',
            className
          )}
        />
        {label && (
          <label
            htmlFor={id}
            className='cursor-pointer select-none text-sm text-foreground'>
            {label}
          </label>
        )}
      </div>
    )
  }
)
