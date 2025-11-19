import { useCallback, useState } from 'react'
import { milestoneService, type MilestoneCreatePayload, type MilestoneUpdatePayload, type MilestoneResponse } from '@/services/milestone.service'

export const useMilestoneCreate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createMilestone = useCallback(async (data: MilestoneCreatePayload) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await milestoneService.create(data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al crear milestone'
      setError(errorMessage)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return { createMilestone, isSubmitting, error }
}

export const useMilestoneDetail = () => {
  const [milestone, setMilestone] = useState<MilestoneResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMilestone = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await milestoneService.getById(id)
      setMilestone(response.data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cargar milestone'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { milestone, isLoading, error, fetchMilestone, setMilestone }
}

export const useMilestoneList = () => {
  const [milestones, setMilestones] = useState<MilestoneResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMilestonesByInternship = useCallback(async (internshipId: string, limit: number = 10, offset: number = 0) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await milestoneService.getByInternshipId(internshipId, limit, offset)
      setMilestones(response.data.data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cargar milestones'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { milestones, isLoading, error, fetchMilestonesByInternship, setMilestones }
}

export const useMilestoneUpdate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateMilestone = useCallback(async (id: string, data: MilestoneUpdatePayload) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await milestoneService.update(id, data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al actualizar milestone'
      setError(errorMessage)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return { updateMilestone, isSubmitting, error }
}
