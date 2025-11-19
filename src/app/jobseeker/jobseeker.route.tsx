import { Route, Routes } from "react-router"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { JobSeekerDashboard } from "./components/JobSeekerDashboard"
import { CompanyListForJobSeeker } from "./components/CompanyListForJobSeeker"
import { CompanyDetail } from "./components/CompanyDetail"
import { AssignTags } from "./components/AssignTags"
import JobPostingSeekerRoute from "./job-posting/job-posting.route"
import ApplicationsSeekerRoute from "./applications/applications.route"

export default function JobSeekerRoute() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Routes>
            <Route path="/dashboard" element={<JobSeekerDashboard />} />
            <Route path="/companies" element={<CompanyListForJobSeeker />} />
            <Route path="/companies/:id" element={<CompanyDetail />} />
            <Route path="/tags" element={<AssignTags />} />
            <Route path="/job-posting/*" element={<JobPostingSeekerRoute />} />
            <Route path="/applications/*" element={<ApplicationsSeekerRoute />} />
          </Routes>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
