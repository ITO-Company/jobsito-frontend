import { Route, Routes } from "react-router"
import AuthRoute from "./auth/auth.route"
import CompanyRoute from "./company/company.route"
import JobSeekerRoute from "./jobseeker/jobseeker.route"

export default function AppRoute() {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/*" element={<AuthRoute />} />
        <Route path="/company/*" element={<CompanyRoute />} />
        <Route path="/jobseeker/*" element={<JobSeekerRoute />} />
      </Routes>
    </div>
  )
}