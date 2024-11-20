import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import AppLogo from '@/components/app-logo'
import { authOptions } from '@/features/auth/auth.service'
import { pageRoutes } from '@/shared/config/page-routes'

type Props = {
  children: React.ReactNode
}

const AuthPageLayout = async ({ children }: Props) => {
  const session = await getServerSession(authOptions)

  if (session?.user?.id) {
    return redirect(pageRoutes.home)
  }

  return (
    <div className='container flex min-h-[80vh] max-w-7xl flex-col items-center justify-center gap-8'>
      <AppLogo />
      {children}
    </div>
  )
}

export default AuthPageLayout
