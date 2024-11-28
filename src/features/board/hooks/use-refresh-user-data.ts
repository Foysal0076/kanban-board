import { useParams } from 'next/navigation'
import { useEffect } from 'react'

import { useBoardStore } from '@/features/board/store/board.store'
import { useAuth } from '@/hooks/use-auth'

export const useRefreshUserData = () => {
  const { isAuthenticated, user } = useAuth()
  const { refreshBoardList, setActiveBoard, boards } = useBoardStore()
  const { boardId } = useParams()

  useEffect(() => {
    if (user && isAuthenticated) {
      refreshBoardList(user.id)
    }
  }, [user?.id, isAuthenticated])

  useEffect(() => {
    if (boards?.length && user?.id) {
      if (!boardId) {
        setActiveBoard(boards[0].id)
      } else {
        setActiveBoard(boardId as string)
      }
    }
  }, [user?.id, boards, boardId])
}
