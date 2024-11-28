'use client'

import { useEffect } from 'react'

import { STORAGE_KEYS } from '@/config/constants'
import { MOCK_BOARDS, MOCK_USERS } from '@/config/mock-data'
import { getAllBoards } from '@/features/board/service/board.service'
import { User } from '@/types/session-user.type'
import { getLocalStorage, setLocalStorage } from '@/utils'

export const SeedMockData = () => {
  useEffect(() => {
    //check if users already exist in localStorage
    const users = getLocalStorage<User[]>(STORAGE_KEYS.USERS)
    if (!users || users.length === 0) {
      setLocalStorage(STORAGE_KEYS.USERS, MOCK_USERS)
    }

    const boards = getAllBoards()
    if (!boards || boards.length === 0) {
      setLocalStorage(STORAGE_KEYS.BOARDS, MOCK_BOARDS)
    }
  }, [])

  return null
}
