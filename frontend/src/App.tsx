import { Routes, Route } from "react-router-dom";
import { Dashbaord } from "./pages/owner/Dashbaord";
import { Loginowner } from "./pages/owner/Loginowner";
import { Loginemploye } from "./pages/employe/Loginemploye";
import { Dashboard } from "./pages/employe/Dashboard";
import { Notfound } from "./pages/Notfound";
import ProtectedRoute from "./services/ProtecedRoutes";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/owner/login" element={<Loginowner />} />
      <Route path="/employe/login" element={<Loginemploye />} />

      {/* Protected routes */}
      <Route
        path="/owner/dashboard"
        element={
          <ProtectedRoute role="owner">
            <Dashbaord />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employe/dashboard"
        element={
          <ProtectedRoute role="employe">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback for undefined routes */}
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
