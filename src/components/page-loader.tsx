import { Spinner } from '@/components/ui'

export default function PageLoader() {
  return (
    <div className='flex min-h-[70vh] items-center justify-center'>
      <Spinner className='text-primary' />
    </div>
  )
}
