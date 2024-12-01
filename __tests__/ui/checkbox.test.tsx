import { fireEvent, render, screen } from '@testing-library/react'

import { Checkbox } from '@/components/ui'

describe('Checkbox', () => {
  const onChange = jest.fn()

  it('renders correctly with default props', () => {
    render(<Checkbox onChange={onChange} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
  })

  it('applies custom className correctly', () => {
    render(<Checkbox className='custom-class' onChange={onChange} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Checkbox ref={ref} onChange={onChange} />)
    expect(ref).toHaveBeenCalled()
  })

  it('handles disabled state', () => {
    render(<Checkbox disabled onChange={onChange} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDisabled()
  })

  it('handles user input correctly', () => {
    render(<Checkbox onChange={onChange} />)
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(onChange).toHaveBeenCalled()
    expect(checkbox).toBeChecked()
  })

  it('renders label correctly', () => {
    render(<Checkbox label='Test Label' onChange={onChange} />)
    const label = screen.getByText('Test Label')
    expect(label).toBeInTheDocument()
  })

  it('triggers input click when label is clicked', () => {
    render(<Checkbox label='Test Label' onChange={onChange} />)
    const label = screen.getByText('Test Label')
    fireEvent.click(label)
    const checkbox = screen.getByRole('checkbox')
    expect(onChange).toHaveBeenCalled()
    expect(checkbox).toBeChecked()
  })

  // Snapshot test
  it('renders correctly with default props', () => {
    const { container } = render(<Checkbox onChange={onChange} />)
    expect(container).toMatchSnapshot()
  })
})
