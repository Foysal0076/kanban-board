'use client'
import type {
  DraggableLocation,
  DroppableProvided,
  DropResult,
} from '@hello-pangea/dnd'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import React, { useCallback, useEffect, useState } from 'react'

import { useBoardStore } from '@/features/board/store/board.store'
import TaskColumn from '@/features/board/task/task-column'
import { Task } from '@/features/board/types/task.type'
import { TaskMap } from '@/features/board/types/task-map.type'
import { groupTasksByStatus } from '@/features/board/utils/group-tasks'
import reorder, { reorderTaskMap } from '@/features/board/utils/reorder-tasks'
import { PartialAutoScrollerOptions } from '@/types/auto-scroller-options-types'

interface Props {
  initial?: TaskMap
  withScrollableColumns?: boolean
  isCombineEnabled?: boolean
  containerHeight?: string
  useClone?: boolean
  applyGlobalStyles?: boolean
  autoScrollerOptions?: PartialAutoScrollerOptions
}

export default function TaskBoard({
  initial = {},
  withScrollableColumns,
  isCombineEnabled = false,
  containerHeight,
  useClone,
  applyGlobalStyles = true,
  autoScrollerOptions,
}: Props) {
  const [columns, setColumns] = useState<TaskMap>(initial)
  const [ordered, setOrdered] = useState<string[]>(Object.keys(initial))
  const { activeBoard } = useBoardStore()

  useEffect(() => {
    if (activeBoard?.tasks) {
      const groupedTasks = groupTasksByStatus(activeBoard.tasks)
      setColumns(groupedTasks)
      setOrdered(Object.keys(groupedTasks))
    }
  }, [activeBoard])

  const onDragEnd = useCallback(
    (result: DropResult): void => {
      if (result.combine) {
        if (result.type === 'COLUMN') {
          const shallow: string[] = [...ordered]
          shallow.splice(result.source.index, 1)
          setOrdered(shallow)
          return
        }

        const column: Task[] = columns[result.source.droppableId]
        const withTaskRemoved: Task[] = [...column]
        withTaskRemoved.splice(result.source.index, 1)
        const newColumns: TaskMap = {
          ...columns,
          [result.source.droppableId]: withTaskRemoved,
        }
        setColumns(newColumns)
        return
      }

      if (!result.destination) {
        return
      }

      const source: DraggableLocation = result.source
      const destination: DraggableLocation = result.destination

      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return
      }

      if (result.type === 'COLUMN') {
        const newOrdered: string[] = reorder(
          ordered,
          source.index,
          destination.index
        )
        setOrdered(newOrdered)
        return
      }

      const data = reorderTaskMap({
        quoteMap: columns,
        source,
        destination,
      })

      setColumns(data.quoteMap)
    },
    [columns, ordered]
  )

  const board = (
    <Droppable
      droppableId='board'
      type='COLUMN'
      direction='horizontal'
      ignoreContainerClipping={Boolean(containerHeight)}
      isCombineEnabled={isCombineEnabled}>
      {(provided: DroppableProvided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className='inline-flex h-[calc(100vh-var(--navbar-height))] min-w-full gap-6 rounded pl-8 pt-6 md:h-[calc(100vh-var(--navbar-height-md))] md:gap-8'>
          {ordered.map((key: string, index: number) => (
            <TaskColumn
              key={key}
              index={index}
              title={key}
              tasks={columns[key]}
              isScrollable={withScrollableColumns}
              isCombineEnabled={isCombineEnabled}
              useClone={useClone}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )

  return (
    <>
      <DragDropContext
        onDragEnd={onDragEnd}
        autoScrollerOptions={autoScrollerOptions}>
        {containerHeight ? (
          <div
            style={{ height: containerHeight }}
            className={`overflow-y-auto overflow-x-hidden`}>
            {board}
          </div>
        ) : (
          board
        )}
      </DragDropContext>
      {/* {applyGlobalStyles ? (
        <Global
          styles={css`
            body {
              background: ${colors.B200};
            }
          `}
        />
      ) : null} */}
    </>
  )
}
