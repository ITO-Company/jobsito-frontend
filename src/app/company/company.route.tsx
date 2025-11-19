import { Route, Routes } from "react-router"
import { CompanyDashboard } from "./components/CompanyDashboard"
import { JobSeekerList } from "./components/JobSeekerList"
import { JobSeekerDetail } from "./components/JobSeekerDetail"

export default function CompanyRoute() {
  return (
    <Routes>
      <Route path="/dashboard" element={<CompanyDashboard />} />
      <Route path="/seekers" element={<JobSeekerList />} />
      <Route path="/seekers/:id" element={<JobSeekerDetail />} />
    </Routes>
  )
}
