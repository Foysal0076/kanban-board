import { useSession } from 'next-auth/react'

import { SessionUser } from '@/types/session-user.type'

export const useAuth = () => {
  const { data: session, status } = useSession()
  const isLoading = status === 'loading'
  const isAuthenticated = status === 'authenticated'
  const user = session?.user as SessionUser

  return { user, isAuthenticated, isLoading }
}
