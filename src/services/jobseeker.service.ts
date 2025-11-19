import axiosInstance from '@/lib/axios'
import type { JobSeekerUpdateInput } from '@/schemas/profile.schema'
import type {
  JobSeekerResponse,
  JobSeekerTagResponse,
  GlobalTagResponse,
  PaginatedResponse,
} from './types/responses'

export type { JobSeekerResponse, JobSeekerTagResponse, GlobalTagResponse, PaginatedResponse }

export const jobSeekerService = {
  getMe: () =>
    axiosInstance.get<JobSeekerResponse>('/job-seekers/me'),

  updateMe: (data: Partial<JobSeekerUpdateInput>) =>
    axiosInstance.patch<JobSeekerResponse>('/job-seekers/me', data),

  getById: (id: string) =>
    axiosInstance.get<JobSeekerResponse>(`/job-seekers/${id}`),

  getAll: (limit: number = 10, offset: number = 0) =>
    axiosInstance.get<PaginatedResponse<JobSeekerResponse>>('/job-seekers', {
      params: { limit, offset },
    }),

  // Endpoint para agregar tag - recibe tagId en la URL y proficiency en query
  // Ruta: POST /job-seekers/{tagId}?proficiency=nivel
  addTag: (tagId: string, proficiency: string = '') =>
    axiosInstance.post(`/job-seekers/${tagId}`, null, {
      params: { proficiency },
    }),

  // Endpoint para remover tag - recibe tagId en la URL
  // Ruta: DELETE /job-seekers/{tagId}
  removeTag: (tagId: string) =>
    axiosInstance.delete(`/job-seekers/${tagId}`),
}
