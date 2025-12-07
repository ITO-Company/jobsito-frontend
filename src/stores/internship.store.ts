import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface InternshipStore {
  internshipId: string | null
  setInternshipId: (id: string) => void
  clearInternshipId: () => void
}

export const useInternshipStore = create<InternshipStore>()(
  persist(
    (set) => ({
      internshipId: null,
      
      setInternshipId: (id: string) => {
        set({ internshipId: id })
      },
      
      clearInternshipId: () => {
        set({ internshipId: null })
      },
    }),
    {
      name: 'internship-store',
      storage: {
        getItem: (name: string) => {
          const item = localStorage.getItem(name)
          return item ? JSON.parse(item) : null
        },
        setItem: (name: string, value: any) => {
          localStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: (name: string) => {
          localStorage.removeItem(name)
        },
      },
    }
  )
)
