'use client'

import './modal-styles.css'

import { useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import { cn } from '@/utils'

import ReactPortal from './react-portal'

type Props = {
  children: React.ReactNode
  open: boolean
  handleClose: () => void
  modalId?: string
  containerClassName?: string
}

export const Modal = ({
  children,
  open,
  handleClose,
  modalId = 'defaultModalId',
  containerClassName,
}: Props) => {
  const nodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeOnEscapeKey = (e: any) =>
      e.key === 'Escape' ? handleClose() : null

    document.body.addEventListener('keydown', closeOnEscapeKey)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [handleClose])

  const onBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = event.target as HTMLDivElement
    if (el.id === modalId) {
      handleClose()
    }
  }

  return (
    <ReactPortal wrapperId='react-portal-modal-container'>
      <CSSTransition
        in={open}
        timeout={300}
        unmountOnExit
        classNames='modal'
        nodeRef={nodeRef}>
        <div
          id={modalId}
          onClick={onBackdropClick}
          className={cn(
            'fixed inset-0 z-[999] mx-auto flex w-full items-center justify-center overflow-hidden transition-all duration-300 ease-in-out',
            containerClassName
          )}
          style={{
            background: 'rgba(26, 23, 27, 0.1)',
            backdropFilter: 'blur(16px)',
          }}
          ref={nodeRef}>
          {children}
        </div>
      </CSSTransition>
    </ReactPortal>
  )
}
