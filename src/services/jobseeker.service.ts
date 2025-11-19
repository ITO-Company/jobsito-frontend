import axiosInstance from '@/lib/axios'
import type { JobSeekerUpdateInput } from '@/schemas/profile.schema'

export interface JobSeekerResponse {
  id: string
  name: string
  email: string
  bio: string
  phone: string
  location: string
  cv_url: string
  portfolio_url: string
  expected_salary_min: string
  expected_salary_max: string
  availability: string
  skills: string
  experience: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  limit: number
  offset: number
  pages: number
}

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
    axiosInstance.post(`/job-seekers/${tagId}`, null, {
      params: { proficiency },
    }),

  removeTag: (tagId: string) =>
    axiosInstance.delete(`/job-seekers/${tagId}`),
}
