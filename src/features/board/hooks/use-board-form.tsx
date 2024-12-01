import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useModal } from '@/components/modal/use-modal'
import { COLUMN_COLORS } from '@/config/constants'
import { useBoardStore } from '@/features/board/store/board.store'
import { Board } from '@/features/board/types/board.type'
import {
  BoardFormInputs,
  BoardSchema,
} from '@/features/board/validators/board.schema'
import { useAuth } from '@/hooks/use-auth'
import { generateID } from '@/utils'

const defaultColumns = [
  {
    title: 'Todo',
    color: COLUMN_COLORS[0],
    isDisabled: false,
  },
  {
    title: 'In Progress',
    color: COLUMN_COLORS[1],
    isDisabled: false,
  },
  {
    title: 'Completed',
    color: COLUMN_COLORS[2],
    isDisabled: false,
  },
]

export const useBoardForm = (
  initialData?: Board | null,
  isAddColumnForm?: boolean
) => {
  const { closeModal } = useModal()
  const { addNewBoard, editBoard } = useBoardStore()
  const { user } = useAuth()
  const [existingColumnCount, setExistingColumnCount] = useState<number>(
    initialData ? initialData.columns.length : 0
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<BoardFormInputs>({
    resolver: zodResolver(BoardSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      columns: defaultColumns,
      isArchived: false,
    },
  })

  const onSubmit = (data: BoardFormInputs) => {
    if (!user) return

    const isEdit = !!initialData

    if (isEdit) {
      const uniqueColumns = data.columns.filter(
        (column, index, self) =>
          index ===
          self.findIndex(
            (t) => t.title === column.title && t.color === column.color
          )
      )

      const putData: Board = {
        ...initialData,
        ...data,
        columns: uniqueColumns,
        updatedAt: new Date(),
      }
      editBoard(putData)
      toast.success('Board updated successfully')
    } else {
      let uniqueColumns = data.columns.filter(
        (column, index, self) =>
          index ===
          self.findIndex(
            (t) => t.title === column.title && t.color === column.color
          )
      )

      const postData: Board = {
        id: generateID(),
        title: data.title,
        columns: uniqueColumns,
        createdAt: new Date(),
        updatedAt: new Date(),
        invitees: [],
        owner: {
          id: user.id,
          name: user.name || user.email,
          email: user.email,
          role: user.role,
        },
        description: data.description,
        isArchived: data.isArchived,
      }
      addNewBoard(postData)
      toast.success('Board added successfully')
    }
    closeModal()
  }

  const { fields, append, remove } = useFieldArray({
    control: control,
    // @ts-ignore
    name: 'columns',
  })

  const handleAddOption = () => {
    if (fields.length >= 6) return
    append({ color: 'purple', title: '', isDisabled: false })
  }

  const handleRemoveOption = (index: number) => {
    remove(index)
  }

  return {
    existingColumnCount,
    register,
    handleSubmit,
    errors,
    fields,
    onSubmit,
    handleAddOption,
    handleRemoveOption,
  }
}
