import type {
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
  DroppableStateSnapshot,
} from '@hello-pangea/dnd'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import React, { CSSProperties, ReactElement } from 'react'

import TaskCard from '@/features/board/task/task-card'
import { Task } from '@/features/board/types/task.type'
import { cn } from '@/utils'

const scrollContainerHeight = 250

interface Props {
  listId?: string
  listType?: string
  tasks: Task[]
  title?: string
  internalScroll?: boolean
  scrollContainerStyle?: CSSProperties
  isDropDisabled?: boolean
  isCombineEnabled?: boolean
  style?: CSSProperties
  // may not be provided - and might be null
  ignoreContainerClipping?: boolean
  useClone?: boolean
}

interface TaskListProps {
  tasks: Task[]
}

function InnerTaskList(props: TaskListProps): ReactElement {
  return (
    <div className='flex flex-col gap-6'>
      {props.tasks.map((task: Task, index: number) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(
            dragProvided: DraggableProvided,
            dragSnapshot: DraggableStateSnapshot
          ) => (
            <TaskCard
              key={task.id}
              task={task}
              isDragging={dragSnapshot.isDragging}
              isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
              provided={dragProvided}
            />
          )}
        </Draggable>
      ))}
    </div>
  )
}

const InnerTaskListMemo = React.memo<TaskListProps>(InnerTaskList)

interface InnerListProps {
  dropProvided: DroppableProvided
  tasks: Task[]
  title: string | undefined | null
}

function InnerList(props: InnerListProps) {
  const { tasks, dropProvided } = props
  const title = props.title ? <h2>{props.title}</h2> : null

  return (
    <div>
      {title}
      <div className='min-h-[250px] rounded pb-4' ref={dropProvided.innerRef}>
        <InnerTaskListMemo tasks={tasks} />
        {dropProvided.placeholder}
      </div>
    </div>
  )
}

export default function TaskList(props: Props): ReactElement {
  const {
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    listId = 'LIST',
    listType,
    style,
    tasks,
    title,
    useClone,
  } = props

  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
      renderClone={
        useClone
          ? (provided, snapshot, descriptor) => (
              <TaskCard
                task={tasks[descriptor.source.index]}
                provided={provided}
                isDragging={snapshot.isDragging}
                isClone
              />
            )
          : undefined
      }>
      {(
        dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot
      ) => (
        <div
          className={cn(
            'flex w-[15.625rem] select-none flex-col rounded pb-0 transition-all duration-200',
            { 'opacity-50': isDropDisabled },
            { 'bg-popover': dropSnapshot.isDraggingOver },
            { 'bg-card': dropSnapshot.draggingFromThisWith }
          )}
          style={style}
          {...dropProvided.droppableProps}>
          {internalScroll ? (
            <div
              className='overflow-y-auto overflow-x-hidden'
              style={{
                ...scrollContainerStyle,
                maxHeight: `${scrollContainerHeight}px`,
              }}>
              <InnerList
                tasks={tasks}
                title={title}
                dropProvided={dropProvided}
              />
            </div>
          ) : (
            <InnerList
              tasks={tasks}
              title={title}
              dropProvided={dropProvided}
            />
          )}
        </div>
      )}
    </Droppable>
  )
}
