'use client'
import { Button } from '@/components/ui'
import BoardList from '@/features/board/board-list'
import SidebarCreateBoardAction from '@/features/board/create-board/sidebar-create-board-action'
import { useBoardStore } from '@/features/board/store/board.store'
import { useUIStore } from '@/features/board/store/ui-state.store'
import { EyeSlashIcon } from '@/icons'

export default function BoardListSidebar() {
  const { toggleLeftSidebar } = useUIStore()
  const { boards } = useBoardStore()
  const totalBoards = boards.length

  return (
    <div className='flex h-full flex-col justify-between gap-8 border-r bg-card pb-8 pt-4'>
      <div className='flex flex-col pr-6'>
        <div className='mb-4 pl-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground'>
          Al Boards ({totalBoards})
        </div>
        <BoardList />
        <div className='mt-4 pl-5'>
          <SidebarCreateBoardAction />
        </div>
      </div>
      <div className='px-8'>
        <Button variant='ghost' className='w-full' onClick={toggleLeftSidebar}>
          <div className='flex gap-1'>
            <EyeSlashIcon />
            <span className='font-semibold'>Hide Sidebar</span>
          </div>
        </Button>
      </div>
    </div>
  )
}
