import axiosInstance from '@/lib/axios'
import type { PaginatedResponse } from './types/responses'

export interface RequestResponse {
  id: string
  title: string
  description: string
  status: string
  company_comment: string
  issue_id: string
  created_at: string
  updated_at: string
}

export interface RequestCreatePayload {
  title: string
  description: string
  issue_id: string
}

export interface RequestUpdatePayload {
  title?: string
  description?: string
}

export interface RequestReviewPayload {
  status: string
  company_comment: string
}

export const requestService = {
  // Crear request
  create: (data: RequestCreatePayload) =>
    axiosInstance.post<RequestResponse>('/requests', data),

  // Obtener request por ID
  getById: (id: string) =>
    axiosInstance.get<RequestResponse>(`/requests/${id}`),

  // Obtener requests por issue
  getByIssueId: (issueId: string, limit: number = 10, offset: number = 0) =>
    axiosInstance.get<PaginatedResponse<RequestResponse>>(`/requests/issue/${issueId}`, {
      params: { limit, offset },
    }),

  // Actualizar request
  update: (id: string, data: RequestUpdatePayload) =>
    axiosInstance.patch<RequestResponse>(`/requests/${id}`, data),

  // Review request (company)
  review: (id: string, data: RequestReviewPayload) =>
    axiosInstance.patch<RequestResponse>(`/requests/${id}/review`, data),
}
