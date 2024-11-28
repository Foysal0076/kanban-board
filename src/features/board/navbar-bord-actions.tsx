'use client'

import { useParams } from 'next/navigation'

import { useBoardStore } from '@/features/board/store/board.store'

export default function NavbarBoardActions() {
  const { boardId } = useParams()

  const {} = useBoardStore()

  return <div>NavbarBoardActions</div>
}
