import Link from 'next/link'

import AppLogo from '@/components/app-logo'
import ThemeSwitch from '@/components/theme/theme-switch'
import { pageRoutes } from '@/config/page-routes'
import NavbarAuthMenu from '@/features/auth/navbar-auth-menu'
import NavDrawerMenu from '@/features/navigation/nav-drawer/nav-drawer-menu'

export default function Navbar() {
  return (
    <header
      className='fixed top-0 z-40 flex h-[var(--navbar-height)] w-full items-center border-b bg-card backdrop-blur-md md:h-[var(--navbar-height-md)]'
      aria-label='Main navigation'>
      <nav
        className='flex h-full w-full items-center'
        aria-label='Main navigation'>
        <div className='flex min-h-full w-[calc(var(--left-sidebar-width))] items-center border-r px-4 md:px-8'>
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
            <AppLogo />
          </Link>
        </div>

        <div className='flex grow items-center justify-between gap-4 px-4 md:px-8'>
          <div></div>
          <div className='flex items-center'>
            <ThemeSwitch />
            <NavbarAuthMenu />
            <div className='flex md:hidden'>
              <NavDrawerMenu />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
