import { useCallback, useState } from 'react'
import { applicationService, type ApplicationCreatePayload, type ApplicationUpdatePayload } from '@/services/application.service'

export const useApplicationCreate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createApplication = useCallback(async (data: ApplicationCreatePayload) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await applicationService.create(data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al postular a la oferta'
      setError(errorMessage)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return { createApplication, isSubmitting, error }
}

export const useApplicationList = () => {
  const [applications, setApplications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMyApplications = useCallback(async (limit: number = 10, offset: number = 0) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await applicationService.getMyApplications(limit, offset)
      setApplications(response.data.data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cargar aplicaciones'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { applications, isLoading, error, fetchMyApplications }
}

export const useApplicationDetail = () => {
  const [application, setApplication] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchApplication = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await applicationService.getById(id)
      setApplication(response.data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cargar aplicación'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { application, isLoading, error, fetchApplication, setApplication }
}

export const useApplicationsByJobPosting = () => {
  const [applications, setApplications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchApplicationsByJobPosting = useCallback(
    async (jobPostingId: string, limit: number = 10, offset: number = 0) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await applicationService.getApplicationsByJobPosting(jobPostingId, limit, offset)
        setApplications(response.data.data)
        return response.data
      } catch (error: any) {
        const errorMessage = error.response?.data?.error || 'Error al cargar aplicaciones'
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  return { applications, isLoading, error, fetchApplicationsByJobPosting }
}

export const useApplicationUpdate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateApplication = useCallback(async (id: string, data: ApplicationUpdatePayload) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await applicationService.update(id, data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al actualizar aplicación'
      setError(errorMessage)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return { updateApplication, isSubmitting, error }
}

export const useAcceptedApplications = () => {
  const [applications, setApplications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAcceptedApplications = useCallback(async (limit: number = 10, offset: number = 0) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await applicationService.getAcceptedApplications(limit, offset)
      setApplications(response.data.data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cargar aplicaciones aceptadas'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { applications, isLoading, error, fetchAcceptedApplications }
}
