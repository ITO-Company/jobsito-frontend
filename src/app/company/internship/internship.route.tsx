import { Route } from 'react-router'
import { InternshipListCompany } from './components/InternshipListCompany'
import { InternshipDetailCompany } from './components/InternshipDetailCompany'
import { MilestoneDetailCompany } from './components/MilestoneDetailCompany'
import { IssueDetailCompany } from './components/IssueDetailCompany'

export const internshipCompanyRoutes = [
  <Route key="internship-list" path="/internships" element={<InternshipListCompany />} />,
  <Route key="internship-detail" path="/internships/:id" element={<InternshipDetailCompany />} />,
  <Route key="milestone-detail" path="/internships/:internshipId/milestones/:milestoneId" element={<MilestoneDetailCompany />} />,
  <Route key="issue-detail" path="/internships/:internshipId/milestones/issues/:issueId" element={<IssueDetailCompany />} />,
]
