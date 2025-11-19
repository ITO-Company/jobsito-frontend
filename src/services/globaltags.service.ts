import axiosInstance from '@/lib/axios'
import type { GlobalTagResponse, PaginatedResponse } from './types/responses'

export type { GlobalTagResponse as GlobalTag, PaginatedResponse }

export const globalTagsService = {
  getAll: (limit: number = 10, offset: number = 0) =>
    axiosInstance.get<PaginatedResponse<GlobalTagResponse>>('/global-tags', {
      params: { limit, offset },
    }),
}
