'use client'
import type {
  DraggableLocation,
  DroppableProvided,
  DropResult,
} from '@hello-pangea/dnd'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import PageLoader from '@/components/page-loader'
import { reorderTasks } from '@/features/board/service/task.service'
import { useBoardStore } from '@/features/board/store/board.store'
import NewColumnPlaceholder from '@/features/board/task/new-column-placeholder'
import TaskColumn from '@/features/board/task/task-column'
import { Task } from '@/features/board/types/task.type'
import { TaskMap } from '@/features/board/types/task-map.type'
import { groupTasksByStatus } from '@/features/board/utils/group-tasks'
import reorder, {
  getReorderedBoardTasks,
  reorderTaskMap,
} from '@/features/board/utils/reorder-tasks'
import { useAuth } from '@/hooks/use-auth'
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

  const { isLoading } = useAuth()

  useEffect(() => {
    if (activeBoard?.tasks) {
      const columnNames = activeBoard.board.columns.map(
        (column) => column.title
      )
      const groupedTasks = groupTasksByStatus(activeBoard.tasks, columnNames)
      setColumns(groupedTasks)
      setOrdered(columnNames)
    }
  }, [activeBoard])

  const columnColorMap = useMemo(() => {
    if (activeBoard?.board.columns) {
      return activeBoard.board.columns.reduce(
        (acc, column) => {
          acc[column.title] = column.color
          return acc
        },
        {} as Record<string, string>
      )
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
        taskMap: columns,
        source,
        destination,
      })
      const reOrderedBoardTasks = getReorderedBoardTasks(data.taskMap)
      reorderTasks(reOrderedBoardTasks)
      setColumns(data.taskMap)
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
              color={columnColorMap ? columnColorMap[key] : 'purple'}
              tasks={columns[key] ?? []}
              isScrollable={withScrollableColumns}
              isCombineEnabled={isCombineEnabled}
              useClone={useClone}
            />
          ))}
          {provided.placeholder}
          <NewColumnPlaceholder />
        </div>
      )}
    </Droppable>
  )

  if (isLoading) return <PageLoader />

  if (!activeBoard) {
    return (
      <div className='mt-20'>
        <h1 className='h4 text-center'>
          No board found! Create your first board
        </h1>
      </div>
    )
  }

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
    </>
  )
}
