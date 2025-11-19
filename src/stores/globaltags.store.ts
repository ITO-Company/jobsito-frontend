import { create } from 'zustand'
import type { GlobalTag } from '@/services/globaltags.service'

export interface GlobalTagsStore {
  tags: GlobalTag[]
  isLoading: boolean
  error: string | null

  setTags: (tags: GlobalTag[]) => void
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
