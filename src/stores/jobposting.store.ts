import { create } from 'zustand'
import type { JobPostingResponse } from '@/services/types/responses'

export interface JobPostingStore {
  jobPostings: JobPostingResponse[]
  isLoading: boolean
  error: string | null

  setJobPostings: (jobPostings: JobPostingResponse[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

export const useJobPostingStore = create<JobPostingStore>((set) => ({
  jobPostings: [],
  isLoading: false,
  error: null,

  setJobPostings: (jobPostings) => set({ jobPostings }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}))
