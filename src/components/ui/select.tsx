import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { CaretDownIcon, CheckCircleIcon } from '@/icons'
import { cn } from '@/utils'

export type SelectOption = {
  value: string
  label: string
  icon?: React.ReactNode
}

type SelectProps = {
  id?: string
  className?: string
  options: SelectOption[]
  value: string
  onChange: (_value: string) => void
  required?: boolean
  label?: string
  labelClassName?: string
  caretClassName?: string
  error?: boolean
  errorMessage?: string
  disabled?: boolean
}

// Memoized option component
const SelectItem = memo(
  ({
    option,
    isSelected,
    isHighlighted,
    onSelect,
  }: {
    option: SelectOption
    isSelected: boolean
    isHighlighted: boolean
    onSelect: () => void
  }) => (
    <div
      role='option'
      aria-selected={isSelected}
      onClick={onSelect}
      className={cn(
        'flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-accent',
        isSelected ? `bg-primary/10 text-primary` : '',
        isHighlighted ? 'bg-accent' : ''
      )}>
      {option.icon && <>{option.icon}</>}
      <span className='block select-none truncate text-inherit'>
        {option.label}
      </span>
      {isSelected && <CheckCircleIcon className='ml-auto' />}
    </div>
  )
)

SelectItem.displayName = 'SelectItem'

const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      id,
      options,
      value,
      onChange,
      label = 'Select Option',
      error = false,
      errorMessage,
      disabled = false,
      required,
      labelClassName = '',
      caretClassName = '',
      className = '',
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const selectedOption = options.find((opt) => opt.value === value)
    const closeDropdown = useCallback(() => {
      containerRef.current?.focus()
      setIsOpen(false)
      setHighlightedIndex(-1)
    }, [])

    const handleSelect = useCallback(
      (optionValue: string) => {
        onChange(optionValue)
        closeDropdown()
      },
      [onChange, closeDropdown]
    )

    const toggleOpen = useCallback(() => {
      if (!disabled) {
        setIsOpen((prev) => !prev)
      }
    }, [disabled])

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          !containerRef.current?.contains(event.target as Node)
        ) {
          closeDropdown()
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [closeDropdown])

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (disabled) return

        switch (event.key) {
          case 'Enter':
          case ' ':
            if (!isOpen) {
              setIsOpen(true)
            } else if (highlightedIndex !== -1) {
              handleSelect(options[highlightedIndex].value)
            }
            event.preventDefault()
            break
          case 'ArrowDown':
            event.preventDefault()
            if (!isOpen) {
              setIsOpen(true)
            } else {
              setHighlightedIndex((prev) =>
                prev === options.length - 1 ? 0 : prev + 1
              )
            }
            break
          case 'ArrowUp':
            event.preventDefault()
            if (!isOpen) {
              setIsOpen(true)
            } else {
              setHighlightedIndex((prev) =>
                prev <= 0 ? options.length - 1 : prev - 1
              )
            }
            break
          case 'Escape':
            closeDropdown()
            break
          case 'Tab':
            if (isOpen) {
              closeDropdown()
            }
            break
        }
      },
      [isOpen, highlightedIndex, options, handleSelect, disabled, closeDropdown]
    )

    return (
      <div
        ref={ref}
        className='relative w-full min-w-[12.5rem] overflow-visible'>
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'text-sm font-medium',
              {
                'text-destructive': error,
                'after:ml-0.5 after:text-destructive after:content-["*"]':
                  required,
                'text-muted-foreground opacity-50': disabled,
              },
              labelClassName
            )}>
            {label}
          </label>
        )}
        <div
          aria-disabled={disabled}
          ref={containerRef}
          role='combobox'
          aria-expanded={isOpen}
          aria-haspopup='listbox'
          aria-controls='select-dropdown'
          aria-label={label}
          aria-required={required}
          aria-invalid={error}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
          className='rounded-default outline-none focus:border-primary'>
          <div
            data-testid='select-container'
            onClick={toggleOpen}
            className={cn(
              'flex h-9 w-full cursor-pointer items-center justify-between rounded-lg border border-input px-3 py-2 transition-all',
              disabled ? 'cursor-not-allowed opacity-50' : '',
              {
                'border-input focus:border-primary': !error,
                'ring-red-500 focus:ring-red-500': error,
                'border-primary': isOpen,
              },
              className
            )}>
            <div className='flex items-center gap-2'>
              {selectedOption?.icon && <>{selectedOption.icon}</>}
              <span
                data-testid='selected-option'
                className={cn(
                  'block truncate',
                  !selectedOption ? 'text-muted-foreground' : ''
                )}>
                {selectedOption ? selectedOption.label : 'Select option'}
              </span>
            </div>
            <CaretDownIcon
              className={cn(
                'h-4 w-4 text-primary transition-transform duration-300',
                isOpen ? 'rotate-180' : '',
                caretClassName
              )}
              aria-hidden='true'
            />
          </div>
        </div>

        {isOpen && (
          <div
            id='select-dropdown'
            ref={dropdownRef}
            role='listbox'
            aria-label={`${label} options`}
            className='absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border bg-popover py-1 shadow-lg'>
            {options.map((option, index) => (
              <SelectItem
                key={option.value}
                option={option}
                isSelected={option.value === value}
                isHighlighted={index === highlightedIndex}
                onSelect={() => handleSelect(option.value)}
              />
            ))}
          </div>
        )}

        {errorMessage && (
          <p role='alert' className='mt-1 text-sm text-red-500'>
            {errorMessage}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
const memoizedSelect = memo(Select)

export { memoizedSelect as Select }
