import { useCallback, useState } from 'react'
import { issueService, type IssueCreatePayload, type IssueUpdatePayload, type IssueResponse } from '@/services/issue.service'

export const useIssueCreate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createIssue = useCallback(async (data: IssueCreatePayload) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await issueService.create(data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al crear issue'
      setError(errorMessage)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return { createIssue, isSubmitting, error }
}

export const useIssueDetail = () => {
  const [issue, setIssue] = useState<IssueResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchIssue = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await issueService.getById(id)
      setIssue(response.data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cargar issue'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { issue, isLoading, error, fetchIssue, setIssue }
}

export const useIssueList = () => {
  const [issues, setIssues] = useState<IssueResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchIssuesByMilestone = useCallback(async (milestoneId: string, limit: number = 10, offset: number = 0) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await issueService.getByMilestoneId(milestoneId, limit, offset)
      setIssues(response.data.data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cargar issues'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { issues, isLoading, error, fetchIssuesByMilestone, setIssues }
}

export const useIssueUpdate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateIssue = useCallback(async (id: string, data: IssueUpdatePayload) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await issueService.update(id, data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al actualizar issue'
      setError(errorMessage)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return { updateIssue, isSubmitting, error }
}
