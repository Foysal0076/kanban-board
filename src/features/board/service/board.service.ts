import { STORAGE_KEYS } from '@/config/constants'
import { Board } from '@/features/board/types/board.type'
import { getLocalStorage, setLocalStorage } from '@/utils'

export const getAllBoards = (): Board[] => {
  return getLocalStorage<Board[]>(STORAGE_KEYS.BOARDS) || []
}

export const getUserBoards = (userId: string): Board[] => {
  const boards = getAllBoards()
  return boards.filter(
    (board) =>
      (board.owner.id === userId ||
        board.invitees.some((invitee) => invitee.id === userId)) &&
      !board.isArchived
  )
}

export const getBoardById = (boardId: string): Board | null => {
  const boards = getAllBoards()
  return boards.find((board) => board.id === boardId) || null
}

export const createBoard = (board: Board): void => {
  const boards = getAllBoards()
  boards.push(board)
  setLocalStorage(STORAGE_KEYS.BOARDS, boards)
}

export const updateBoard = (board: Board): void => {
  const boards = getAllBoards()
  const index = boards.findIndex((b) => b.id === board.id)
  if (index === -1) return
  boards[index] = board
  setLocalStorage(STORAGE_KEYS.BOARDS, boards)
}

export const archiveBoard = (boardId: string): void => {
  const boards = getAllBoards()
  const index = boards.findIndex((b) => b.id === boardId)
  if (index === -1) return
  boards[index].isArchived = true
  setLocalStorage(STORAGE_KEYS.BOARDS, boards)
}

export const unarchiveBoard = (boardId: string): void => {
  const boards = getAllBoards()
  const index = boards.findIndex((b) => b.id === boardId)
  if (index === -1) return
  boards[index].isArchived = false
  setLocalStorage(STORAGE_KEYS.BOARDS, boards)
}
