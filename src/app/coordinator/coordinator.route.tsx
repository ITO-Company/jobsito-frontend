import { Route, Routes } from 'react-router'
import { CoordinatorLogin } from './components/CoordinatorLogin'
import { CoordinatorOverview } from './components/CoordinatorOverview'

export default function CoordinatorRoute() {
  return (
    <Routes>
      <Route path="/login" element={<CoordinatorLogin />} />
      <Route path="/overview" element={<CoordinatorOverview />} />
      <Route path="*" element={<CoordinatorLogin />} />
    </Routes>
  )
}
