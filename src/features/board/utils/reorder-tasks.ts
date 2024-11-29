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
  quoteMap: TaskMap
  source: DraggableLocation
  destination: DraggableLocation
}

export interface ReorderTaskMapResult {
  quoteMap: TaskMap
}

export const reorderTaskMap = ({
  quoteMap,
  source,
  destination,
}: ReorderTaskMapArgs): ReorderTaskMapResult => {
  const current: Task[] = [...quoteMap[source.droppableId]]
  const next: Task[] = [...quoteMap[destination.droppableId]]
  const target: Task = current[source.index]

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered: Task[] = reorder(current, source.index, destination.index)
    const result: TaskMap = {
      ...quoteMap,
      [source.droppableId]: reordered,
    }
    return {
      quoteMap: result,
    }
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1)
  // insert into next
  next.splice(destination.index, 0, target)

  const result: TaskMap = {
    ...quoteMap,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  }

  return {
    quoteMap: result,
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
