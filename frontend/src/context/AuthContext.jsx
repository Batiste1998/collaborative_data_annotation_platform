import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getCurrentUser, isAuthenticated as checkAuthStatus } from '../services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier l'authentification au chargement
    if (checkAuthStatus()) {
      setUser(getCurrentUser())
    }
    setLoading(false)
  }, [])

  const isAuthenticated = () => !!user
  const isAdmin = () => user?.role === 'admin'
  const isManager = () => user?.role === 'manager'
  const isAnnotator = () => user?.role === 'annotator'

  const value = {
    user,
    setUser,
    loading,
    isAuthenticated,
    isAdmin,
    isManager,
    isAnnotator,
  }

  if (loading) {
    return <div>Chargement...</div>
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider")
  }
  return context
}
