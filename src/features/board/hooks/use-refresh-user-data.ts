import { useEffect } from 'react'

import { useBoardStore } from '@/features/board/store/board.store'
import { useAuth } from '@/hooks/use-auth'

export const useRefreshUserData = () => {
  const { isAuthenticated, user } = useAuth()
  const { refreshBoardList } = useBoardStore()

  useEffect(() => {
    if (user && isAuthenticated) {
      refreshBoardList(user.id)
    }
  }, [user?.id, isAuthenticated])
}
