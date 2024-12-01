import { ShortUserInfo } from '@/features/board/types/user.type'

export type BoardColumn = {
  title: string
  color: string
}

export type Board = {
  id: string
  title: string
  description?: string
  owner: ShortUserInfo
  invitees: ShortUserInfo[]
  columns: BoardColumn[]
  isArchived?: boolean
  createdAt: Date
  updatedAt: Date
}

export type ShortBoardInfo = { id: string; title: string }
