import { z } from 'zod'

export const jobPostingCreateSchema = z.object({
  title: z.string().min(1, 'El título es requerido').min(3, 'Mínimo 3 caracteres'),
  description: z.string().min(1, 'La descripción es requerida').min(10, 'Mínimo 10 caracteres'),
  requirement: z.string().min(1, 'Los requisitos son requeridos'),
  salary_min: z.string().min(1, 'El salario mínimo es requerido'),
  salary_max: z.string().min(1, 'El salario máximo es requerido'),
  work_type: z.string().min(1, 'El tipo de trabajo es requerido'),
  experience_level: z.string().min(1, 'El nivel de experiencia es requerido'),
  location: z.string().min(1, 'La ubicación es requerida'),
  is_remote: z.string().min(1, '¿Es remoto es requerido'),
  is_hibrid: z.string().min(1, '¿Es híbrido es requerido'),
  contract_type: z.string().min(1, 'El tipo de contrato es requerido'),
  benefit: z.string().min(1, 'Los beneficios son requeridos'),
  status: z.string().min(1, 'El estado es requerido'),
  expires_at: z.string().min(1, 'La fecha de vencimiento es requerida'),
})

export type JobPostingCreateInput = z.infer<typeof jobPostingCreateSchema>
