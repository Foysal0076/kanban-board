import { fireEvent, render, screen } from '@testing-library/react'

import { Textarea } from '@/components/ui'

describe('Textarea', () => {
  it('renders correctly with default props', () => {
    render(<Textarea />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeInTheDocument()
  })

  it('applies custom className correctly', () => {
    render(<Textarea className='custom-class' />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Textarea ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })

  it('handles disabled state', () => {
    render(<Textarea disabled />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeDisabled()
  })

  it('handles user input correctly', () => {
    const onChange = jest.fn()
    render(<Textarea onChange={onChange} />)

    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'test content' } })
    expect(onChange).toHaveBeenCalled()
    expect(textarea).toHaveValue('test content')
  })

  it('respects minimum height', () => {
    render(<Textarea />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass('min-h-[60px]')
  })

  // snapshot test
  it('matches snapshot', () => {
    const { container } = render(<Textarea />)
    expect(container).toMatchSnapshot()
  })
})
