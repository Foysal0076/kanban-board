'use client'

import { signOut } from 'next-auth/react'

import { SignOutIcon } from '@/components/icons'
import { Avatar, Spinner } from '@/components/ui'
import AuthButtons from '@/features/auth/auth-buttons'
import { useAuth } from '@/hooks/use-auth'
import { pageRoutes } from '@/shared/config/page-routes'

const NavbarAuthMenu = () => {
  // const { theme, setTheme } = useTheme()
  const { isLoading, user } = useAuth()

  const handleLogout = async () => {
    signOut({ callbackUrl: pageRoutes.login })
  }

  // const toggleThemeToDark = () => {
  //   setTheme('dark')
  // }

  // const toggleThemeToLight = () => {
  //   setTheme('light')
  // }

  if (isLoading) return <Spinner />

  if (!user?.id)
    return (
      <div className='hidden md:block'>
        <AuthButtons />
      </div>
    )

  return (
    <div className='group relative'>
      <button className='flex cursor-pointer items-center gap-2'>
        <Avatar
          className='h-10 w-10 rounded-xl transition-colors hover:bg-accent'
          name={user?.name ?? ''}
        />
      </button>
      <menu
        aria-label='User menu'
        className='md:pd-5 absolute right-0 top-full z-10 hidden rounded-md border bg-card py-1 shadow-sm group-hover:block'>
        <ul className='flex w-32 flex-col gap-1 py-1'>
          {/* <li
            role='button'
            tabIndex={0}
            onClick={toggleThemeToLight}
            className={cn(
              'hover:bg-surface-100 dark:hover:bg-surface-200 flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm',
              {
                'text-primary-400': theme === 'light',
              }
            )}>
            <ToggleLightIcon />
            <span className='select-none text-inherit'>Light</span>
          </li>
          <li
            role='button'
            tabIndex={0}
            onClick={toggleThemeToDark}
            className={cn(
              'hover:bg-surface-100 dark:hover:bg-surface-200 flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm',
              {
                'text-primary-400': theme === 'dark',
              }
            )}>
            <ToggleDarkIcon />
            <span className='select-none text-inherit'>Dark</span>
          </li> */}
          <li>
            <button
              onClick={handleLogout}
              className='flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground'>
              <SignOutIcon className='h-5 w-5' />
              <span className='select-none'>Logout</span>
            </button>
          </li>
        </ul>
      </menu>
    </div>
  )
}

export default NavbarAuthMenu
