import { useCallback, useState } from 'react'
import { requestService, type RequestCreatePayload, type RequestUpdatePayload, type RequestReviewPayload, type RequestResponse } from '@/services/request.service'

export const useRequestCreate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createRequest = useCallback(async (data: RequestCreatePayload) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await requestService.create(data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al crear request'
      setError(errorMessage)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return { createRequest, isSubmitting, error }
}

export const useRequestDetail = () => {
  const [request, setRequest] = useState<RequestResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRequest = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await requestService.getById(id)
      setRequest(response.data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cargar request'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { request, isLoading, error, fetchRequest, setRequest }
}

export const useRequestList = () => {
  const [requests, setRequests] = useState<RequestResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRequestsByIssue = useCallback(async (issueId: string, limit: number = 10, offset: number = 0) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await requestService.getByIssueId(issueId, limit, offset)
      setRequests(response.data.data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cargar requests'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { requests, isLoading, error, fetchRequestsByIssue, setRequests }
}

export const useRequestUpdate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateRequest = useCallback(async (id: string, data: RequestUpdatePayload) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await requestService.update(id, data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al actualizar request'
      setError(errorMessage)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return { updateRequest, isSubmitting, error }
}

export const useRequestReview = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const reviewRequest = useCallback(async (id: string, data: RequestReviewPayload) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await requestService.review(id, data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al revisar request'
      setError(errorMessage)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return { reviewRequest, isSubmitting, error }
}
