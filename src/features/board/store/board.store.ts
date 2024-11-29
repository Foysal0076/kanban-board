import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import {
  archiveBoard,
  createBoard,
  getUserBoards,
  updateBoard,
} from '@/features/board/service/board.service'
import {
  createTask,
  deleteTask,
  getBoardTasks,
  updateTask,
} from '@/features/board/service/task.service'
import { Board } from '@/features/board/types/board.type'
import { Task } from '@/features/board/types/task.type'

type BoardStoreType = {
  boards: Board[]
  tasks: Task[]
  activeBoard: { board: Board; tasks: Task[] } | null
  setActiveBoard: (_boardId: string) => void
  refreshBoardList: (_userId: string) => void
  addNewBoard: (_board: Board) => void
  archiveBoard: (_boardId: string) => void
  unarchiveBoard: (_boardId: string) => void
  editBoard: (_board: Board) => void
  getBoardById: (_boardId: string) => Board | null
  addNewTask: (_task: Task) => void
  removeTask: (_taskId: string) => void
  editTask: (_task: Task) => void
}

export const useBoardStore = create<BoardStoreType>()(
  devtools((set, get, ..._args) => ({
    boards: [],
    tasks: [],
    activeBoard: null,
    refreshBoardList: (userId) => {
      const boards = getUserBoards(userId)
      set({ boards })
    },
    getBoardById: (boardId: string) => {
      const board = get().boards.find((b) => b.id === boardId) ?? null
      return board
    },
    setActiveBoard: (boardId: string) => {
      const board = get().boards.find((b) => b.id === boardId) ?? null
      if (!board) return
      const tasks = getBoardTasks(boardId)
      set({ activeBoard: { board, tasks } })
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
    addNewTask: (task) => {
      createTask(task)
      set((state) => ({ tasks: [...state.tasks, task] }))
      //   useBoardStore.getState().refreshBoardList(board.owner
    },
    removeTask: (taskId) => {
      deleteTask(taskId)
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      }))
      //   useBoardStore.getState().refreshBoardList(board.owner
    },
    editTask: (task) => {
      updateTask(task)
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
      }))
      //   useBoardStore.getState().refreshBoardList(board.owner
    },
  }))
)
