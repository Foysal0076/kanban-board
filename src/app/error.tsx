'use client'

import { RefreshIcon } from '@/components/icons/refresh-icon'
import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error
  reset: () => void
}

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <div className='flex min-h-[80vh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <h1 className='h3 mb-2'>Oops! Something went wrong</h1>
          <div className='mb-4 text-destructive max-sm:text-sm'>
            <pre className='rounded-md bg-muted px-2 py-4'>
              <code>{error.message || 'An unexpected error occurred'}</code>
            </pre>
          </div>
          <Button onClick={reset} className='mx-auto flex items-center'>
            <span>Try again</span> <RefreshIcon className='ml-2' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Error
