'use client'

import { create } from 'zustand'

type ModalTypes = {
  view: React.ReactNode
  isOpen: boolean
  customSize?: string
  size?: string
}

type ModalStore = ModalTypes & {
  // eslint-disable-next-line
  openModal: (params: Omit<ModalTypes, 'isOpen'>) => void
  closeModal: () => void
}

export const useModal = create<ModalStore>((set) => ({
  view: null,
  isOpen: false,
  customSize: '320px',
  size: 'sm',

  openModal: ({ view, customSize, size }) =>
    set(() => ({
      isOpen: true,
      view,
      customSize,
      size,
    })),

  closeModal: () =>
    set(() => ({
      isOpen: false,
    })),
}))
