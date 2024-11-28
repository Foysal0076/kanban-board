'use client'
import { useRefreshUserData } from '@/features/board/hooks/use-refresh-user-data'

export default function RefreshUserData() {
  useRefreshUserData()
  return null
}
