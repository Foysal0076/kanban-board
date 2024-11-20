import { ShortUserInfo } from '@/features/board/types/user.type'

export type Board = {
  id: string
  title: string
  owner: ShortUserInfo
  invitees: ShortUserInfo[]
  columns: string[]
}

export type ShortBoardInfo = { id: string; title: string }
