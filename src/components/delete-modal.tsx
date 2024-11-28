'use client'

import { useModal } from '@/components/modal/use-modal'
import { Button } from '@/components/ui'
import { TrashIcon } from '@/icons'

type Props = {
  onConfirmDelete: () => void
  onClose?: () => void
  titleText?: string
  bodyText?: string
  cancelButtonText?: string
  deleteButtonText?: string
}

export default function DeleteModal({
  bodyText = 'Are you sure you want to archive this item? You can always unarchive later',
  onClose,
  onConfirmDelete,
  titleText = 'Archive this item?',
  cancelButtonText = 'Cancel',
  deleteButtonText = 'Delete',
}: Props) {
  const { closeModal } = useModal()
  const _onClose = onClose || closeModal

  return (
    <div className='card flex flex-col items-center gap-2.5 p-4 max-sm:w-[90vw] sm:w-[24rem]'>
      <TrashIcon className='h-10 w-10 text-destructive' />
      <h2 className='font-bold'>{titleText}</h2>
      <p className='text-center text-muted-foreground'>{bodyText}</p>
      <div className='mt-2 flex w-full gap-2'>
        <Button className='w-1/2' variant={'outline'} onClick={_onClose}>
          {cancelButtonText}
        </Button>
        <Button
          className='w-1/2'
          variant={'destructive'}
          onClick={onConfirmDelete}>
          {deleteButtonText}
        </Button>
      </div>
    </div>
  )
}
