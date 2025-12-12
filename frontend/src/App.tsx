import { Dashbaord } from "./pages/owner/Dashbaord"
import { Loginowner } from "./pages/owner/Loginowner"
import { Routes, Route } from "react-router-dom"
function App() {

  return (
    <>
      <Routes>
        <Route path="/owner/login" element={<Loginowner />} />
        <Route path="/owner/dashboard" element={<Dashbaord />} />
      </Routes>
    </>
  )
}

export default App
