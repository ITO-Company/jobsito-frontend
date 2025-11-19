import axiosInstance from '@/lib/axios'

export interface GlobalTag {
  id: string
  tag_name: string
  category: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  limit: number
  offset: number
  pages: number
}

export const globalTagsService = {
  getAll: (limit: number = 10, offset: number = 0) =>
    axiosInstance.get<PaginatedResponse<GlobalTag>>('/global-tags', {
      params: { limit, offset },
    }),
}
