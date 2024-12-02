'use client'

import { usePathname } from 'next/navigation'

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

  const pathname = usePathname()
  const isHome = pathname === '/'

  if (!user || isHome) return null

  return (
    <Button className='rounded-full font-semibold' onClick={handleOpenTaskForm}>
      <span className='text-lg sm:mr-0.5'>+</span>
      <span className='font-semibold max-sm:hidden'>Add new Task</span>
    </Button>
  )
}
