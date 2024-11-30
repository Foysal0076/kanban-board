import { fireEvent, render, screen } from '@testing-library/react'

import { Select } from '@/components/ui'

describe('Select', () => {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]

  const onChange = jest.fn()
  const value = '2'

  it('renders correctly with default props', () => {
    render(<Select onChange={onChange} value={value} options={options} />)
    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
  })

  it('selects an option correctly', () => {
    render(<Select options={options} onChange={onChange} value={value} />)
    const select = screen.getByRole('combobox')
    fireEvent.click(select)
    const option = screen.getByText('Option 2')
    fireEvent.click(option)
    const optionContainer = screen.getByTestId('selected-option')
    expect(optionContainer).toHaveTextContent('Option 2')
  })

  it('applies custom className correctly', () => {
    render(
      <Select
        options={options}
        onChange={onChange}
        value={value}
        className='custom-class'
      />
    )
    const select = screen.getByTestId('select-container')
    expect(select).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(
      <Select options={options} onChange={onChange} value={value} ref={ref} />
    )
    expect(ref).toHaveBeenCalled()
  })

  // Key events tests
  it('opens dropdown on Enter key press', () => {
    render(<Select options={options} onChange={onChange} value='' />)
    const select = screen.getByRole('combobox')
    fireEvent.keyDown(select, { key: 'Enter' })
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument()
    })
  })

  it('opens dropdown on Space key press', () => {
    render(<Select options={options} onChange={onChange} value='' />)
    const select = screen.getByRole('combobox')
    fireEvent.keyDown(select, { key: ' ' })
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument()
    })
  })

  it('navigates options with ArrowDown key', () => {
    render(<Select options={options} onChange={onChange} value='' />)
    const select = screen.getByRole('combobox')
    fireEvent.keyDown(select, { key: 'ArrowDown' })
    fireEvent.keyDown(select, { key: 'ArrowDown' })
    const option = screen.getByText('Option 2').parentElement
    expect(option).toHaveClass('hover:bg-accent')
  })

  it('navigates options with ArrowUp key', () => {
    render(<Select options={options} onChange={onChange} value={value} />)
    const select = screen.getByRole('combobox')
    fireEvent.keyDown(select, { key: 'ArrowUp' })
    fireEvent.keyDown(select, { key: 'ArrowUp' })
    const option = screen.getByText('Option 3').parentElement
    expect(option).toHaveClass('bg-accent')
  })

  it('closes dropdown on Escape key press', () => {
    render(<Select options={options} onChange={onChange} value='' />)
    const select = screen.getByRole('combobox')
    fireEvent.keyDown(select, { key: 'Enter' })
    fireEvent.keyDown(select, { key: 'Escape' })
    options.forEach((option) => {
      expect(screen.queryByText(option.label)).not.toBeInTheDocument()
    })
  })

  it('selects highlighted option on Enter key press', () => {
    render(<Select options={options} onChange={onChange} value='' />)
    const select = screen.getByRole('combobox')
    fireEvent.keyDown(select, { key: 'Enter' })
    fireEvent.keyDown(select, { key: 'ArrowDown' })
    fireEvent.keyDown(select, { key: 'Enter' })
    expect(onChange).toHaveBeenCalledWith('1')
  })

  it('closes dropdown when clicking outside', () => {
    render(<Select options={options} onChange={onChange} value='' />)
    const select = screen.getByRole('combobox')
    fireEvent.click(select)
    fireEvent.mouseDown(document)
    options.forEach((option) => {
      expect(screen.queryByText(option.label)).not.toBeInTheDocument()
    })
  })

  it('does not open dropdown when disabled', () => {
    render(<Select options={options} onChange={onChange} value='' disabled />)
    const select = screen.getByRole('combobox')
    fireEvent.click(select)
    options.forEach((option) => {
      expect(screen.queryByText(option.label)).not.toBeInTheDocument()
    })
  })

  it('closes dropdown when clicking outside', () => {
    render(<Select options={options} onChange={onChange} value='' />)
    const select = screen.getByRole('combobox')
    fireEvent.click(select)
    fireEvent.mouseDown(document)
    options.forEach((option) => {
      expect(screen.queryByText(option.label)).not.toBeInTheDocument()
    })
  })

  it('closes dropdown tab is clicked', () => {
    render(<Select options={options} onChange={onChange} value='' />)
    const select = screen.getByRole('combobox')
    fireEvent.click(select)
    fireEvent.keyDown(select, { key: 'Tab' })
    options.forEach((option) => {
      expect(screen.queryByText(option.label)).not.toBeInTheDocument()
    })
  })

  //disabled state
  it('does not open dropdown when disabled', () => {
    render(<Select options={options} onChange={onChange} value='' disabled />)
    const select = screen.getByRole('combobox')
    fireEvent.click(select)
    options.forEach((option) => {
      expect(screen.queryByText(option.label)).not.toBeInTheDocument()
    })
  })

  it('handles disabled state correctly', () => {
    render(<Select options={options} onChange={onChange} value='' disabled />)
    const select = screen.getByRole('combobox')
    expect(select).toHaveAttribute('aria-disabled', 'true')
  })

  // Snapshot test
  it('renders correctly with default props', () => {
    const { container } = render(
      <Select options={options} onChange={onChange} value={value} />
    )
    expect(container).toMatchSnapshot()
  })
})
