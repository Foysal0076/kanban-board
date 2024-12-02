'use client'

import { useModal } from '@/components/modal/use-modal'
import PageLoader from '@/components/page-loader'
import { Button } from '@/components/ui'
import BoardCard from '@/features/board/board-home/board-card'
import { useUserBoards } from '@/features/board/board-home/use-user-boards'
import BoardFormModalView from '@/features/board/create-board/board-form-modal'
import { useAuth } from '@/hooks/use-auth'

export default function BoardHome() {
  const { isLoading } = useAuth()
  const { userBoards } = useUserBoards()
  const { openModal } = useModal()

  if (isLoading) return <PageLoader />

  return (
    <div className='container py-8 md:py-20'>
      <h1 className='h3 mb-4 font-semibold md:mb-8'>My Boards</h1>
      <div className='grid grid-cols-[repeat(auto-fit,_minmax(12rem,_1fr))] gap-6'>
        {userBoards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </div>
      <div className='my-10 flex'>
        <Button
          className='mx-auto max-md:w-full'
          variant='ghost'
          onClick={() => openModal({ view: <BoardFormModalView /> })}>
          <span className='font-semibold text-primary'>
            <span className='text-lg'>+</span> Create new board
          </span>
        </Button>
      </div>
    </div>
  )
}
