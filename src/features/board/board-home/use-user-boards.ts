import { useEffect, useState } from 'react'

import { getUserBoards } from '@/features/board/service/board.service'
import { Board } from '@/features/board/types/board.type'
import { useAuth } from '@/hooks/use-auth'

export const useUserBoards = () => {
  const { user } = useAuth()
  const [boards, setBoards] = useState<Board[]>([])

  useEffect(() => {
    setBoards(getUserBoards(user?.id))
  }, [user?.id])

  return { userBoards: boards }
}
