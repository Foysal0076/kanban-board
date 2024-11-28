'use client'
import { Button } from '@/components/ui'
import { useUIStore } from '@/features/board/store/ui-state.store'
import { EyeIcon } from '@/icons'

export default function HideBoardListSidebarButton() {
  const { toggleLeftSidebar } = useUIStore()
  return (
    <Button
      onClick={toggleLeftSidebar}
      className='rounded-l-none rounded-r-full px-6'
      size={'lg'}>
      <EyeIcon />
    </Button>
  )
}
