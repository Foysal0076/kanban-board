import '@testing-library/jest-dom'

import { render } from '@testing-library/react'

import { Avatar } from '@/components/ui'

describe('Avatar', () => {
  it('renders correctly with name only', () => {
    const { getByTestId, getByText } = render(<Avatar name='John Doe' />)
    const avatar = getByTestId('avatar')

    expect(avatar).toBeInTheDocument()
    expect(getByText('JD')).toBeInTheDocument()
    expect(avatar).toHaveClass(
      'relative flex h-8 w-8 items-center justify-center rounded-full border bg-card'
    )
  })

  it('renders image when URL is provided', () => {
    const { container } = render(
      <Avatar name='John Doe' url='/images/user-circle.svg' />
    )
    const image = container.querySelector('img')

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', 'John Doe')
    expect(image).toHaveAttribute('src')
    expect(image).toHaveClass('rounded-full object-cover')
  })

  it('applies custom className', () => {
    const { getByTestId } = render(
      <Avatar name='John Doe' className='custom-class' />
    )

    expect(getByTestId('avatar')).toHaveClass('custom-class')
  })

  it('applies custom textClassName to initials', () => {
    const { getByText } = render(
      <Avatar name='John Doe' textClassName='custom-text-class' />
    )

    expect(getByText('JD')).toHaveClass('custom-text-class')
  })

  // Snapshot test
  it('matches snapshot', () => {
    const { container } = render(<Avatar name='John Doe' />)
    expect(container).toMatchSnapshot()
  })
  // Snapshot test with image
  it('matches snapshot with image', () => {
    const { container } = render(
      <Avatar name='John Doe' url='/images/user-circle.svg' />
    )
    expect(container).toMatchSnapshot()
  })
})
