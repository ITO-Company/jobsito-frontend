import { z } from 'zod'

export const companyUpdateSchema = z.object({
  company_name: z.string().optional(),
  description: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  industry: z.string().optional(),
  company_size: z.string().optional(),
  logo_url: z.string().optional(),
})

export type CompanyUpdateInput = z.infer<typeof companyUpdateSchema>

export const jobSeekerUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  bio: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  cv_url: z.string().optional(),
  portfolio_url: z.string().optional(),
  expected_salary_min: z.string().optional(),
  expected_salary_max: z.string().optional(),
  availability: z.string().optional(),
  skills: z.string().optional(),
  experience: z.string().optional(),
})

export type JobSeekerUpdateInput = z.infer<typeof jobSeekerUpdateSchema>
