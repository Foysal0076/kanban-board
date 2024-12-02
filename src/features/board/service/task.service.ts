import { STORAGE_KEYS } from '@/config/constants'
import { Task } from '@/features/board/types/task.type'
import { getLocalStorage, setLocalStorage } from '@/utils'

export const getAllTasks = (): Task[] => {
  return getLocalStorage(STORAGE_KEYS.TASKS) || []
}

export const reorderTasks = (tasks: Task[]) => {
  const filteredTasks = getAllTasks().filter((task) => {
    return tasks.every((t) => t.id !== task.id)
  })

  const merged = [...filteredTasks, ...tasks]
  setLocalStorage(STORAGE_KEYS.TASKS, merged)
}

export const getBoardTasks = (boardId: string) => {
  const tasks = getAllTasks()
  return tasks.filter((task) => task.boardId === boardId)
}

export const createTask = (task: Task) => {
  const tasks = getAllTasks()
  tasks.push(task)
  setLocalStorage(STORAGE_KEYS.TASKS, tasks)
}

export const updateTask = (task: Task) => {
  const tasks = getAllTasks()
  const index = tasks.findIndex((t) => t.id === task.id)
  const updatedTask = { ...tasks[index], ...task }
  tasks[index] = updatedTask
  setLocalStorage(STORAGE_KEYS.TASKS, tasks)
}

export const deleteTask = (taskId: string) => {
  const tasks = getAllTasks()
  const index = tasks.findIndex((t) => t.id === taskId)
  tasks.splice(index, 1)
  setLocalStorage(STORAGE_KEYS.TASKS, tasks)
}
