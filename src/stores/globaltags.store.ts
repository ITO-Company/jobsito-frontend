import { create } from 'zustand'
import type { GlobalTagResponse } from '@/services/types/responses'

export interface GlobalTagsStore {
  tags: GlobalTagResponse[]
  isLoading: boolean
  error: string | null

  setTags: (tags: GlobalTagResponse[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

export const useGlobalTagsStore = create<GlobalTagsStore>((set) => ({
  tags: [],
  isLoading: false,
  error: null,

  setTags: (tags) => set({ tags }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}))
