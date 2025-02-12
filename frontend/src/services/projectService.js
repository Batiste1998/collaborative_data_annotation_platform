const API_URL = 'http://localhost:5000/api'

// Fonction utilitaire pour les requêtes authentifiées
const authFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
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

export const getAllProjects = async () => {
  return authFetch('/projects')
}

export const getProject = async (id) => {
  return authFetch(`/projects/${id}`)
}

export const createProject = async (projectData) => {
  return authFetch('/projects', {
    method: 'POST',
    body: JSON.stringify(projectData),
  })
}

export const updateProject = async (id, updates) => {
  return authFetch(`/projects/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  })
}

export const deleteProject = async (id) => {
  return authFetch(`/projects/${id}`, {
    method: 'DELETE',
  })
}

export const addCollaborator = async (projectId, userId, role) => {
  return authFetch(`/projects/${projectId}/collaborators`, {
    method: 'POST',
    body: JSON.stringify({ userId, role }),
  })
}

export const removeCollaborator = async (projectId, userId) => {
  return authFetch(`/projects/${projectId}/collaborators/${userId}`, {
    method: 'DELETE',
  })
}
