import { Loginowner } from "./pages/owner/Loginowner"
import { Routes, Route } from "react-router-dom"
function App() {

  return (
    <>
      <Routes>
        <Route path="/owner/login" element={<Loginowner />} />
      </Routes>
    </>
  )
}

export default App
