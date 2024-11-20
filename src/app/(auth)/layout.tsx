import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { AppIcon } from '@/components/icons'
import { authOptions } from '@/features/auth/auth.service'
import { pageRoutes } from '@/shared/config/page-routes'

type Props = {
  children: React.ReactNode
}

const AuthPageLayout = async ({ children }: Props) => {
  const session = await getServerSession(authOptions)

  if (session && session.user?.id) {
    const role = session.user.role
    if (role === 'admin') {
      return redirect(pageRoutes.dashboard)
    }
    return redirect(pageRoutes.home)
  }

  return (
    <div className='container flex min-h-[80vh] max-w-7xl flex-col items-center justify-center gap-8'>
      <div className='flex items-center justify-center gap-4'>
        <AppIcon className='h-14 w-14 text-primary' />
        <h1 className='h3 text-primary max-md:text-5xl'>kanban</h1>
      </div>
      {children}
    </div>
  )
}

export default AuthPageLayout
