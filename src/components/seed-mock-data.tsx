'use client'

import { useEffect } from 'react'

import { STORAGE_KEYS } from '@/shared/config/constants'
import { USERS } from '@/shared/config/mock-data'
import { User } from '@/types/session-user.type'
import { getLocalStorage, setLocalStorage } from '@/utils'

export const SeedMockData = () => {
  useEffect(() => {
    //check if users already exist in localStorage
    const users = getLocalStorage<User[]>(STORAGE_KEYS.USERS)
    if (!users || users.length === 0) {
      setLocalStorage(STORAGE_KEYS.USERS, USERS)
    }
  }, [])

  return null
}
