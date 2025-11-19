import { create } from 'zustand'
import type { JobSeekerResponse } from '@/services/jobseeker.service'

export interface JobSeekerStore {
  jobSeeker: JobSeekerResponse | null
  isLoading: boolean
  error: string | null

  setJobSeeker: (jobSeeker: JobSeekerResponse | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

export const useJobSeekerStore = create<JobSeekerStore>((set) => ({
  jobSeeker: null,
  isLoading: false,
  error: null,

  setJobSeeker: (jobSeeker) => set({ jobSeeker }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}))
