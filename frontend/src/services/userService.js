const API_URL = 'http://localhost:5000/api'

// Fonction utilitaire pour les requêtes authentifiées
const authFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Une erreur est survenue')
  }

  return data
}

export const getAllUsers = async () => {
  return authFetch('/users')
}

// Récupérer les managers (pour les admins)
export const getManagers = async () => {
  return authFetch('/users/managers')
}

// Récupérer les annotateurs (pour les admins et managers)
export const getAnnotators = async () => {
  return authFetch('/users/annotators')
}

export const updateUserRole = async (userId, role) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ role }),
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Erreur lors de la modification du rôle')
  }

  return data
}

export const deleteUser = async (userId) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Erreur lors de la suppression de l\'utilisateur')
  }

  return data
}
