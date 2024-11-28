import { useModal } from '@/components/modal/use-modal'
import { Button } from '@/components/ui'
import BoardFormModalView from '@/features/board/create-board/board-form-modal'

export default function SidebarCreateBoardAction() {
  const { openModal } = useModal()

  return (
    <Button
      className='w-full'
      variant='ghost'
      onClick={() => openModal({ view: <BoardFormModalView /> })}>
      <span className='font-semibold text-primary'>
        <span className='text-lg'>+</span> Create Board
      </span>
    </Button>
  )
}
