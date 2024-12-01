'use client'

import { ChangeEvent } from 'react'
import toast from 'react-hot-toast'

import { Checkbox } from '@/components/ui'
import { useBoardStore } from '@/features/board/store/board.store'
import { Subtask } from '@/features/board/types/subtask.type'
import { Task } from '@/features/board/types/task.type'

type Props = {
  task: Task
  subTask: Subtask
}

export default function SubtaskItemInput({ task, subTask }: Props) {
  const { editTask, refreshActiveBoard, refreshBoardList } = useBoardStore()

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    const updateData = task.subtasks.map((subtask) => {
      if (subtask.id === subTask.id) {
        return { ...subtask, isCompleted: checked }
      }
      return subtask
    })
    const updatedTask = { ...task, subtasks: updateData }
    editTask(updatedTask)
    refreshActiveBoard()
    refreshBoardList(task.boardId)
    toast.success('Subtask updated successfully')
  }

  return (
    <Checkbox
      id={subTask.id}
      containerClassName='rounded-default bg-card p-3 hover:bg-primary/40'
      onChange={onChange}
      label={subTask.title}
      defaultChecked={subTask.isCompleted}
    />
  )
}
