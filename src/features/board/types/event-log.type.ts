import { ShortBoardInfo } from '@/features/board/types/board.type'
import { ShortUserInfo } from '@/features/board/types/user.type'

export type EventLog = {
  id: string
  boardId: ShortBoardInfo
  user: ShortUserInfo
  action: string
  createdAt: Date
}
