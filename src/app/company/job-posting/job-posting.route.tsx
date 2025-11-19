import { Route, Routes } from "react-router"
import { JobPostingList } from "./components/JobPostingList"
import { AssignTagsJobPosting } from "./components/AssignTagsJobPosting"
import { JobPostingCreateEdit } from "./components/JobPostingCreateEdit"
import { JobPostingDetail } from "./components/JobPostingDetail"

export default function JobPostingRoute() {
  return (
    <Routes>
      <Route path="/" element={<JobPostingList />} />
      <Route path="/create" element={<JobPostingCreateEdit />} />
      <Route path="/:id/edit" element={<JobPostingCreateEdit />} />
      <Route path="/:id" element={<JobPostingDetail />} />
      <Route path="/:id/tags" element={<AssignTagsJobPosting />} />
    </Routes>
  )
}
