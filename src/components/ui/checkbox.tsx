import { forwardRef, InputHTMLAttributes, useId } from 'react'

import { cn } from '@/utils'

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string
  containerClassName?: string
}

export const Checkbox = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, containerClassName = '', id, ...props }, ref) => {
    const _id = useId()

    return (
      <label
        htmlFor={`${id}_${_id}`}
        className={cn(
          'flex cursor-pointer items-center space-x-2',
          containerClassName
        )}>
        <input
          {...props}
          ref={ref}
          type='checkbox'
          id={`${id}_${_id}`}
          className={cn(
            'h-4 w-4 border-border checked:bg-primary focus:ring-2 focus:ring-primary',
            className
          )}
        />
        <span className='select-none text-sm text-foreground'>{label}</span>
      </label>
    )
  }
)
