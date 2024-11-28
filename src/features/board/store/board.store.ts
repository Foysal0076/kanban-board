import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import {
  archiveBoard,
  createBoard,
  getUserBoards,
  updateBoard,
} from '@/features/board/service/board.service'
import { Board } from '@/features/board/types/board.type'

type BoardStoreType = {
  boards: Board[]
  activeBoard: Board | null
  refreshBoardList: (_userId: string) => void
  addNewBoard: (_board: Board) => void
  archiveBoard: (_boardId: string) => void
  unarchiveBoard: (_boardId: string) => void
  editBoard: (_board: Board) => void
  getBoardById: (_boardId: string) => Board | null
}

export const useBoardStore = create<BoardStoreType>()(
  devtools((set, get, ...args) => ({
    boards: [],
    activeBoard: null,
    refreshBoardList: (userId) => {
      const boards = getUserBoards(userId)
      set({ boards })
    },
    getBoardById: (boardId: string) => {
      const board = get().boards.find((b) => b.id === boardId) ?? null
      return board
    },
    addNewBoard: (board) => {
      createBoard(board)
      set((state) => ({ boards: [...state.boards, board] }))
      // useBoardStore.getState().refreshBoardList(board.owner.id)
    },
    archiveBoard: (boardId) => {
      archiveBoard(boardId)
      set((state) => ({
        boards: state.boards.map((board) =>
          board.id === boardId ? { ...board, isArchived: true } : board
        ),
      }))
      //   useBoardStore.getState().refreshBoardList(board.owner.id)
    },
    unarchiveBoard: (boardId) => {
      archiveBoard(boardId)
      set((state) => ({
        boards: state.boards.map((board) =>
          board.id === boardId ? { ...board, isArchived: false } : board
        ),
      }))
      //   useBoardStore.getState().refreshBoardList(board.owner.id)
    },
    editBoard: (board) => {
      updateBoard(board)
      set((state) => ({
        boards: state.boards.map((b) => (b.id === board.id ? board : b)),
      }))
      //   useBoardStore.getState().refreshBoardList(board.owner
    },
  }))
)
