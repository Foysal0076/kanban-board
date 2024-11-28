'use client'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import useClickOutside from '@/hooks/use-click-outside'

// 1. Popover - holds the state and methods, and expose it through context
// 2. Trigger - attach the trigger method to children
// 3. Content - render conditionally based on the state, through context
// 4. Close - attach the close method to children

// TODO: cover more positions
type Position = 'left' | 'right' | 'center'

const defaultRect: DOMRect = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  bottom: 0,
  right: 0,
  toJSON: () => ({}),
}

const MenuContext = React.createContext<{
  isShow: boolean
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
  preferredPosition: Position
  triggerRect: DOMRect
  setTriggerRect: React.Dispatch<React.SetStateAction<DOMRect>>
}>({
  isShow: false,
  setIsShow: () => {
    throw new Error('MenuContext setIsShow should be used under provider')
  },
  preferredPosition: 'right',
  triggerRect: defaultRect,
  setTriggerRect: () => {
    throw new Error('MenuContext setTriggerRect should be used under provider')
  },
})

export default function Menu({
  children,
  preferredPosition = 'right',
}: {
  children: React.ReactNode
  preferredPosition?: Position
}) {
  const [isShow, setIsShow] = useState(false)
  const [triggerRect, setTriggerRect] = useState(defaultRect)

  const pathname = usePathname()

  const contextValue = {
    isShow,
    setIsShow,
    preferredPosition,
    triggerRect,
    setTriggerRect,
  }

  useEffect(() => {
    setIsShow(false)
  }, [pathname])

  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  )
}

function Trigger({ children }: { children: React.ReactElement }) {
  const { setIsShow, setTriggerRect } = useContext(MenuContext)

  const ref = useRef<HTMLElement>(null)

  const onClick = (_e: MouseEvent) => {
    const element = ref.current
    if (element == null) {
      return
    }

    const rect = element.getBoundingClientRect()
    setTriggerRect(rect)
    setIsShow((isShow) => !isShow)
  }

  const childrenToTriggerPopover = React.cloneElement(children, {
    onClick, // TODO: we better merge the onClick
    ref, // TODO: we better merge the ref
  })

  return childrenToTriggerPopover
}

function Content({ children }: { children: React.ReactNode }) {
  const { isShow } = useContext(MenuContext)

  if (!isShow) {
    return null
  }

  return <ContentInternal>{children}</ContentInternal>
}

function ContentInternal({ children }: { children: React.ReactNode }) {
  const { triggerRect, preferredPosition, setIsShow } = useContext(MenuContext)
  const ref = useRef<HTMLDialogElement>(null)
  const [coords, setCoords] = useState({
    left: 0,
    top: 0,
    transform: 'none',
  })

  useLayoutEffect(() => {
    const element = ref.current
    if (element == null) {
      return
    }

    const rect = element.getBoundingClientRect()

    const coords = getPopoverCoords(triggerRect, rect, preferredPosition)
    setCoords(coords)
  }, [])

  const refFocusTrapping = useFocusTrapping()

  const dismiss = useCallback(() => {
    setIsShow(false)
  }, [])
  const refClickOutside = useClickOutside(ref, dismiss)

  const mergedRef = mergeRef(ref, refFocusTrapping, refClickOutside)

  return (
    <dialog
      open={true}
      ref={mergedRef}
      style={{
        position: 'fixed',
        zIndex: 9999,
        left: `${coords.left}px`,
        top: `${coords.top}px`,
        transform: coords.transform,
        margin: 0,
      }}>
      {children}
    </dialog>
  )
}

function Close({ children }: { children: React.ReactElement }) {
  const { setIsShow } = useContext(MenuContext)
  const onClick = (e: MouseEvent) => {
    setIsShow(false)

    // popover will be gone
    // prevent this event triggering unexpected click
    e.stopPropagation()
  }
  const childrenToClosePopover = React.cloneElement(children, {
    onClick, // TODO: we better merge the onClick
  })

  return childrenToClosePopover
}

Menu.Trigger = Trigger
Menu.Content = Content
Menu.Close = Close

function getPopoverCoords(
  triggerRect: DOMRect,
  popoverRect: DOMRect,
  position: Position
) {
  const offset = 4
  let top: number = triggerRect.top + triggerRect.height + offset
  let left: number
  let transform: string = 'none'

  switch (position) {
    case 'left':
      left = triggerRect.left - offset - popoverRect.width
      break
    case 'center':
      left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2
      break
    case 'right':
    default:
      left = triggerRect.right + offset
      break
  }

  const overflowAtLeft = left < offset
  const overflowAtRight = left + popoverRect.width > window.innerWidth
  const overflowAtTop = top < offset
  const overflowAtBottom = top + popoverRect.height > window.innerHeight

  // If content overflow at the bottom, show on top
  if (overflowAtBottom) {
    top = triggerRect.top - offset - popoverRect.height
  }

  // If content overflow at the right, show on left
  if (overflowAtRight) {
    left = triggerRect.left - offset - popoverRect.width
  }

  // If content overflow at the left, show on right
  if (overflowAtLeft) {
    left = triggerRect.right + offset
  }

  // If content overflow at the top, show on bottom
  if (overflowAtTop) {
    left = triggerRect.left - offset
  }

  return {
    top,
    left,
    transform,
  }
}

// TODO: better focusable query
const focusableQuery = ':is(input, button, [tab-index]'

// some hooks
function useFocusTrapping() {
  // @ts-ignore TODO: fix the typings
  const refTrigger = useRef<HTMLElement>(document.activeElement)
  const ref = useRef<HTMLElement>(null)

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    const popover = ref.current
    if (popover == null) {
      return
    }
    const focusables = [...popover.querySelectorAll(focusableQuery)]

    switch (e.key) {
      case 'Tab':
        // check if it is the last focusable
        const lastFocusable = focusables[focusables.length - 1]
        if (document.activeElement === lastFocusable) {
          // @ts-ignore, TODO: fix typing
          focusables[0]?.focus()

          e.preventDefault()
        }
    }
  }, [])

  useEffect(() => {
    const popover = ref.current
    if (popover == null) {
      return
    }

    const focusables = [...popover.querySelectorAll(focusableQuery)]
    // 1. focus the first focusable
    // @ts-ignore, TODO: fix typing
    focusables[0]?.focus()
    // console.log('mount popover focusing', focusables[0])

    // 2. attach keyboard event listener to trap the focus
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)

      // 3. refocus the trigger after dismissing
      // but only if the current activeElement is body
      // since this happens after popover is gone
      // am I right about this?
      const trigger = refTrigger.current
      const currentActiveElement = document.activeElement
      if (currentActiveElement == document.body) {
        trigger?.focus()
      }
    }
  }, [])

  return ref
}

function mergeRef<T>(
  ...refs: Array<React.MutableRefObject<T> | React.RefCallback<T>>
) {
  return (el: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(el)
      } else {
        ref.current = el
      }
    })
  }
}
