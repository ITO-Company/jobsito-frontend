import axiosInstance from '@/lib/axios'
import type { SavedJobResponse, PaginatedResponse } from './types/responses'

export const savedJobService = {
  // Crear saved job
  create: (jobPostingId: string) =>
    axiosInstance.post<SavedJobResponse>('/saved-jobs', {
      job_posting_id: jobPostingId,
    }),

  // Obtener mis saved jobs
  getMySavedJobs: (limit: number = 10, offset: number = 0) =>
    axiosInstance.get<PaginatedResponse<SavedJobResponse>>('/saved-jobs', {
      params: { limit, offset },
    }),

  // Eliminar saved job
  delete: (id: string) =>
    axiosInstance.delete(`/saved-jobs/${id}`),
}
