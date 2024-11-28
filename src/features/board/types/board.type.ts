import { ShortUserInfo } from '@/features/board/types/user.type'

export type Board = {
  id: string
  title: string
  description?: string
  owner: ShortUserInfo
  invitees: ShortUserInfo[]
  columns: string[]
  isArchived?: boolean
  createdAt: Date
  updatedAt: Date
}

export type ShortBoardInfo = { id: string; title: string }
