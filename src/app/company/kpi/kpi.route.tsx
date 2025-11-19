import { Route } from 'react-router'
import { KPIDashboardCompany } from './KPIDashboardCompany'

export const kpiCompanyRoutes = [
  <Route key="kpi-dashboard" path="/kpis" element={<KPIDashboardCompany />} />,
]
