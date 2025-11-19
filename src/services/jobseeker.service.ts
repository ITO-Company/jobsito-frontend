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

  addTag: (tagId: string, proficiency: string = '') =>
    axiosInstance.post<JobSeekerResponse>(`/job-seekers/tags/${tagId}`, null, {
      params: { proficiency },
    }),

  removeTag: (tagId: string) =>
    axiosInstance.delete<JobSeekerResponse>(`/job-seekers/tags/${tagId}`),
}
