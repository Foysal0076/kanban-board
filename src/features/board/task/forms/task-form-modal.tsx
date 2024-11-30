'use client'

import ModalContainer from '@/components/modal/modal-container'
import { useModal } from '@/components/modal/use-modal'
import TaskForm from '@/features/board/task/forms/task-form'
import { Task } from '@/features/board/types/task.type'
import { PlusIcon } from '@/icons'

type Props = {
  initialData?: Task | null
}

export default function TaskFormModalView({ initialData }: Props) {
  const { closeModal } = useModal()

  const title = initialData ? 'Edit Task' : 'Create Task'
  return (
    <ModalContainer
      childrenClassName='p-4 md:p-6 md:w-[35rem]'
      className='overflow-y-visible'>
      <div className='mb-4 flex justify-between md:mb-6'>
        <h4 className='h4'> {title} </h4>
        <button
          onClick={closeModal}
          aria-label='close modal'
          className='transition-colors duration-200 hover:text-red-500'>
          <PlusIcon className='h-6 w-6 rotate-45 text-inherit' />
        </button>
      </div>
      <TaskForm initialData={initialData} />
    </ModalContainer>
  )
}
