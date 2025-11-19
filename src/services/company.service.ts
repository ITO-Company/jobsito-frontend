import axiosInstance from '@/lib/axios'
import type { CompanyUpdateInput } from '@/schemas/profile.schema'

export interface CompanyResponse {
  id: string
  company_name: string
  email: string
  description: string
  website: string
  phone: string
  address: string
  industry: string
  company_size: string
  logo_url: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  limit: number
  offset: number
  pages: number
}

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
