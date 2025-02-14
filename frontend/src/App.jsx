import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import RoleRoute from './components/RoleRoute'
import LoginPage from './pages/auth/LoginPage'
import RegistrerPage from './pages/auth/RegistrerPage'
import CreateProjectPage from './pages/CreateProjectPage'
import DashboardProjectPage from './pages/DashboardProjectPage'
import AdminDashboard from './pages/AdminDashboard'
import ManagerDashboard from './pages/ManagerDashboard'
import AnnotatorDashboard from './pages/AnnotatorDashboard'
import AllProjects from './pages/AllProjects'
import HomePage from './pages/HomePage'
import ManageUsers from './pages/ManageUsers'
import ManageAnnotators from './pages/ManageAnnotators'
import TaskManagement from './pages/TaskManagement'
import { useAuth } from './context/AuthContext'

// Composant pour rediriger vers le bon dashboard en fonction du rôle
const DashboardRedirect = () => {
  const { user, isAuthenticated } = useAuth()
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" />
  }

  switch (user.role) {
    case 'admin':
      return <Navigate to="/admin-dashboard" />
    case 'manager':
      return <Navigate to="/manager-dashboard" />
    case 'annotator':
      return <Navigate to="/annotator-dashboard" />
    default:
      return <Navigate to="/login" />
  }
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registrer" element={<RegistrerPage />} />
          <Route path="/" element={<HomePage />} />
          
          {/* Redirection vers le dashboard approprié */}
          <Route path="/dashboard" element={<DashboardRedirect />} />
          
          {/* Routes spécifiques aux rôles */}
          <Route
            path="/admin-dashboard"
            element={
              <RoleRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/manager-dashboard"
            element={
              <RoleRoute allowedRoles={['manager']}>
                <ManagerDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/annotator-dashboard"
            element={
              <RoleRoute allowedRoles={['annotator']}>
                <AnnotatorDashboard />
              </RoleRoute>
            }
          />
          
          {/* Routes protégées communes */}
          <Route
            path="/create"
            element={
              <RoleRoute allowedRoles={['admin', 'manager']}>
                <CreateProjectPage />
              </RoleRoute>
            }
          />
          <Route
            path="/dashboard/:id"
            element={
              <RoleRoute allowedRoles={['admin', 'manager', 'annotator']}>
                <DashboardProjectPage />
              </RoleRoute>
            }
          />
          <Route
            path="/allprojects"
            element={
              <RoleRoute allowedRoles={['admin', 'manager']}>
                <AllProjects />
              </RoleRoute>
            }
          />
          <Route
            path="/users"
            element={
              <RoleRoute allowedRoles={['admin']}>
                <ManageUsers />
              </RoleRoute>
            }
          />
          <Route
            path="/annotators"
            element={
              <RoleRoute allowedRoles={['manager']}>
                <ManageAnnotators />
              </RoleRoute>
            }
          />
          <Route
            path="/projects/:projectId/tasks"
            element={
              <RoleRoute allowedRoles={['admin', 'manager', 'annotator']}>
                <TaskManagement />
              </RoleRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
