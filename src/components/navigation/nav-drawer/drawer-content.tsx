'use client'

import Link from 'next/link'

import CopyrightText from '@/components/footer/copyright-text'
import AuthButtons from '@/features/auth/auth-buttons'
import { useAuth } from '@/hooks/use-auth'

export const DrawerContent = () => {
  const { isAuthenticated, isLoading } = useAuth()

  const isUnauthenticated = !isAuthenticated && !isLoading

  return (
    <nav
      className='flex h-full flex-col justify-between'
      aria-label='Mobile navigation'>
      <div className='flex grow flex-col justify-between gap-4'>
        <div>{/* Top navigation */}</div>
        <div className='flex flex-col justify-end gap-4 px-6 py-4'>
          <Link
            href='/about'
            className='hover:text-primary-500 text-sm transition-colors duration-300'>
            About
          </Link>
          <Link
            href='/contact'
            className='hover:text-primary-500 mb-4 text-sm transition-colors duration-300'>
            Contact
          </Link>
          <CopyrightText productName='' />
        </div>
      </div>
      {isUnauthenticated && (
        <div className='flex gap-8 px-6 py-4 shadow-top'>
          <AuthButtons fullWidth />
        </div>
      )}
    </nav>
  )
}
