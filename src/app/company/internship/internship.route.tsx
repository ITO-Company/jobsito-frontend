import { Route } from 'react-router'
import { InternshipListCompany } from './components/InternshipListCompany'
import { InternshipDetailCompany } from './components/InternshipDetailCompany'

export const internshipCompanyRoutes = [
  <Route key="internship-list" path="/internships" element={<InternshipListCompany />} />,
  <Route key="internship-detail" path="/internships/:id" element={<InternshipDetailCompany />} />,
]
