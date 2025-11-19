// Global Tag Types
export interface GlobalTagResponse {
  id: string
  name: string
  category: string
  color: string
  is_approved: string
  usage_count: string
}

export interface GlobalTag extends GlobalTagResponse {}

// Job Seeker Tag Types
export interface JobSeekerTagResponse {
  id: string
  proficiency_level: string
  global_tag: GlobalTagResponse
}

// Job Seeker Profile Types
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
  is_active: boolean
  tags?: JobSeekerTagResponse[]
}

// Company Types
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
  is_verified: boolean
  job_postings?: JobPostingResponse[]
}

// Job Posting Types
export interface JobPostingResponse {
  id: string
  title: string
  description: string
  requirements: string
  salary_min: string
  salary_max: string
  location: string
  job_type: string
  posted_at: string
}

// Application Types
export interface ApplicationResponse {
  id: string
  cover_letter: string
  status: string
  application_notes: string
  proposed_salary: string
  status_changed_at: string
  job_seeker_id: string
  job_posting_id: string
  is_accepted: boolean
  job_seeker: JobSeekerResponse
  created_at: string
  updated_at: string
}

// Intership Types
export interface IntershipResponseDto {
  id: string
  start_date: string
  end_date: string
  status: string
  company_profile: CompanyResponse
  created_at: string
  updated_at: string
}

// Issue Types
export interface IssueResponseDto {
  id: string
  title: string
  description: string
  due_date: string
  status: string
  followup_milestone_id: string
  created_at: string
  updated_at: string
}

// Milestone Types
export interface MilestoneResponseDto {
  id: string
  title: string
  description: string
  due_date: string
  status: string
  created_at: string
  updated_at: string
}

// Request Types
export interface RequestResponseDto {
  id: string
  title: string
  description: string
  status: string
  company_comment: string
  followup_issue_id: string
  created_at: string
  updated_at: string
}

// Saved Job Types
export interface SavedJobResponse {
  id: string
  job_posting: JobPostingResponse
  created_at: string
  updated_at: string
}

// Auth Types
export interface SignupDto {
  email: string
  password: string
  confirm_password: string
  name: string
}

export interface SigninDto {
  email: string
  password: string
}

// Auth Response Types
export interface AuthResponse {
  user: JobSeekerResponse | CompanyResponse
  token: string
}

// Paginated Response Types
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  limit: number
  offset: number
  pages: number
}
