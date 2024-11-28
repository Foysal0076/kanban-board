import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { pageRoutes } from '@/config/page-routes'
import { authOptions } from '@/features/auth/auth.service'

export default async function PrivateRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect(pageRoutes.login)
  }
  return <>{children}</>
}
