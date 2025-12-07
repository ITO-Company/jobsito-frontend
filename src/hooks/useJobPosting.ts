import { useCallback, useState } from 'react'
import { jobPostingService, type JobPostingCreateInput, type JobPostingUpdateInput } from '@/services/jobposting.service'
import { useJobPostingStore } from '@/stores/jobposting.store'
import { globalTagsService } from '@/services/globaltags.service'
import { useGlobalTagsStore } from '@/stores/globaltags.store'

export const useJobPostingList = () => {
  const { setJobPostings, setLoading, setError } = useJobPostingStore()

  const fetchJobPostings = useCallback(async (limit: number = 10, offset: number = 0, tagIds?: string[], companyId?: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await jobPostingService.getAll(limit, offset, tagIds, companyId)
      console.log('Fetched job postings:', response.data.data)
      setJobPostings(response.data.data)
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cargar ofertas'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [setJobPostings, setLoading, setError])

  return { fetchJobPostings }
}

export const useJobPostingDetail = () => {
  const [jobPosting, setJobPosting] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchJobPosting = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await jobPostingService.getById(id)
      setJobPosting(response.data)
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cargar oferta'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { jobPosting, isLoading, error, fetchJobPosting, setJobPosting }
}

export const useJobPostingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createJobPosting = useCallback(async (data: JobPostingCreateInput) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await jobPostingService.create(data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al crear oferta'
      setError(errorMessage)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const updateJobPosting = useCallback(async (id: string, data: JobPostingUpdateInput) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await jobPostingService.update(id, data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al actualizar oferta'
      setError(errorMessage)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return { createJobPosting, updateJobPosting, isSubmitting, error }
}

export const useJobPostingTags = () => {
  const { setTags, setLoading: setTagsLoading, setError: setTagsError } = useGlobalTagsStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchGlobalTags = useCallback(async (limit: number = 50, offset: number = 0) => {
    setTagsLoading(true)
    setTagsError(null)

    try {
      const response = await globalTagsService.getAll(limit, offset)
      setTags(response.data.data)
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cargar tags'
      setTagsError(errorMessage)
    } finally {
      setTagsLoading(false)
    }
  }, [setTags, setTagsLoading, setTagsError])

  const addTagToJobPosting = useCallback(async (jobPostingId: string, tagId: string) => {
    setIsSubmitting(true)
    setTagsError(null)

    try {
      await jobPostingService.addTag(jobPostingId, tagId)
      return true
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al agregar tag'
      setTagsError(errorMessage)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [setTagsError])

  const removeTagFromJobPosting = useCallback(async (jobPostingId: string, tagId: string) => {
    setIsSubmitting(true)
    setTagsError(null)

    try {
      await jobPostingService.removeTag(jobPostingId, tagId)
      return true
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al remover tag'
      setTagsError(errorMessage)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [setTagsError])

  return { fetchGlobalTags, addTagToJobPosting, removeTagFromJobPosting, isSubmitting }
}
