'use client'

import { useModal } from '@/components/modal/use-modal'
import { Button } from '@/components/ui'
import TaskFormModalView from '@/features/board/task/forms/task-form-modal'
import { useAuth } from '@/hooks/use-auth'

export default function CreateTaskCta() {
  const { user } = useAuth()
  const { openModal } = useModal()

  const handleOpenTaskForm = () => {
    openModal({ view: <TaskFormModalView /> })
  }

  if (!user) return null

  return (
    <Button className='rounded-full' onClick={handleOpenTaskForm}>
      <span className='font-semibold'>
        <span className='text-lg'>+</span> Add new Task
      </span>
    </Button>
  )
}
