import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <h1 className="text-3xl font-bold underline">Hello World!</h1>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
