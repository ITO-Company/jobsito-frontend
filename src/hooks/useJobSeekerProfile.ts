import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { jobSeekerService } from '@/services/jobseeker.service'
import { useJobSeekerStore } from '@/stores/jobseeker.store'
import { jobSeekerUpdateSchema, type JobSeekerUpdateInput } from '@/schemas/profile.schema'

export const useJobSeekerProfile = () => {
  const { setJobSeeker, setLoading, setError } = useJobSeekerStore()

  const fetchProfile = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await jobSeekerService.getMe()
      setJobSeeker(response.data)
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cargar perfil'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [setJobSeeker, setLoading, setError])

  const updateProfile = useCallback(
    async (data: Partial<JobSeekerUpdateInput>) => {
      setLoading(true)
      setError(null)

      try {
        const response = await jobSeekerService.updateMe(data)
        setJobSeeker(response.data)
        return response.data
      } catch (error: any) {
        const errorMessage = error.response?.data?.error || 'Error al actualizar perfil'
        setError(errorMessage)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [setJobSeeker, setLoading, setError]
  )

  return { fetchProfile, updateProfile }
}

export const useJobSeekerUpdateForm = () => {
  const { updateProfile } = useJobSeekerProfile()

  const form = useForm<JobSeekerUpdateInput>({
    resolver: zodResolver(jobSeekerUpdateSchema),
    mode: 'onBlur',
  })

  const onSubmit = useCallback(
    async (data: JobSeekerUpdateInput) => {
      try {
        await updateProfile(data)
      } catch (error) {
        console.error('Update failed:', error)
      }
    },
    [updateProfile]
  )

  return { form, onSubmit }
}
