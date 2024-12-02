'use client'

import { useRouter } from 'next/navigation'

import DeleteModal from '@/components/delete-modal'
import Menu from '@/components/menu'
import { useModal } from '@/components/modal/use-modal'
import { Button } from '@/components/ui'
import { pageRoutes } from '@/config/page-routes'
import BoardFormModalView from '@/features/board/create-board/board-form-modal'
import { useBoardStore } from '@/features/board/store/board.store'
import { GearSixIcon } from '@/icons'

export default function BoardSettingMenu() {
  const { openModal, closeModal } = useModal()
  const { activeBoard, archiveBoard, getFirstActiveBoard } = useBoardStore()
  const router = useRouter()
  const onConfirmDelete = () => {
    if (!activeBoard) return
    archiveBoard(activeBoard.board.id)
    const board = getFirstActiveBoard()
    if (board) {
      router.push(pageRoutes.board(board.id))
      closeModal()
    }
  }

  const openBoardFormModal = () =>
    openModal({
      view: <BoardFormModalView initialData={activeBoard?.board} />,
    })

  const openArchiveBoardModal = () =>
    openModal({
      view: (
        <DeleteModal
          onConfirmDelete={onConfirmDelete}
          deleteButtonText='Yes, Archive board'
        />
      ),
    })

  return (
    <Menu preferredPosition='right'>
      <Menu.Trigger>
        <button>
          <GearSixIcon />
        </button>
      </Menu.Trigger>
      <Menu.Content>
        <div className='card flex flex-col gap-1 bg-popover p-2'>
          <Button size={'sm'} variant={'ghost'} onClick={openBoardFormModal}>
            Edit
          </Button>
          {/* <Button
            size={'sm'}
            variant={'destructive'}
            onClick={openArchiveBoardModal}>
            Archive
          </Button> */}
        </div>
      </Menu.Content>
    </Menu>
  )
}
