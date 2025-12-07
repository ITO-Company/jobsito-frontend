import { Route, Routes } from "react-router";
import Landing from "@/app/landing/Landing";
import AuthRoute from "./auth/auth.route";
import CompanyRoute from "./company/company.route";
import JobSeekerRoute from "./jobseeker/jobseeker.route";
import InternRoute from "./intern/intern.route";

export default function AppRoute() {
  return (
    <div className="h-screen">
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/auth/*" element={<AuthRoute />} />
        <Route path="/company/*" element={<CompanyRoute />} />
        <Route path="/jobseeker/*" element={<JobSeekerRoute />} />
        <Route path="/intern/*" element={<InternRoute />} />
      </Routes>
    </div>
  );
}
