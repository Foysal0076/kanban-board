'use client'

import { useParams } from 'next/navigation'

import { pageRoutes } from '@/config/page-routes'
import BoardListItem from '@/features/board/board-list-item'
import { useBoardStore } from '@/features/board/store/board.store'

export default function BoardList() {
  const { boards } = useBoardStore()
  const { boardId } = useParams()

  return (
    <div className='flex flex-col'>
      {boards.map((board) => (
        <BoardListItem
          key={board.id}
          title={board.title}
          href={pageRoutes.board(board.id)}
          isActive={boardId === board.id}
        />
      ))}
    </div>
  )
}
