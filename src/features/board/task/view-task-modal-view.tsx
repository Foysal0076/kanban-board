'use client'

import { useEffect } from 'react'

import DeleteModal from '@/components/delete-modal'
import Menu from '@/components/menu'
import ModalContainer from '@/components/modal/modal-container'
import { useModal } from '@/components/modal/use-modal'
import { Button } from '@/components/ui'
import { useBoardStore } from '@/features/board/store/board.store'
import TaskFormModalView from '@/features/board/task/forms/task-form-modal'
import SubtaskItemInput from '@/features/board/task/subtask-item-input'
import { Task } from '@/features/board/types/task.type'
import { ThreeDotsVerticalIcon } from '@/icons'

type Props = {
  task: Task
}

export default function ViewTaskModalView({ task }: Props) {
  const { closeModal, openModal } = useModal()

  const { activeBoard, selectedTask, selectTask, removeTask } = useBoardStore()
  const handleOpenEditTaskModal = () => {
    openModal({ view: <TaskFormModalView initialData={selectedTask} /> })
  }

  const handleDeleteTask = () => {
    if (!selectedTask) return
    removeTask(selectedTask.id)
    closeModal()
  }

  const handleOpenDeleteModal = () => {
    openModal({ view: <DeleteModal onConfirmDelete={handleDeleteTask} /> })
  }

  const getSubtaskDetails = () => {
    if (!selectedTask) return ''
    const totalSubtasks = selectedTask.subtasks.length
    const completedSubtasks = selectedTask.subtasks.filter(
      (subtask) => subtask.isCompleted
    ).length
    return `Subtask (${completedSubtasks} of ${totalSubtasks})`
  }

  useEffect(() => {
    selectTask(task)
  }, [])

  if (!selectedTask) return null

  return (
    <ModalContainer childrenClassName='p-4 md:p-6 md:w-[35rem]'>
      <div className='mb-4 flex justify-between md:mb-6'>
        <h4 className='h6 font-bold'> {activeBoard?.board.title} </h4>
        <Menu preferredPosition='center'>
          <Menu.Trigger>
            <button>
              <ThreeDotsVerticalIcon />
            </button>
          </Menu.Trigger>
          <Menu.Content>
            <div className='card p-2'>
              <div className='flex flex-col'>
                <Button variant={'ghost'} onClick={handleOpenEditTaskModal}>
                  Edit
                </Button>
                <Button variant={'destructive'} onClick={handleOpenDeleteModal}>
                  Delete
                </Button>
              </div>
            </div>
          </Menu.Content>
        </Menu>
      </div>
      <div className='flex flex-col gap-4'>
        <p>{selectedTask.description}</p>
        <div className='space-y-2 text-xs font-bold'>
          <p>{getSubtaskDetails()} </p>
          {selectedTask.subtasks.map((subtask) => (
            <SubtaskItemInput
              key={subtask.id}
              task={selectedTask}
              subTask={subtask}
            />
          ))}
        </div>
      </div>
    </ModalContainer>
  )
}
