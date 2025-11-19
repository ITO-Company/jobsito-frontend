import { Route, Routes } from 'react-router'
import { ApplicationListCompany } from './components/ApplicationListCompany'
import { ApplicationDetailCompany } from './components/ApplicationDetailCompany'
import { ApplicationAcceptedList } from './components/ApplicationAcceptedList'

export default function ApplicationsCompanyRoute() {
  return (
    <Routes>
      <Route path="/job-posting/:jobPostingId" element={<ApplicationListCompany />} />
      <Route path="/accepted" element={<ApplicationAcceptedList />} />
      <Route path="/:applicationId" element={<ApplicationDetailCompany />} />
    </Routes>
  )
}
