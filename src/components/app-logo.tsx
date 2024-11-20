import { AppIcon } from '@/icons'

const AppLogo = () => {
  return (
    <div className='flex items-center justify-center gap-2 tracking-tighter text-primary'>
      <AppIcon className='h-6 w-6 md:h-[1.625rem] md:w-[1.625rem]' />
      <h1 className='text-[1.75rem] font-semibold leading-none text-foreground md:text-[2.125rem]'>
        kanban
      </h1>
    </div>
  )
}

export default AppLogo
