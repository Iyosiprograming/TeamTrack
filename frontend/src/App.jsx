import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './services/ProtectedRoute'
import { LoginOwner } from './pages/owner/LoginOwner'
function App() {

  return (
    <>
      <Routes>
        <Route path="/owner/login" element={<LoginOwner />} />
        <ProtectedRoute>
          <Route path="/owner/dashboard" element={<DashboardOwner />} />
        </ProtectedRoute>
      </Routes>

    </>
  )
}

export default App
