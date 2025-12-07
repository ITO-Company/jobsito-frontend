import axiosInstance from '@/lib/axios'
import type { PaginatedResponse } from './types/responses'

export interface JobPostingData {
  id: string
  title: string
  description: string
  salary_min: number
  salary_max: number
}

export interface JobSeekerData {
  id: string
  name: string
  email: string
}

export interface CompanyData {
  id: string
  name: string
}

export interface IntershipResponse {
  id: string
  start_date: string
  end_date: string
  status: string
  job_posting: JobPostingData
  job_seeker: JobSeekerData
  company_profile: CompanyData
  created_at: string
  updated_at: string
}

export interface IntershipCreatePayload {
  start_date: string
  end_date: string
  job_posting_id: string
  job_seeker_profile_id: string
}

export const internshipService = {
  // Crear internship
  create: (data: IntershipCreatePayload) =>
    axiosInstance.post<IntershipResponse>('/interships', data),

  // Obtener internship por ID
  getById: (id: string) =>
    axiosInstance.get<IntershipResponse>(`/interships/${id}`),

  // Obtener mis internships (job seeker)
  getMyInternships: (limit: number = 10, offset: number = 0) =>
    axiosInstance.get<PaginatedResponse<IntershipResponse>>('/interships/job-seeker', {
      params: { limit, offset },
    }),

  // Obtener internships de la empresa (company)
  getCompanyInternships: (limit: number = 10, offset: number = 0) =>
    axiosInstance.get<PaginatedResponse<IntershipResponse>>('/interships/company', {
      params: { limit, offset },
    }),

  // Obtener overview de internship por ID
  getOverview: (id: string) =>
    axiosInstance.get(`/interships/${id}/overview`),

  // Obtener lista de overview de internships
  getOverviewList: (limit: number = 10, offset: number = 0) =>
    axiosInstance.get('/interships/overview/list', {
      params: { limit, offset },
    }),

  // Obtener lista de overview de internships para coordinador (sin autenticación)
  getOverviewListCoordinator: (limit: number = 10, offset: number = 0) =>
    axiosInstance.get('/interships/overview/list/cor', {
      params: { limit, offset },
    }),
}

