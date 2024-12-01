import { fireEvent, render, screen } from '@testing-library/react'

import { Radio } from '@/components/ui'

describe('Radio', () => {
  const onChange = jest.fn()

  it('renders correctly with default props', () => {
    render(<Radio onChange={onChange} />)
    const radio = screen.getByRole('radio')
    expect(radio).toBeInTheDocument()
  })

  it('applies custom className correctly', () => {
    render(<Radio className='custom-class' onChange={onChange} />)
    const radio = screen.getByRole('radio')
    expect(radio).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Radio ref={ref} onChange={onChange} />)
    expect(ref).toHaveBeenCalled()
  })

  it('handles disabled state', () => {
    render(<Radio disabled onChange={onChange} />)
    const radio = screen.getByRole('radio')
    expect(radio).toBeDisabled()
  })

  it('handles user input correctly', () => {
    render(<Radio onChange={onChange} />)
    const radio = screen.getByRole('radio')
    fireEvent.click(radio)
    expect(onChange).toHaveBeenCalled()
    expect(radio).toBeChecked()
  })

  it('renders label correctly', () => {
    render(<Radio label='Test Label' onChange={onChange} />)
    const label = screen.getByText('Test Label')
    expect(label).toBeInTheDocument()
  })

  // Snapshot test
  it('renders correctly with default props', () => {
    const { container } = render(<Radio onChange={onChange} />)
    expect(container).toMatchSnapshot()
  })
})
