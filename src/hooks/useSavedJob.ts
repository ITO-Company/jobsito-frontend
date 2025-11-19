import { useCallback, useState } from 'react'
import { savedJobService } from '@/services/savedJob.service'

export const useSavedJobCreate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const createSavedJob = useCallback(async (jobPostingId: string) => {
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await savedJobService.create(jobPostingId)
      setSuccess(true)
      return response.data
    } catch (error: any) {
      let errorMessage = 'Error al guardar trabajo'
      
      // Manejar error 409 (ya guardado)
      if (error.response?.status === 409) {
        errorMessage = 'Este trabajo ya está en tus guardados'
      } else {
        errorMessage = error.response?.data?.error || errorMessage
      }
      
      setError(errorMessage)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return { createSavedJob, isSubmitting, error, success }
}

export const useSavedJobList = () => {
  const [savedJobs, setSavedJobs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMySavedJobs = useCallback(async (limit: number = 10, offset: number = 0) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await savedJobService.getMySavedJobs(limit, offset)
      setSavedJobs(response.data.data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cargar trabajos guardados'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { savedJobs, isLoading, error, fetchMySavedJobs }
}

export const useSavedJobDelete = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteSavedJob = useCallback(async (id: string) => {
    setIsSubmitting(true)
    setError(null)

    try {
      await savedJobService.delete(id)
      return true
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al eliminar trabajo guardado'
      setError(errorMessage)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return { deleteSavedJob, isSubmitting, error }
}
