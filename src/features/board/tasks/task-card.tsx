'use client'

import { Task } from '@/features/board/types/task.type'
import { cn } from '@/utils'

type Props = {
  task: Task
}

export default function TaskCard({ task }: Props) {
  const { title, description, subtasks } = task

  const getSubtaskDetails = () => {
    const totalSubtasks = subtasks.length
    const completedSubtasks = subtasks.filter(
      (subtask) => subtask.isCompleted
    ).length
    return `${completedSubtasks} of ${totalSubtasks} subtasks completed`
  }

  return (
    <div className='card px-4 py-6 shadow-md'>
      <h3 className='mb-2 font-bold'>{title}</h3>
      <p
        className={cn('text-sm font-bold text-muted-foreground', {
          hidden: !description,
        })}>
        {description}
      </p>
      <p className='text-sm font-bold text-muted-foreground'>
        {getSubtaskDetails()}
      </p>
    </div>
  )
}
