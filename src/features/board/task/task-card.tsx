'use client'

import type { DraggableProvided } from '@hello-pangea/dnd'
import React, { CSSProperties } from 'react'

import { useModal } from '@/components/modal/use-modal'
import ViewTaskModalView from '@/features/board/task/view-task-modal-view'
import { Task } from '@/features/board/types/task.type'
import { cn } from '@/utils'

interface Props {
  task: Task
  isDragging: boolean
  provided: DraggableProvided
  isClone?: boolean
  isGroupedOver?: boolean
  style?: CSSProperties
  index?: number
}

function TaskCard(props: Props) {
  const { task, isDragging, isGroupedOver, provided, style, isClone, index } =
    props

  const getSubtaskDetails = () => {
    const totalSubtasks = task.subtasks.length
    const completedSubtasks = task.subtasks.filter(
      (subtask) => subtask.isCompleted
    ).length
    return `${completedSubtasks} of ${totalSubtasks} subtasks completed`
  }

  const { openModal } = useModal()

  const handleOpenTaskModal = () => {
    openModal({ view: <ViewTaskModalView task={task} /> })
  }

  return (
    <div
      role='button'
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      data-is-dragging={isDragging}
      data-testid={task.id}
      data-index={index}
      aria-label={`${task.title}`}
      className={cn(
        'card select-none px-4 py-6 text-start hover:cursor-pointer',
        isDragging ? 'shadow-md' : ''
      )}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleOpenTaskModal()
        }
      }}
      onClick={handleOpenTaskModal}>
      <h3 className='mb-2 font-bold'>{task.title}</h3>
      <p className='text-sm font-medium text-muted-foreground'>
        {getSubtaskDetails()}
      </p>
    </div>
  )
}

export default React.memo<Props>(TaskCard)
