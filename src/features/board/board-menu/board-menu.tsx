'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'

import Menu from '@/components/menu'
import BoardList from '@/features/board/board-list'
import BoardSettingMenu from '@/features/board/board-menu/board-setting-menu'
import SidebarCreateBoardAction from '@/features/board/create-board/sidebar-create-board-action'
import { useBoardStore } from '@/features/board/store/board.store'
import { useMediaQuery } from '@/hooks/use-media-query'
import { CaretDownIcon } from '@/icons'
import { cn } from '@/utils'

export default function BoardMenu() {
  const { activeBoard } = useBoardStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  const totalBoards = useBoardStore((state) => state.boards.length)

  const isMediumScreen = useMediaQuery('(min-width: 48rem)')

  const pathname = usePathname()
  const isHome = pathname === '/'

  if (!activeBoard?.board?.title || isHome) return null

  if (isMediumScreen) {
    return (
      <div className='flex items-center gap-2'>
        <h1 className='text-sm font-semibold md:text-2xl'>
          {activeBoard.board.title}
        </h1>
        <BoardSettingMenu />
      </div>
    )
  }

  return (
    <Menu preferredPosition='center'>
      <div className='flex gap-2'>
        <Menu.Trigger>
          <button className='flex items-center' onClick={toggleMenu}>
            <h1 className='line-clamp-1 font-semibold md:text-2xl'>
              {activeBoard?.board?.title}
            </h1>
            <CaretDownIcon
              className={cn('ml-1 transition-transform duration-300', {
                'rotate-180': isMenuOpen,
              })}
            />
          </button>
        </Menu.Trigger>
        <BoardSettingMenu />
      </div>
      <Menu.Content>
        <div className='card flex flex-col bg-popover py-4'>
          <div className='mb-4 pl-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground'>
            Al Boards ({totalBoards})
          </div>
          <BoardList />
          <div className='mt-2'>
            <SidebarCreateBoardAction />
          </div>
        </div>
      </Menu.Content>
    </Menu>
  )
}
