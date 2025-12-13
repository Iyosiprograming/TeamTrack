import { Dashbaord } from "./pages/owner/Dashbaord"
import { Loginowner } from "./pages/owner/Loginowner"
import { Routes, Route } from "react-router-dom"
import { Notfound } from "./pages/Notfound"
function App() {

  return (
    <>
      <Routes>
        <Route path="/owner/login" element={<Loginowner />} />
        <Route path="/owner/dashboard" element={<Dashbaord />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  )
}

export default App
