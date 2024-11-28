import Link from 'next/link'

import ThemeSwitch from '@/components/theme/theme-switch'
import { pageRoutes } from '@/config/page-routes'
import NavbarAuthMenu from '@/features/auth/navbar-auth-menu'
import { BoardMenu } from '@/features/board/board-menu'
import { AppIcon } from '@/icons'

export default function Navbar() {
  return (
    <header
      className='fixed top-0 z-40 flex h-[var(--navbar-height)] w-full items-center border-b bg-card backdrop-blur-md md:h-[var(--navbar-height-md)]'
      aria-label='Main navigation'>
      <nav
        className='flex h-full w-full items-center'
        aria-label='Main navigation'>
        <div className='flex min-h-full items-center px-4 md:w-[calc(var(--left-sidebar-width))] md:border-r md:px-8'>
          <Link href={pageRoutes.home}>
            {/* <Image
              src='/images/site-logo-light.svg'
              className='block dark:hidden'
              alt='Logo Light'
              width={153}
              height={26}
              priority
            />
            <Image
              src='/images/site-logo-dark.svg'
              className='hidden dark:block'
              alt='Logo Dark'
              aria-hidden='true'
              width={153}
              height={26}
              priority
            /> */}
            <div className='flex items-center justify-center gap-2 tracking-tighter text-primary'>
              <AppIcon className='h-6 w-6 md:h-[1.625rem] md:w-[1.625rem]' />
              <h1 className='text-[1.75rem] font-semibold leading-none text-foreground max-sm:hidden md:text-[2.125rem]'>
                kanban
              </h1>
            </div>
          </Link>
        </div>

        <div className='flex grow items-center justify-between gap-4 pr-4 md:px-8'>
          <div>
            <BoardMenu />
          </div>
          <div className='flex items-center'>
            <ThemeSwitch />
            <NavbarAuthMenu />
            {/* <div className='flex md:hidden'>
              <NavDrawerMenu />
            </div> */}
          </div>
        </div>
      </nav>
    </header>
  )
}
