import axios from '@/lib/axios'

// Milestone KPI
export interface MilestoneKPI {
  company_id: string
  total_milestones: number
  completed_milestones: number
  pending_milestones: number
  active_milestones: number
  overdue_milestones: number
  completion_rate: number
  average_completion_time_days: number
  overdue_percentage: number
}

// Issue KPI
export interface IssueKPI {
  context_id: string
  total_issues: number
  resolved_issues: number
  pending_issues: number
  active_issues: number
  overdue_issues: number
  issues_with_requests: number
  resolution_rate: number
  average_resolution_time_days: number
  overdue_percentage: number
}

// Request KPI
export interface RequestKPI {
  context_id: string
  total_requests: number
  approved_requests: number
  rejected_requests: number
  pending_requests: number
  issues_with_pending_requests: number
  approval_rate: number
  rejection_rate: number
  average_review_time_days: number
  pending_percentage: number
}

class KPIService {
  // Company KPIs (Protected)
  async getCompanyMilestoneKPI() {
    return axios.get<MilestoneKPI>('/kpis/milestones/company')
  }

  async getCompanyIssueKPI() {
    return axios.get<IssueKPI>('/kpis/issues/company')
  }

  async getCompanyRequestKPI() {
    return axios.get<RequestKPI>('/kpis/requests/company')
  }

  // Intership KPIs (Unprotected - for jobseeker)
  async getIntershipMilestoneKPI(intershipId: string) {
    return axios.get<MilestoneKPI>(`/kpis/milestones/intership/${intershipId}`)
  }

  async getIntershipIssueKPI(intershipId: string) {
    return axios.get<IssueKPI>(`/kpis/issues/intership/${intershipId}`)
  }

  async getIntershipRequestKPI(intershipId: string) {
    return axios.get<RequestKPI>(`/kpis/requests/intership/${intershipId}`)
  }
}

export const kpiService = new KPIService()
