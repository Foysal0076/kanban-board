'use client'

import { ReactNode } from 'react'

import BoardListSidebar from '@/features/board/board-list-sidebar'
import HideBoardListSidebarButton from '@/features/board/hide-list-sidebar-button'
import { useUIStore } from '@/features/board/store/ui-state.store'
import { cn } from '@/utils'

export default function BoardPageLayout({ children }: { children: ReactNode }) {
  const { isLeftSidebarOpen } = useUIStore()

  return (
    <div className='flex h-[calc(100vh-var(--navbar-height))] md:h-[calc(100vh-var(--navbar-height-md))]'>
      <div
        className={cn(
          'ml-0 h-full w-[calc(var(--left-sidebar-width))] min-w-[calc(var(--left-sidebar-width))] transition-all max-md:-ml-[calc(var(--left-sidebar-width))]',
          {
            '-ml-[calc(var(--left-sidebar-width))]': !isLeftSidebarOpen,
          }
        )}>
        <BoardListSidebar />
      </div>
      <div className='grow overflow-x-auto overflow-y-clip'>{children}</div>
      <div
        className={cn('fixed bottom-8 left-0 max-md:hidden', {
          hidden: isLeftSidebarOpen,
        })}>
        <HideBoardListSidebarButton />
      </div>
    </div>
  )
}
