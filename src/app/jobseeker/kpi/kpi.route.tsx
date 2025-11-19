import { Route } from 'react-router'
import { KPIDashboardSeeker } from './KPIDashboardSeeker'

export const kpiSeekerRoutes = [
  <Route key="kpi-dashboard-seeker" path="/internships/:internshipId/kpis" element={<KPIDashboardSeeker />} />,
]
