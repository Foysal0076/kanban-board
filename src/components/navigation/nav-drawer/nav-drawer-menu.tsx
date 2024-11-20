'use client'

import { useState } from 'react'

import { DrawerContent } from '@/components/navigation/nav-drawer/drawer-content'
import { HamburgerMenu } from '@/components/navigation/nav-drawer/hamburger-menu'

export default function NavDrawerMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='relative my-auto'>
      <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />
      <div
        id='navigation-drawer'
        className={`fixed right-0 top-[var(--navbar-height)] h-[calc(100vh-var(--navbar-height))] w-full transform bg-background shadow-lg backdrop-blur-3xl transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <DrawerContent />
      </div>
    </div>
  )
}
