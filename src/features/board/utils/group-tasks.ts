import { Task } from '@/features/board/types/task.type'
import { TaskMap } from '@/features/board/types/task-map.type'

export const groupTasksByStatus = (tasks: Task[]): TaskMap => {
  const taskMap: TaskMap = {}
  tasks.forEach((task) => {
    if (!taskMap[task.status]) {
      taskMap[task.status] = []
    }
    taskMap[task.status].push(task)
  })
  return taskMap
}
