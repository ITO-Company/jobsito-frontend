import axiosInstance from '@/lib/axios'
import type { ApplicationResponse, PaginatedResponse } from './types/responses'

export type { ApplicationResponse }

export interface ApplicationCreatePayload {
  job_posting_id: string
  cover_letter: string
  proposed_salary: string
}

export interface ApplicationUpdatePayload {
  is_accepted?: boolean
}

export const applicationService = {
  // Crear aplicación (postular a oferta)
  create: (data: ApplicationCreatePayload) =>
    axiosInstance.post<ApplicationResponse>('/applications', data),

  // Obtener aplicación por ID
  getById: (id: string) =>
    axiosInstance.get<ApplicationResponse>(`/applications/${id}`),

  // Obtener mis aplicaciones (job seeker)
  getMyApplications: (limit: number = 10, offset: number = 0) =>
    axiosInstance.get<PaginatedResponse<ApplicationResponse>>('/applications/job-seeker', {
      params: { limit, offset },
    }),

  // Obtener aplicaciones por oferta (company)
  getApplicationsByJobPosting: (jobPostingId: string, limit: number = 10, offset: number = 0) =>
    axiosInstance.get<PaginatedResponse<ApplicationResponse>>(
      `/applications/job-posting/${jobPostingId}`,
      {
        params: { limit, offset },
      }
    ),

  // Obtener aplicaciones aceptadas (company)
  getAcceptedApplications: (limit: number = 10, offset: number = 0) =>
    axiosInstance.get<PaginatedResponse<ApplicationResponse>>('/applications/accepted', {
      params: { limit, offset },
    }),

  // Actualizar aplicación (aceptar/rechazar)
  update: (id: string, data: ApplicationUpdatePayload) =>
    axiosInstance.patch<ApplicationResponse>(`/applications/${id}`, data),
}
