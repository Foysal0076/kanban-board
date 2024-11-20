import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { Button } from '@/components/ui'

describe('Button', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass(
      'bg-primary text-primary-foreground shadow hover:bg-primary/90'
    )
  })

  it('applies custom className', () => {
    render(<Button className='custom-class'>Custom Button</Button>)
    const button = screen.getByRole('button', {
      name: 'Custom Button',
    })
    expect(button)
  })

  it('handles click events', async () => {
    const handleClick = jest.fn()

    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByRole('button', { name: 'Disabled Button' })
    expect(button).toBeDisabled()
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Button ref={ref}>Button</Button>)
    expect(ref).toHaveBeenCalled()
  })

  //snapshot tests
  it('renders all variants and sizes', () => {
    const { container } = render(
      <>
        {/* Variants */}
        <Button variant='default'>Default</Button>
        <Button variant='destructive'>Destructive</Button>
        <Button variant='outline'>Outline</Button>
        <Button variant='secondary'>Secondary</Button>
        <Button variant='ghost'>Ghost</Button>
        <Button variant='link'>Link</Button>

        {/* Sizes */}
        <Button size='default'>Default Size</Button>
        <Button size='sm'>Small</Button>
        <Button size='lg'>Large</Button>
        <Button size='icon'>Icon</Button>
      </>
    )
    expect(container).toMatchSnapshot()
  })
})
