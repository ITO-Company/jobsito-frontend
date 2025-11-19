import axiosInstance from '@/lib/axios'
import type { PaginatedResponse } from './types/responses'

export interface IssueResponse {
  id: string
  title: string
  description: string
  status: string
  due_date: string
  milestone_id: string
  created_at: string
  updated_at: string
}

export interface IssueCreatePayload {
  title: string
  description: string
  due_date: string
  milestone_id: string
}

export interface IssueUpdatePayload {
  title?: string
  description?: string
  due_date?: string
  status?: string
}

export const issueService = {
  // Crear issue
  create: (data: IssueCreatePayload) =>
    axiosInstance.post<IssueResponse>('/issues', data),

  // Obtener issue por ID
  getById: (id: string) =>
    axiosInstance.get<IssueResponse>(`/issues/${id}`),

  // Obtener issues por milestone
  getByMilestoneId: (milestoneId: string, limit: number = 10, offset: number = 0) =>
    axiosInstance.get<PaginatedResponse<IssueResponse>>(`/issues/milestone/${milestoneId}`, {
      params: { limit, offset },
    }),

  // Actualizar issue
  update: (id: string, data: IssueUpdatePayload) =>
    axiosInstance.patch<IssueResponse>(`/issues/${id}`, data),
}
