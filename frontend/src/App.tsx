import { Dashbaord } from "./pages/owner/Dashbaord"
import { Loginowner } from "./pages/owner/Loginowner"
import { Routes, Route } from "react-router-dom"
import { Notfound } from "./pages/Notfound"
import { Loginemploye } from "./pages/employe/Loginemploye"
function App() {

  return (
    <>
      <Routes>
        <Route path="/owner/login" element={<Loginowner />} />
        <Route path="/owner/dashboard" element={<Dashbaord />} />
        <Route path="/employe/login" element={<Loginemploye />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  )
}

export default App
