'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { ToggleDarkIcon, ToggleLightIcon } from '@/icons'
import { cn } from '@/utils'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    if (resolvedTheme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className='h-6 w-6' />

  return (
    <button
      onClick={toggleTheme}
      className='flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-accent'>
      <ToggleDarkIcon
        width={24}
        className={cn(`text-slate-600`, {
          hidden: resolvedTheme === 'dark',
          block: resolvedTheme === 'light',
        })}
      />
      <ToggleLightIcon
        width={24}
        className={cn(`text-yellow-500`, {
          hidden: resolvedTheme === 'light',
          block: resolvedTheme === 'dark',
        })}
      />
    </button>
  )
}
