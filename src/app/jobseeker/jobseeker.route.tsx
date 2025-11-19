import { Route, Routes } from "react-router"
import { JobSeekerDashboard } from "./components/JobSeekerDashboard"
import { CompanyListForJobSeeker } from "./components/CompanyListForJobSeeker"
import { CompanyDetail } from "./components/CompanyDetail"
import { AssignTags } from "./components/AssignTags"


export default function JobSeekerRoute() {
  return (
    <Routes>
      <Route path="/dashboard" element={<JobSeekerDashboard />} />
      <Route path="/companies" element={<CompanyListForJobSeeker />} />
      <Route path="/companies/:id" element={<CompanyDetail />} />
      <Route path="/tags" element={<AssignTags />} />
    </Routes>
  )
}
