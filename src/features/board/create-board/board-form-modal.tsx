'use client'

import ModalContainer from '@/components/modal/modal-container'
import { useModal } from '@/components/modal/use-modal'
import BoardForm from '@/features/board/create-board/board-form'
import { BoardFormProps } from '@/features/board/types/borad-form-props'
import { PlusIcon } from '@/icons'

export default function BoardFormModalView({
  initialData,
  isAddColumnForm,
}: BoardFormProps) {
  const { closeModal } = useModal()

  const title = initialData ? 'Edit Board' : 'Create Board'
  return (
    <ModalContainer childrenClassName='p-4 md:p-6 md:w-[35rem]'>
      <div className='mb-4 flex justify-between md:mb-6'>
        <h4 className='h4'> {title} </h4>
        <button
          onClick={closeModal}
          aria-label='close modal'
          className='transition-colors duration-200 hover:text-red-500'>
          <PlusIcon className='h-6 w-6 rotate-45 text-inherit' />
        </button>
      </div>
      <BoardForm initialData={initialData} isAddColumnForm={isAddColumnForm} />
    </ModalContainer>
  )
}
