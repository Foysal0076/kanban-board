import { Task } from '@/features/board/types/task.type'
import { TaskMap } from '@/features/board/types/task-map.type'

export const groupTasksByStatus = (
  tasks: Task[],
  columnNames: string[]
): TaskMap => {
  const taskMap: TaskMap = {}
  columnNames.forEach((name) => {
    taskMap[name] = []
  })

  tasks.forEach((task) => {
    if (taskMap[task.status]) {
      taskMap[task.status].push(task)
    }
  })
  return taskMap
}
