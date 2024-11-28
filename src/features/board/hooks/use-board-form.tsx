import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useModal } from '@/components/modal/use-modal'
import { useBoardStore } from '@/features/board/store/board.store'
import { Board } from '@/features/board/types/board.type'
import {
  BoardFormInputs,
  BoardSchema,
} from '@/features/board/validators/board.schema'
import { useAuth } from '@/hooks/use-auth'
import { generateID } from '@/utils'

export const useBoardForm = (initialData?: Board | null) => {
  const { closeModal } = useModal()
  const { addNewBoard, editBoard } = useBoardStore()
  const { user } = useAuth()

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
      columns: ['Todo', 'In Progress', 'Done'],
      isArchived: false,
    },
  })
  const onSubmit = (data: BoardFormInputs) => {
    if (!user) return

    const isEdit = !!initialData

    if (isEdit) {
      const putData: Board = {
        ...initialData,
        ...data,
        updatedAt: new Date(),
      }
      editBoard(putData)
      toast.success('Board updated successfully')
    } else {
      const postData: Board = {
        id: generateID(),
        title: data.title,
        columns: Array.from(new Set(data?.columns || [])),
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
      console.log(postData)
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
    append('')
  }

  const handleRemoveOption = (index: number) => {
    remove(index)
  }

  return {
    register,
    handleSubmit,
    errors,
    fields,
    onSubmit,
    handleAddOption,
    handleRemoveOption,
  }
}
