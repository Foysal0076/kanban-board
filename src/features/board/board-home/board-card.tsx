'use client'

import Link from 'next/link'

import { pageRoutes } from '@/config/page-routes'
import { Board } from '@/features/board/types/board.type'

type Props = { board: Board }

export default function BoardCard({ board }: Props) {
  return (
    <Link className='card h-32 p-6' href={pageRoutes.board(board.id)}>
      <h3 className='mb-2 font-bold'>{board.title}</h3>
      <p className='line-clamp-2 text-sm font-medium text-muted-foreground'>
        {board.description}
      </p>
    </Link>
  )
}
