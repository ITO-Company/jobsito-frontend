import axiosInstance from '@/lib/axios'
import type { SignupInput, SigninInput } from '@/schemas/auth.schema'

export interface AuthResponse {
  token: string
}

export type UserRole = 'job_seeker' | 'company'

export const authService = {
  // Job Seeker
  jobSeekerSignup: (data: SignupInput) =>
    axiosInstance.post<AuthResponse>('/job-seekers/signup', {
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password,
      name: data.name,
    }),

  jobSeekerSignin: (data: SigninInput) =>
    axiosInstance.post<AuthResponse>('/job-seekers/signin', {
      email: data.email,
      password: data.password,
    }),

  // Company
  companySignup: (data: SignupInput) =>
    axiosInstance.post<AuthResponse>('/company/signup', {
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password,
      name: data.name,
    }),

  companySignin: (data: SigninInput) =>
    axiosInstance.post<AuthResponse>('/company/signin', {
      email: data.email,
      password: data.password,
    }),
}
