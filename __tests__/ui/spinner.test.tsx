import '@testing-library/jest-dom'

import { render } from '@testing-library/react'

import { Spinner } from '@/components/ui'

describe('Spinner', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<Spinner />)
    const spinner = container.querySelector('svg')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('h-6 w-6 animate-spin text-primary')
  })

  it('applies custom className', () => {
    const { container } = render(<Spinner className='custom-class' />)
    const spinner = container.querySelector('svg')
    expect(spinner).toHaveClass('custom-class')
    expect(spinner).toHaveClass('h-6 w-6 animate-spin text-primary')
  })

  it('forwards additional SVG props', () => {
    const { container } = render(
      <Spinner data-testid='test-spinner' aria-label='Loading' />
    )
    const spinner = container.querySelector('svg')
    expect(spinner).toHaveAttribute('aria-label', 'Loading')
  })

  // Snapshot test
  it('matches snapshot', () => {
    const { container } = render(<Spinner />)
    expect(container).toMatchSnapshot()
  })
})
