import axiosInstance from '@/lib/axios'
import type { JobPostingResponse, PaginatedResponse, GlobalTagResponse } from './types/responses'

export type { JobPostingResponse, PaginatedResponse, GlobalTagResponse }

// Tipos de entrada (desde formulario - strings)
export interface JobPostingCreateInput {
  title: string
  description: string
  requirement: string
  salary_min: string
  salary_max: string
  work_type: string
  experience_level: string
  location: string
  is_remote: string // 'true' | 'false'
  is_hibrid: string // 'true' | 'false'
  contract_type: string
  benefit: string
  status: string
  expires_at: string // ISO date string
}

export interface JobPostingUpdateInput extends Partial<JobPostingCreateInput> {}

// Convertir datos del formulario a tipos esperados por el backend
const convertFormDataToPayload = (data: JobPostingCreateInput | JobPostingUpdateInput): any => {
  const converted: any = { ...data }
  
  if (converted.is_remote !== undefined) {
    converted.is_remote = converted.is_remote === 'true'
  }
  if (converted.is_hibrid !== undefined) {
    converted.is_hibrid = converted.is_hibrid === 'true'
  }
  
  // Asegurar que expires_at esté en formato ISO 8601
  if (converted.expires_at) {
    const date = new Date(converted.expires_at)
    converted.expires_at = date.toISOString()
  }
  
  return converted
}

export const jobPostingService = {
  // Crear nueva oferta de trabajo
  create: (data: JobPostingCreateInput) =>
    axiosInstance.post<JobPostingResponse>('/job-postings', convertFormDataToPayload(data)),

  // Actualizar oferta de trabajo
  update: (id: string, data: JobPostingUpdateInput) =>
    axiosInstance.patch<JobPostingResponse>(`/job-postings/${id}`, convertFormDataToPayload(data)),

  // Obtener todas las ofertas (con filtros opcionales)
  getAll: (limit: number = 10, offset: number = 0, tagIds?: string[], companyId?: string) => {
    const params: any = { limit, offset }
    if (tagIds && tagIds.length > 0) {
      params.tag_ids = tagIds.join(',')
    }
    if (companyId) {
      params.company_id = companyId
    }
    return axiosInstance.get<PaginatedResponse<JobPostingResponse>>('/job-postings', { params })
  },

  // Obtener oferta por ID
  getById: (id: string) =>
    axiosInstance.get<JobPostingResponse>(`/job-postings/${id}`),

  // Eliminar oferta (soft delete)
  delete: (id: string) =>
    axiosInstance.delete(`/job-postings/${id}`),

  // Agregar tag a oferta
  addTag: (jobPostingId: string, tagId: string) =>
    axiosInstance.post(`/job-postings/${jobPostingId}/tags/${tagId}`, null),

  // Remover tag de oferta
  removeTag: (jobPostingId: string, tagId: string) =>
    axiosInstance.delete(`/job-postings/${jobPostingId}/tags/${tagId}`),

  // Descargar PDF con lista de todas las ofertas
  downloadJobPostingListPDF: () =>
    axiosInstance.get('/job-postings/report/list', {
      responseType: 'blob',
    }),

  // Descargar PDF de una oferta individual
  downloadJobPostingDetailPDF: (id: string) =>
    axiosInstance.get(`/job-postings/${id}/report`, {
      responseType: 'blob',
    }),
}
