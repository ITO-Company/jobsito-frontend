import { useCallback, useState } from 'react'
import { internshipService, type IntershipCreatePayload, type IntershipResponse } from '@/services/internship.service'

export const useInternshipCreate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createInternship = useCallback(async (data: IntershipCreatePayload) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await internshipService.create(data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al crear pasantía'
      setError(errorMessage)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return { createInternship, isSubmitting, error }
}

export const useInternshipDetail = () => {
  const [internship, setInternship] = useState<IntershipResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchInternship = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await internshipService.getById(id)
      setInternship(response.data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cargar pasantía'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { internship, isLoading, error, fetchInternship }
}

export const useInternshipListSeeker = () => {
  const [internships, setInternships] = useState<IntershipResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMyInternships = useCallback(async (limit: number = 10, offset: number = 0) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await internshipService.getMyInternships(limit, offset)
      setInternships(response.data.data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cargar pasantías'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { internships, isLoading, error, fetchMyInternships }
}

export const useInternshipListCompany = () => {
  const [internships, setInternships] = useState<IntershipResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCompanyInternships = useCallback(async (limit: number = 10, offset: number = 0) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await internshipService.getCompanyInternships(limit, offset)
      setInternships(response.data.data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cargar pasantías'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { internships, isLoading, error, fetchCompanyInternships }
}

export const useInternshipOverview = () => {
  const [overview, setOverview] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOverview = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await internshipService.getOverview(id)
      setOverview(response.data)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cargar overview'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { overview, isLoading, error, fetchOverview }
}

export const useInternshipOverviewList = () => {
  const [internships, setInternships] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)

  const fetchOverviewList = useCallback(async (limit: number = 10, offset: number = 0) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await internshipService.getOverviewList(limit, offset)
      setInternships(response.data.data)
      setTotal(response.data.total)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cargar overview'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { internships, isLoading, error, total, fetchOverviewList }
}

export const useInternshipOverviewListCoordinator = () => {
  const [internships, setInternships] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)

  const fetchOverviewList = useCallback(async (limit: number = 10, offset: number = 0) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await internshipService.getOverviewListCoordinator(limit, offset)
      setInternships(response.data.data)
      setTotal(response.data.total)
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cargar overview'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { internships, isLoading, error, total, fetchOverviewList }
}

