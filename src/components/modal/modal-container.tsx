import { PlusIcon } from '@/components/icons'
import { cn } from '@/utils'

type Props = {
  children: React.ReactNode
  handleClose?: () => void
  className?: string
  title?: string
  childrenClassName?: string
}

const ModalContainer = ({
  children,
  className,
  handleClose,
  title,
  childrenClassName,
}: Props) => {
  return (
    <div
      className={cn(
        'relative max-h-screen overflow-y-auto rounded-2xl bg-popover max-sm:w-[90vw]',
        className
      )}>
      {title && (
        <div className='p-4 md:p-8 md:pb-6'>
          <p className='text-display-xs lg:text-display-sm font-bold text-neutral-900'>
            {' '}
            {title}{' '}
          </p>
          {handleClose && (
            <button
              onClick={handleClose}
              className='hover:border-secondary-400 group absolute right-4 top-4 p-2 transition-all duration-300 md:right-4 md:top-4'
              aria-label='close modal'>
              <PlusIcon
                className='rotate-45 transition-all duration-300 group-hover:text-red-600'
                width={24}
              />
            </button>
          )}
        </div>
      )}
      <div className={cn('w-full p-4 md:w-[27rem]', childrenClassName)}>
        {children}
      </div>
    </div>
  )
}

export default ModalContainer
