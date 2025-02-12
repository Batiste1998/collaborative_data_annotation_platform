const API_URL = 'http://localhost:5000/api'

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.message || 'Erreur lors de la connexion')
  }

  // Stocker le token dans le localStorage
  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify(data.user))
  
  // Retourner l'URL de redirection en fonction du rôle
  const redirectUrl = getRedirectUrlByRole(data.user.role)
  return { ...data, redirectUrl }
}

export const register = async (username, email, password) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  })

  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.message || 'Erreur lors de l\'inscription')
  }
  
  return data
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export const getCurrentUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const isAuthenticated = () => {
  return !!getToken()
}

export const getRedirectUrlByRole = (role) => {
  switch (role) {
    case 'admin':
      return '/admin-dashboard'
    case 'manager':
      return '/manager-dashboard'
    case 'annotator':
      return '/annotator-dashboard'
    default:
      return '/login'
  }
}
