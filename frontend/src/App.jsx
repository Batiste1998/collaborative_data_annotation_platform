import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import RegistrerPage from './pages/auth/RegistrerPage'
import CreateProjectPage from './pages/CreateProjectPage'
import DashboardProjectPage from './pages/DashboardProjectPage'
import AllProjects from './pages/AllProjects'
import HomePage from './pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registrer" element={<RegistrerPage />} />
        <Route path="/create" element={<CreateProjectPage />} />
        <Route path="/dashboard" element={<DashboardProjectPage name="Cat's Data" description="Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page." members={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]} />} />
        <Route path="/allprojects" element={<AllProjects />} />
        <Route
          path="/"
          element={
            <HomePage />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
