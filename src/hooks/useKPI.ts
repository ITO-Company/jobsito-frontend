import { useCallback, useState } from 'react'
import { kpiService, type MilestoneKPI, type IssueKPI, type RequestKPI } from '@/services/kpi.service'

// Company KPI Hooks

export const useCompanyMilestoneKPI = () => {
  const [data, setData] = useState<MilestoneKPI | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await kpiService.getCompanyMilestoneKPI()
      setData(response.data)
      return response.data
    } catch (err: any) {
      const message = err.response?.data?.error || 'Error al cargar KPI de milestones'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { data, isLoading, error, fetch }
}

export const useCompanyIssueKPI = () => {
  const [data, setData] = useState<IssueKPI | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await kpiService.getCompanyIssueKPI()
      setData(response.data)
      return response.data
    } catch (err: any) {
      const message = err.response?.data?.error || 'Error al cargar KPI de issues'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { data, isLoading, error, fetch }
}

export const useCompanyRequestKPI = () => {
  const [data, setData] = useState<RequestKPI | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await kpiService.getCompanyRequestKPI()
      setData(response.data)
      return response.data
    } catch (err: any) {
      const message = err.response?.data?.error || 'Error al cargar KPI de requests'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { data, isLoading, error, fetch }
}

// Intership KPI Hooks (for jobseeker)

export const useIntershipMilestoneKPI = () => {
  const [data, setData] = useState<MilestoneKPI | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async (intershipId: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await kpiService.getIntershipMilestoneKPI(intershipId)
      setData(response.data)
      return response.data
    } catch (err: any) {
      const message = err.response?.data?.error || 'Error al cargar KPI de milestones'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { data, isLoading, error, fetch }
}

export const useIntershipIssueKPI = () => {
  const [data, setData] = useState<IssueKPI | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async (intershipId: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await kpiService.getIntershipIssueKPI(intershipId)
      setData(response.data)
      return response.data
    } catch (err: any) {
      const message = err.response?.data?.error || 'Error al cargar KPI de issues'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { data, isLoading, error, fetch }
}

export const useIntershipRequestKPI = () => {
  const [data, setData] = useState<RequestKPI | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async (intershipId: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await kpiService.getIntershipRequestKPI(intershipId)
      setData(response.data)
      return response.data
    } catch (err: any) {
      const message = err.response?.data?.error || 'Error al cargar KPI de requests'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { data, isLoading, error, fetch }
}
