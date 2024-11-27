'use client'

import ModalContainer from '@/components/modal/modal-container'
import { useModal } from '@/components/modal/use-modal'
import { Button } from '@/components/ui'
import { PlusIcon } from '@/icons'

const ModalView = () => {
  const { closeModal } = useModal()
  return (
    <ModalContainer childrenClassName='p-4 md:p-6 md:w-[35rem]'>
      <div className='mb-4 flex justify-between md:mb-6'>
        <h4 className='h4'> Demo Modal </h4>
        <button
          onClick={closeModal}
          aria-label='close modal'
          className='transition-colors duration-200 hover:text-red-500'>
          <PlusIcon className='h-6 w-6 rotate-45 text-inherit' />
        </button>
      </div>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, iste
        blanditiis! Voluptate nemo, maxime asperiores fugiat aut quo voluptates
        sed ab magni modi minima dolorum commodi qui nesciunt expedita quisquam.
        Natus modi numquam provident aspernatur nihil, corrupti officia incidunt
        velit.
      </p>
    </ModalContainer>
  )
}

export default function ModalDemo() {
  const { openModal } = useModal()

  return (
    <div>
      <Button onClick={() => openModal({ view: <ModalView /> })}>
        Open Modal
      </Button>
    </div>
  )
}
