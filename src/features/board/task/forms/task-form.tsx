'use client'

import { Controller } from 'react-hook-form'

import { useModal } from '@/components/modal/use-modal'
import { Button, Input, Select, Textarea } from '@/components/ui'
import { useTaskForm } from '@/features/board/hooks/use-task.form'
import { Task } from '@/features/board/types/task.type'
import { PlusIcon } from '@/icons'

type Props = {
  initialData?: Task | null
}

export default function TaskForm({ initialData }: Props) {
  const { closeModal } = useModal()

  const {
    statusOptions,
    register,
    handleSubmit,
    errors,
    control,
    fields,
    onSubmit,
    handleAddSubtask,
    handleRemoveSubtask,
  } = useTaskForm(initialData)
  // console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6' noValidate>
      <div className='space-y-4'>
        <Input required label='Title' {...register('title')} id='title' />
        {errors.title && (
          <p className='text-sm text-red-500'>{errors.title.message}</p>
        )}
        <Textarea
          id='description'
          label='Description'
          {...register('description')}
        />
      </div>

      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <label className='block text-sm font-semibold'>Subtasks</label>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className='flex items-center gap-2'>
            <div className='flex-1'>
              <Input
                className='h-8'
                required
                {...register(`subtasks.${index}.title`)}
                placeholder={`Subtask title ${index + 1}`}
              />
              {errors.subtasks?.[index]?.title && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.subtasks[index]?.title.message}
                </p>
              )}
            </div>
            <Button
              className='self-start'
              type='button'
              size='sm'
              variant='ghost'
              onClick={() => handleRemoveSubtask(index)}>
              <PlusIcon className='rotate-45 font-bold' />
            </Button>
          </div>
        ))}
        {errors.subtasks && (
          <p className='text-sm text-red-500'>
            {errors.subtasks.message ?? errors.subtasks?.root?.message}
          </p>
        )}
        <Button
          type='button'
          onClick={handleAddSubtask}
          variant='outline'
          className='w-full bg-popover'>
          <span className='font-semibold'>
            {' '}
            <span className='text-xl'>+</span> Add Subtask
          </span>
        </Button>
        <Controller
          name='status'
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label='Status'
              labelClassName='mb-1.5 block'
              options={statusOptions}
              value={value}
              onChange={(selectedOption) => {
                return onChange(selectedOption)
              }}
              errorMessage={errors.status?.message}
            />
          )}
        />
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
          Save Task
        </Button>
      </div>
    </form>
  )
}
