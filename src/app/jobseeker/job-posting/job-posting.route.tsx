import { Route, Routes } from "react-router"
import { JobPostingListSeeker } from "./components/JobPostingListSeeker"
import { JobPostingDetailSeeker } from "./components/JobPostingDetailSeeker"


export default function JobPostingSeekerRoute() {
  return (
    <Routes>
      <Route path="/" element={<JobPostingListSeeker />} />
      <Route path="/:id" element={<JobPostingDetailSeeker />} />
    </Routes>
  )
}
