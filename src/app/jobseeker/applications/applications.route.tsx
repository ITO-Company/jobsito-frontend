import { Route, Routes } from 'react-router'
import { ApplicationListSeeker } from './components/ApplicationListSeeker'

export default function ApplicationsSeekerRoute() {
  return (
    <Routes>
      <Route path="/" element={<ApplicationListSeeker />} />
    </Routes>
  )
}
