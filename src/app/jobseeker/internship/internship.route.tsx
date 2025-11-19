import { Route, Routes } from 'react-router'
import { InternshipListSeeker } from './components/InternshipListSeeker'
import { InternshipDetailSeeker } from './components/InternshipDetailSeeker'

export default function InternshipSeekerRoute() {
  return <Routes>
    <Route path="/" element={<InternshipListSeeker />} />
    <Route path="/:id" element={<InternshipDetailSeeker />} />
  </Routes>
}
