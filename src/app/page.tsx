import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { pageRoutes } from '@/config/page-routes'
import { authOptions } from '@/features/auth/auth.service'
import BoardHome from '@/features/board/board-home/board-home'

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return redirect(pageRoutes.login)
  }

  return <BoardHome />
}
