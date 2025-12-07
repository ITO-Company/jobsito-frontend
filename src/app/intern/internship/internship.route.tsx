import { Route } from 'react-router'
import { InternshipListSeeker } from './components/InternshipListSeeker'
import { InternshipDetailSeeker } from './components/InternshipDetailSeeker'
import { MilestoneDetailSeeker } from './components/MilestoneDetailSeeker'
import { IssueDetailSeeker } from './components/IssueDetailSeeker'
import { RequestDetailSeeker } from './components/RequestDetailSeeker'

export const internshipSeekerRoutes = [
  <Route key="internship-list" path="/internships" element={<InternshipListSeeker />} />,
  <Route key="internship-detail" path="/internships/detail" element={<InternshipDetailSeeker />} />,
  <Route key="milestone-detail" path="/internships/:internshipId/milestones/:milestoneId" element={<MilestoneDetailSeeker />} />,
  <Route key="issue-detail" path="/internships/:internshipId/milestones/issues/:issueId" element={<IssueDetailSeeker />} />,
  <Route key="request-detail" path="/internships/requests/:requestId" element={<RequestDetailSeeker />} />,
]

