import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import RegistrerPage from './pages/auth/RegistrerPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registrer" element={<RegistrerPage />} />
        <Route
          path="/"
          element={
            <h1 className="text-3xl font-bold underline text-red-500">Hello World!</h1>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
