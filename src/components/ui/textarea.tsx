import { forwardRef, TextareaHTMLAttributes } from 'react'

import { cn } from '@/utils'

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  labelClassName?: string
  error?: string
  helperText?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, label, disabled, error, labelClassName, helperText, ...props },
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
        <textarea
          className={cn(
            'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors',
            'placeholder:text-muted-foreground',
            'focus-visible:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            {
              'focus-visible:ring-1 focus-visible:ring-ring': !error,
              'border-destructive ring-destructive': error,
            },
            className
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />
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
Textarea.displayName = 'Textarea'

export { Textarea }
