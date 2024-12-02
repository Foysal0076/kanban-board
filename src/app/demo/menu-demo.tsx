'use client'
import Menu from '@/components/menu'
import { Button } from '@/components/ui'

export default function MenuDemo() {
  const onDelete = () => {
    // console.log('delete')
  }
  const onEdit = () => {
    // console.log('edit')
  }

  return (
    <div className='grid grid-cols-2 justify-end gap-8 px-24'>
      <Menu preferredPosition='left'>
        <Menu.Trigger>
          <Button className='inline-flex'>
            {/* <ThreeDotsVerticalIcon /> */}
            Open Menu at Left
          </Button>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Close>
            <div className='card bg-popover p-2'>
              <div className='flex flex-col'>
                <Button variant={'ghost'} onClick={onEdit}>
                  Edit
                </Button>
                <Button variant={'ghost'} onClick={onDelete}>
                  Delete
                </Button>
                <Button variant={'ghost'} onClick={onDelete}>
                  Delete
                </Button>
                <Button variant={'ghost'} onClick={onDelete}>
                  Delete
                </Button>
                <Button variant={'ghost'} onClick={onDelete}>
                  Delete
                </Button>
                <Button variant={'ghost'} onClick={onDelete}>
                  Delete
                </Button>
                <Button variant={'ghost'} onClick={onDelete}>
                  Delete
                </Button>
                <Button variant={'ghost'} onClick={onDelete}>
                  Delete
                </Button>
                <Button variant={'ghost'} onClick={onDelete}>
                  Delete
                </Button>
              </div>
            </div>
          </Menu.Close>
        </Menu.Content>
      </Menu>
      <Menu preferredPosition='right'>
        <Menu.Trigger>
          <Button className='inline-flex'>
            {/* <ThreeDotsVerticalIcon /> */}
            Open Menu Open Menu Open Menu Open Menu
          </Button>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Close>
            <div className='card bg-popover p-2'>
              <div className='flex flex-col'>
                <Button variant={'ghost'} onClick={onEdit}>
                  Edit
                </Button>
                <Button variant={'ghost'} onClick={onDelete}>
                  Delete
                </Button>
              </div>
            </div>
          </Menu.Close>
        </Menu.Content>
      </Menu>
      <Menu preferredPosition='left'>
        <Menu.Trigger>
          <Button className='inline-flex'>
            {/* <ThreeDotsVerticalIcon /> */}
            Open Menu Open Menu Open Menu Open Menu
          </Button>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Close>
            <div className='card bg-popover p-2'>
              <div className='flex flex-col'>
                <Button variant={'ghost'} onClick={onEdit}>
                  Edit
                </Button>
                <Button variant={'ghost'} onClick={onDelete}>
                  Delete
                </Button>
              </div>
            </div>
          </Menu.Close>
        </Menu.Content>
      </Menu>
      <Menu preferredPosition='left'>
        <Menu.Trigger>
          <Button className='inline-flex'>
            {/* <ThreeDotsVerticalIcon /> */}
            Open Menu Open Menu Open Menu Open Menu
          </Button>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Close>
            <div className='card bg-popover p-2'>
              <div className='flex flex-col'>
                <Button variant={'ghost'} onClick={onEdit}>
                  Edit
                </Button>
                <Button variant={'ghost'} onClick={onDelete}>
                  Delete
                </Button>
              </div>
            </div>
          </Menu.Close>
        </Menu.Content>
      </Menu>
    </div>
  )
}
