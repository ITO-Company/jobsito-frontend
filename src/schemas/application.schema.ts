import { z } from 'zod'

export const applicationCreateSchema = z.object({
  job_posting_id: z.string().min(1, 'La oferta es requerida'),
  cover_letter: z.string().min(10, 'La carta debe tener al menos 10 caracteres'),
  proposed_salary: z.string().min(1, 'El salario propuesto es requerido'),
})

export const applicationUpdateSchema = z.object({
  is_accepted: z.boolean().optional(),
})

export type ApplicationCreateInput = z.infer<typeof applicationCreateSchema>
export type ApplicationUpdateInput = z.infer<typeof applicationUpdateSchema>
