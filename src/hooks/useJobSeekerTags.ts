import { useCallback, useState } from 'react'
import { jobSeekerService } from '@/services/jobseeker.service'
import { globalTagsService } from '@/services/globaltags.service'
import { useGlobalTagsStore } from '@/stores/globaltags.store'
import { useJobSeekerStore } from '@/stores/jobseeker.store'

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
  const { setJobSeeker } = useJobSeekerStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addTag = useCallback(
    async (tagId: string, proficiency: string = '') => {
      setIsSubmitting(true)
      setError(null)

      try {
        await jobSeekerService.addTag(tagId, proficiency)
        // Después de agregar la tag, recargamos el jobSeeker para obtener los datos actualizados
        const response = await jobSeekerService.getMe()
        setJobSeeker(response.data)
        return response.data
      } catch (error: any) {
        const errorMessage = error.response?.data?.error || 'Error al agregar tag'
        setError(errorMessage)
        throw error
      } finally {
        setIsSubmitting(false)
      }
    },
    [setError, setJobSeeker]
  )

  const removeTag = useCallback(
    async (tagId: string) => {
      setIsSubmitting(true)
      setError(null)

      try {
        await jobSeekerService.removeTag(tagId)
        // Después de remover la tag, recargamos el jobSeeker para obtener los datos actualizados
        const response = await jobSeekerService.getMe()
        setJobSeeker(response.data)
        return response.data
      } catch (error: any) {
        const errorMessage = error.response?.data?.error || 'Error al remover tag'
        setError(errorMessage)
        throw error
      } finally {
        setIsSubmitting(false)
      }
    },
    [setError, setJobSeeker]
  )

  return { addTag, removeTag, isSubmitting }
}
