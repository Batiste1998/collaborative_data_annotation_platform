const API_URL = 'http://localhost:5000/api'

export const getAllUsers = async () => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/users`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Erreur lors de la récupération des utilisateurs')
  }

  return data
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
