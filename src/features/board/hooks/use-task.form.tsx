import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useModal } from '@/components/modal/use-modal'
import { useBoardStore } from '@/features/board/store/board.store'
import { Subtask } from '@/features/board/types/subtask.type'
import { Task } from '@/features/board/types/task.type'
import {
  TaskFormInputs,
  TaskSchema,
} from '@/features/board/validators/task.schema'
import { useAuth } from '@/hooks/use-auth'
import { SelectOption } from '@/types/select-option'
import { generateID } from '@/utils'

export const useTaskForm = (initialData?: Task | null) => {
  const { closeModal } = useModal()
  const { addNewTask, editTask, refreshActiveBoard } = useBoardStore()
  const { user } = useAuth()
  const { activeBoard } = useBoardStore()

  const [statusOptions, setStatusOptions] = useState<SelectOption[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<TaskFormInputs>({
    resolver: zodResolver(TaskSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      subtasks: [],
    },
  })
  const onSubmit = (data: TaskFormInputs) => {
    if (!user || !activeBoard) return
    const boardId = activeBoard.board.id

    const isEdit = !!initialData

    if (isEdit) {
      const subtasks = data.subtasks.map((subtask, index) => ({
        ...subtask,
        ...initialData.subtasks[index],
      }))

      const putData: Task = {
        ...initialData,
        ...data,
        subtasks: [...subtasks],
        updatedAt: new Date(),
      }
      console.log(putData)
      // editTask(putData)
      toast.success('Task updated successfully')
    } else {
      const taskId = generateID()

      const subtasks: Subtask[] = data.subtasks.map((subtask) => ({
        ...subtask,
        id: generateID(),
        taskId: taskId,
        isCompleted: false,
      }))

      const postData: Task = {
        id: taskId,
        title: data.title,
        assignee: {
          id: user.id,
          name: user.name || user.email,
          email: user.email,
          role: user.role,
        },
        description: data.description,
        createdAt: new Date(),
        updatedAt: new Date(),
        boardId,
        status: data.status,
        subtasks,
      }
      addNewTask(postData)
      refreshActiveBoard()
      toast.success('Task added successfully')
    }
    closeModal()
  }

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'subtasks',
  })

  const handleAddSubtask = () => {
    append({ title: '', description: '', isCompleted: false })
  }

  const handleRemoveSubtask = (index: number) => {
    remove(index)
  }

  useEffect(() => {
    if (activeBoard?.board) {
      const options = activeBoard.board.columns.map((column) => ({
        label: column.title,
        value: column.title,
      }))
      setStatusOptions(options)
    }
  }, [activeBoard])

  return {
    statusOptions,
    control,
    register,
    handleSubmit,
    errors,
    fields,
    onSubmit,
    handleAddSubtask,
    handleRemoveSubtask,
  }
}
