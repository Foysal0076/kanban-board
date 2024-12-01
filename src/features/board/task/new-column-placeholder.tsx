'use client'

import { useModal } from '@/components/modal/use-modal'
import { Button } from '@/components/ui'
import BoardFormModalView from '@/features/board/create-board/board-form-modal'
import { useBoardStore } from '@/features/board/store/board.store'

export default function NewColumnPlaceholder() {
  const { openModal } = useModal()
  const { activeBoard } = useBoardStore()

  const handleAddColumn = () => {
    openModal({
      view: (
        <BoardFormModalView
          initialData={activeBoard?.board}
          isAddColumnForm={true}
        />
      ),
    })
  }

  return (
    <div className='flex min-h-full w-[17.5rem] flex-col'>
      <div className='h-11' />
      <div className='flex grow items-center justify-center rounded border bg-gradient-to-b from-background to-popover'>
        <Button
          variant={'link'}
          className='text-lg hover:no-underline'
          onClick={handleAddColumn}>
          <span className='font-semibold'>
            {' '}
            <span className='text-lg'>+</span> Add column
          </span>
        </Button>
      </div>
    </div>
  )
}
