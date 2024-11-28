'use client'
import { Button } from '@/components/ui'
import { useUIStore } from '@/features/board/store/ui-state.store'
import { EyeSlashIcon } from '@/icons'

export default function BoardListSidebar() {
  const { toggleLeftSidebar } = useUIStore()

  return (
    <div className='flex h-full flex-col justify-between gap-8 bg-card pb-8 pt-4'>
      <div className='flex flex-col'>list</div>
      <div className='mx-auto'>
        <Button variant='ghost' onClick={toggleLeftSidebar}>
          <div className='flex gap-1'>
            <EyeSlashIcon />
            <span className='font-semibold'>Hide Sidebar</span>
          </div>
        </Button>
      </div>
    </div>
  )
}
