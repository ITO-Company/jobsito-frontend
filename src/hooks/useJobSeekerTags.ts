import { useCallback, useState } from 'react'
import { jobSeekerService } from '@/services/jobseeker.service'
import { globalTagsService } from '@/services/globaltags.service'
import { useGlobalTagsStore } from '@/stores/globaltags.store'

export const useGlobalTags = () => {
  const { setTags, setLoading, setError } = useGlobalTagsStore()

  const fetchTags = useCallback(async (limit: number = 10, offset: number = 0) => {
    setLoading(true)
    setError(null)

    try {
      const response = await globalTagsService.getAll(limit, offset)
      setTags(response.data.data)
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cargar tags'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [setTags, setLoading, setError])

  return { fetchTags }
}

export const useJobSeekerTags = () => {
  const { setError } = useGlobalTagsStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addTag = useCallback(
    async (tagId: string, proficiency: string = '') => {
      setIsSubmitting(true)
      setError(null)

      try {
        await jobSeekerService.addTag(tagId, proficiency)
      } catch (error: any) {
        const errorMessage = error.response?.data?.error || 'Error al agregar tag'
        setError(errorMessage)
        throw error
      } finally {
        setIsSubmitting(false)
      }
    },
    [setError]
  )

  const removeTag = useCallback(
    async (tagId: string) => {
      setIsSubmitting(true)
      setError(null)

      try {
        await jobSeekerService.removeTag(tagId)
      } catch (error: any) {
        const errorMessage = error.response?.data?.error || 'Error al remover tag'
        setError(errorMessage)
        throw error
      } finally {
        setIsSubmitting(false)
      }
    },
    [setError]
  )

  return { addTag, removeTag, isSubmitting }
}
