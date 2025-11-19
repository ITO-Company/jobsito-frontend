import axiosInstance from '@/lib/axios'
import type { PaginatedResponse } from './types/responses'

export interface MilestoneResponse {
  id: string
  title: string
  description: string
  status: string
  due_date: string
  intership_id: string
  created_at: string
  updated_at: string
}

export interface MilestoneCreatePayload {
  title: string
  description: string
  due_date: string
  intership_id: string
}

export interface MilestoneUpdatePayload {
  title?: string
  description?: string
  status?: string
  due_date?: string
}

export const milestoneService = {
  // Crear milestone
  create: (data: MilestoneCreatePayload) =>
    axiosInstance.post<MilestoneResponse>('/milestones', data),

  // Obtener milestone por ID
  getById: (id: string) =>
    axiosInstance.get<MilestoneResponse>(`/milestones/${id}`),

  // Obtener milestones por internship
  getByInternshipId: (internshipId: string, limit: number = 10, offset: number = 0) =>
    axiosInstance.get<PaginatedResponse<MilestoneResponse>>(`/milestones/intern/${internshipId}`, {
      params: { limit, offset },
    }),

  // Actualizar milestone
  update: (id: string, data: MilestoneUpdatePayload) =>
    axiosInstance.patch<MilestoneResponse>(`/milestones/${id}`, data),
}
