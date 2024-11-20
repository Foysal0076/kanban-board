import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  labelClassName?: string
  error?: string
  helperText?: string
  startAdornment?: {
    adornment: ReactNode
    onClick?: () => void
    className?: string
  }
  endAdornment?: {
    adornment: ReactNode
    onClick?: () => void
    className?: string
  }
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      disabled,
      error,
      labelClassName,
      helperText,
      startAdornment,
      endAdornment,
      ...props
    },
    ref
  ) => {
    return (
      <div className='relative flex flex-col gap-1.5'>
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              'text-sm font-medium',
              {
                'text-destructive': error,
                'after:ml-0.5 after:text-destructive after:content-["*"]':
                  props.required,
                'text-muted-foreground opacity-50': disabled,
              },
              labelClassName
            )}>
            {label}
          </label>
        )}
        <div className='relative'>
          <input
            type={type}
            className={cn(
              'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors',
              'file:border-0 file:bg-transparent file:text-sm file:font-medium',
              'placeholder:text-muted-foreground',
              'focus-visible:outline-none',
              'disabled:cursor-not-allowed disabled:opacity-50',
              {
                'pl-9': startAdornment,
                'pr-9': endAdornment,
                'focus-visible:ring-1 focus-visible:ring-ring': !error,
                'border-destructive ring-destructive': error,
              },
              className
            )}
            ref={ref}
            disabled={disabled}
            {...props}
          />
          {startAdornment && (
            <div
              onClick={startAdornment.onClick}
              className={cn(
                'absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground',
                { 'cursor-pointer': startAdornment.onClick },
                startAdornment.className
              )}>
              {startAdornment.adornment}
            </div>
          )}
          {endAdornment && (
            <div
              onClick={endAdornment.onClick}
              className={cn(
                'absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground',
                { 'cursor-pointer': endAdornment.onClick },
                endAdornment.className
              )}>
              {endAdornment.adornment}
            </div>
          )}
        </div>
        {(helperText || error) && (
          <span
            className={cn(
              'text-xs',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}>
            {error || helperText}
          </span>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
