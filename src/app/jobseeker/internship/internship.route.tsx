import { Route, Routes } from 'react-router'
import { InternshipListSeeker } from './components/InternshipListSeeker'
import { InternshipDetailSeeker } from './components/InternshipDetailSeeker'
import { MilestoneDetailSeeker } from './components/MilestoneDetailSeeker'
import { IssueDetailSeeker } from './components/IssueDetailSeeker'
import { RequestDetailSeeker } from './components/RequestDetailSeeker'

export default function InternshipSeekerRoute() {
  return <Routes>
    <Route path="/" element={<InternshipListSeeker />} />
    <Route path="/:id" element={<InternshipDetailSeeker />} />
    <Route path="/:internshipId/milestones/:milestoneId" element={<MilestoneDetailSeeker />} />
    <Route path="/:internshipId/milestones/issues/:issueId" element={<IssueDetailSeeker />} />
    <Route path="/requests/:requestId" element={<RequestDetailSeeker />} />
  </Routes>
}
