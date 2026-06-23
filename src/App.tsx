import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import WorkPage from './pages/WorkPage'
import ProjectDetail from './pages/ProjectDetail'

/** Scrolls to the top on every route change. */
function ScrollManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<WorkPage />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<WorkPage />} />
      </Routes>
    </>
  )
}
