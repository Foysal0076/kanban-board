import type {
  DraggableProvided,
  DraggableStateSnapshot,
} from '@hello-pangea/dnd'
import { Draggable } from '@hello-pangea/dnd'
import React from 'react'

import TaskList from '@/features/board/task/task-list'
import { Task } from '@/features/board/types/task.type'

interface Props {
  title: string
  color: string
  tasks: Task[]
  index: number
  isScrollable?: boolean
  isCombineEnabled?: boolean
  useClone?: boolean
}

export default function TaskColumn({
  title,
  color,
  tasks,
  index,
  isScrollable,
  isCombineEnabled,
  useClone,
}: Props) {
  const count = tasks.length
  return (
    <Draggable draggableId={title} index={index} isDragDisabled>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='flex flex-col'>
          <div
            className={`mb-6 flex items-center gap-2 transition-colors duration-200`}>
            <div
              className='h-3 w-3 rounded-full'
              style={{ backgroundColor: color ?? 'purple' }}
            />
            <h2 className='text-sm font-semibold uppercase text-muted-foreground'>
              {title} ({count})
            </h2>
          </div>
          <TaskList
            listId={title}
            listType='QUOTE'
            tasks={tasks}
            internalScroll={isScrollable}
            isCombineEnabled={isCombineEnabled}
            useClone={useClone}
          />
        </div>
      )}
    </Draggable>
  )
}
