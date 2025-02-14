const API_URL = 'http://localhost:5000/api'

// Fonction utilitaire pour les requêtes authentifiées
const authFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token')
  
  if (!token) {
    throw new Error('Non authentifié')
  }

  try {
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
      // Si le token est invalide ou expiré
      if (response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        throw new Error('Session expirée, veuillez vous reconnecter')
      }
      throw new Error(data.message || 'Une erreur est survenue')
    }

    return data
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Impossible de contacter le serveur')
    }
    throw error
  }
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
  return authFetch(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify({ role }),
  })
}

export const deleteUser = async (userId) => {
  return authFetch(`/users/${userId}`, {
    method: 'DELETE',
  })
}
