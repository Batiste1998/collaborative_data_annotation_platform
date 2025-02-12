import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import LoginPage from './pages/auth/LoginPage'
import RegistrerPage from './pages/auth/RegistrerPage'
import CreateProjectPage from './pages/CreateProjectPage'
import DashboardProjectPage from './pages/DashboardProjectPage'
import AllProjects from './pages/AllProjects'
import HomePage from './pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registrer" element={<RegistrerPage />} />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateProjectPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardProjectPage
                  name="Cat's Data"
                  description="Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page."
                  members={[
                    'Isabelle',
                    'Nicolas',
                    'Clément',
                    'Virginie',
                    'Batiste',
                    'Julie',
                  ]}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/allprojects"
            element={
              <PrivateRoute>
                <AllProjects />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
