import { Route, Routes } from "react-router"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { CompanyDashboard } from "./components/CompanyDashboard"
import { JobSeekerList } from "./components/JobSeekerList"
import { JobSeekerDetail } from "./components/JobSeekerDetail"
import JobPostingRoute from "./job-posting/job-posting.route"
import ApplicationsCompanyRoute from "./applications/applications.route"
import { internshipCompanyRoutes } from "./internship/internship.route"

export default function CompanyRoute() {
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
            <Route path="/dashboard" element={<CompanyDashboard />} />
            <Route path="/seekers" element={<JobSeekerList />} />
            <Route path="/seekers/:id" element={<JobSeekerDetail />} />
            <Route path="/job-posting/*" element={<JobPostingRoute />} />
            <Route path="/applications/*" element={<ApplicationsCompanyRoute />} />
            {internshipCompanyRoutes}
          </Routes>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
