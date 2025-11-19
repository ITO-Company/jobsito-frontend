import { Routes, Route } from 'react-router'
import { SavedJobList } from './components/SavedJobList'

export function SavedJobsRoute() {
  return (
    <Routes>
      <Route path="/" element={<SavedJobList />} />
    </Routes>
  )
}
