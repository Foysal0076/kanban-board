import type { DraggableLocation } from '@hello-pangea/dnd'

import { Task } from '@/features/board/types/task.type'
import { TaskMap } from '@/features/board/types/task-map.type'

// a little function to help us with reordering the result
function reorder<TItem>(
  list: TItem[],
  startIndex: number,
  endIndex: number
): TItem[] {
  const result = [...list]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export default reorder

interface ReorderTaskMapArgs {
  taskMap: TaskMap
  source: DraggableLocation
  destination: DraggableLocation
}

export interface ReorderTaskMapResult {
  taskMap: TaskMap
}

export const reorderTaskMap = ({
  taskMap,
  source,
  destination,
}: ReorderTaskMapArgs): ReorderTaskMapResult => {
  const current: Task[] = [...taskMap[source.droppableId]]
  const next: Task[] = [...taskMap[destination.droppableId]]
  const target: Task = {
    ...current[source.index],
    status: destination.droppableId,
  }
  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered: Task[] = reorder(current, source.index, destination.index)
    const result: TaskMap = {
      ...taskMap,
      [source.droppableId]: reordered,
    }
    return {
      taskMap: result,
    }
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1)
  // insert into next
  next.splice(destination.index, 0, target)

  const result: TaskMap = {
    ...taskMap,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  }

  return {
    taskMap: result,
  }
}

interface List<T> {
  id: string
  values: T[]
}

interface MoveBetweenArgs<T> {
  list1: List<T>
  list2: List<T>
  source: DraggableLocation
  destination: DraggableLocation
}

interface MoveBetweenResult<T> {
  list1: List<T>
  list2: List<T>
}

export function moveBetween<T>({
  list1,
  list2,
  source,
  destination,
}: MoveBetweenArgs<T>): MoveBetweenResult<T> {
  const newFirst = [...list1.values]
  const newSecond = [...list2.values]

  const moveFrom = source.droppableId === list1.id ? newFirst : newSecond
  const moveTo = moveFrom === newFirst ? newSecond : newFirst

  const [moved] = moveFrom.splice(source.index, 1)
  moveTo.splice(destination.index, 0, moved)

  return {
    list1: {
      ...list1,
      values: newFirst,
    },
    list2: {
      ...list2,
      values: newSecond,
    },
  }
}

export const getReorderedBoardTasks = (taskMap: TaskMap) => {
  const boarTasks = Object.values(taskMap).reduce((acc, tasks) => {
    acc.push(...tasks)
    return acc
  }, [] as Task[])

  return boarTasks
}
