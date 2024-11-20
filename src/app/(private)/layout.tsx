import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/features/auth/auth.service'
import { pageRoutes } from '@/shared/config/page-routes'

export default async function PrivateRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect(pageRoutes.home)
  }
  return <>{children}</>
}
