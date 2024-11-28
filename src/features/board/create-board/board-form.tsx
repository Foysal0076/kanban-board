'use client'

import { useModal } from '@/components/modal/use-modal'
import { Button, Input, Textarea } from '@/components/ui'
import { useBoardForm } from '@/features/board/hooks/use-board-form'
import { Board } from '@/features/board/types/board.type'
import { PlusIcon } from '@/icons'

type Props = {
  initialData?: Board | null
}

export default function BoardForm({ initialData }: Props) {
  const { closeModal } = useModal()

  const {
    register,
    handleSubmit,
    errors,
    fields,
    onSubmit,
    handleAddOption,
    handleRemoveOption,
  } = useBoardForm(initialData)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6' noValidate>
      <div className='space-y-2'>
        <Input required label='Board Title' {...register('title')} id='title' />
        {errors.title && (
          <p className='text-sm text-red-500'>{errors.title.message}</p>
        )}
        <Textarea
          id='description'
          label='Board Description'
          rows={4}
          {...register('description')}
        />
      </div>

      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <label className='block text-sm font-semibold'>Columns</label>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className='flex items-center gap-2'>
            <div className='flex-1'>
              <Input
                className='h-8'
                required
                {...register(`columns.${index}`)}
                placeholder={`Option ${index + 1}`}
              />
              {errors.columns?.[index] && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.columns[index]?.message}
                </p>
              )}
            </div>
            <Button
              className='mt-auto'
              type='button'
              size='sm'
              variant='ghost'
              onClick={() => handleRemoveOption(index)}>
              <PlusIcon className='rotate-45 font-bold' />
            </Button>
          </div>
        ))}
        {errors.columns && (
          <p className='text-sm text-red-500'>
            {errors.columns.message ?? errors.columns?.root?.message}
          </p>
        )}
        <Button
          type='button'
          onClick={handleAddOption}
          variant='outline'
          className='w-full'>
          <span className='font-semibold'>
            {' '}
            <span className='text-xl'>+</span> Add Column
          </span>
        </Button>
      </div>

      <div className='flex justify-end gap-2'>
        <Button
          type='button'
          variant='secondary'
          onClick={closeModal}
          size='sm'>
          Cancel
        </Button>
        <Button type='submit' size='sm'>
          Save Board
        </Button>
      </div>
    </form>
  )
}
