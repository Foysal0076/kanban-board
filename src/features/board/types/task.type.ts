import { Subtask } from '@/features/board/types/subtask.type'
import { ShortUserInfo } from '@/features/board/types/user.type'

export type Task = {
  id: string
  boardId: string
  title: string
  description?: string
  status: string
  assignee: ShortUserInfo
  subtasks: Subtask[]
  createdAt: Date
  updatedAt: Date
}
