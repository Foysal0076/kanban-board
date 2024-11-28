import { create } from 'zustand'

type UiState = {
  isLeftSidebarOpen: boolean
  toggleLeftSidebar: () => void
}

export const useUIStore = create<UiState>((set) => ({
  isLeftSidebarOpen: true,
  toggleLeftSidebar: () =>
    set((state) => ({ isLeftSidebarOpen: !state.isLeftSidebarOpen })),
}))
