import { fireEvent, render, screen } from '@testing-library/react'

import { Input } from '@/components/ui'

describe('Input', () => {
  it('renders correctly with default props', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('applies custom className correctly', () => {
    render(<Input className='custom-class' />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-class')
  })

  it('handles different input types', () => {
    render(<Input type='password' aria-label='password' />)
    const input = screen.getByLabelText('password')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Input ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })

  it('handles disabled state', () => {
    render(<Input disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('handles user input correctly', () => {
    const onChange = jest.fn()
    render(<Input onChange={onChange} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })
    expect(onChange).toHaveBeenCalled()
    expect(input).toHaveValue('test')
  })

  //snapshot tests
  it('renders correctly with default props', () => {
    const { container } = render(<Input />)
    expect(container).toMatchSnapshot()
  })
})
