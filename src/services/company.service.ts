import axiosInstance from '@/lib/axios'
import type { CompanyUpdateInput } from '@/schemas/profile.schema'
import type { CompanyResponse, PaginatedResponse } from './types/responses'

export type { CompanyResponse, PaginatedResponse }

export const companyService = {
  getMe: () =>
    axiosInstance.get<CompanyResponse>('/company/me'),

  updateMe: (data: Partial<CompanyUpdateInput>) =>
    axiosInstance.patch<CompanyResponse>('/company/me', data),

  getById: (id: string) =>
    axiosInstance.get<CompanyResponse>(`/company/${id}`),

  getAll: (limit: number = 10, offset: number = 0) =>
    axiosInstance.get<PaginatedResponse<CompanyResponse>>('/company', {
      params: { limit, offset },
    }),
}
