import { RefObject, useEffect } from 'react'

function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (_event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    // Check if document is defined to ensure this runs only on the client side
    if (typeof document === 'undefined') {
      return
    }

    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    // Delay it to avoid treating trigger click as click outside
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)
    }, 0)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
  return ref
}

export default useClickOutside
