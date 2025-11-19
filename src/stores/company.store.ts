import { create } from 'zustand'
import type { CompanyResponse } from '@/services/company.service'

export interface CompanyStore {
  company: CompanyResponse | null
  isLoading: boolean
  error: string | null

  setCompany: (company: CompanyResponse | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  company: null,
  isLoading: false,
  error: null,

  setCompany: (company) => set({ company }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}))
