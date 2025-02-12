const API_URL = 'http://localhost:5000/api'

// Types d'erreurs spécifiques
class ProjectServiceError extends Error {
  constructor(message, type) {
    super(message)
    this.name = 'ProjectServiceError'
    this.type = type
  }
}

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

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    })

    const data = await response.json()

    if (!response.ok) {
      // Gestion des erreurs spécifiques
      switch (response.status) {
        case 400:
          throw new ProjectServiceError(data.error || 'Données invalides', 'VALIDATION_ERROR')
        case 401:
          throw new ProjectServiceError('Non autorisé', 'AUTH_ERROR')
        case 403:
          throw new ProjectServiceError('Accès refusé', 'PERMISSION_ERROR')
        case 404:
          throw new ProjectServiceError('Ressource non trouvée', 'NOT_FOUND')
        default:
          throw new ProjectServiceError(data.error || 'Une erreur est survenue', 'SERVER_ERROR')
      }
    }

    return data
  } catch (error) {
    if (error instanceof ProjectServiceError) {
      throw error
    }
    throw new ProjectServiceError('Erreur de connexion au serveur', 'NETWORK_ERROR')
  }
}

// Gestion des projets
export const getAllProjects = async () => {
  return authFetch('/projects')
}

export const getProject = async (id) => {
  return authFetch(`/projects/${id}`)
}

export const createProject = async (projectData) => {
  // Seuls les champs autorisés
  const { name, description, type, labels } = projectData
  return authFetch('/projects', {
    method: 'POST',
    body: JSON.stringify({ name, description, type, labels }),
  })
}

export const updateProject = async (id, updates) => {
  // Seuls les champs autorisés
  const allowedUpdates = ['name', 'description', 'type', 'labels']
  const filteredUpdates = Object.keys(updates)
    .filter(key => allowedUpdates.includes(key))
    .reduce((obj, key) => {
      obj[key] = updates[key]
      return obj
    }, {})

  return authFetch(`/projects/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(filteredUpdates),
  })
}

export const deleteProject = async (id) => {
  return authFetch(`/projects/${id}`, {
    method: 'DELETE',
  })
}

// Gestion des collaborateurs
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

// Note: Ces fonctions ne sont pas encore implémentées dans le backend
// Elles retourneront des erreurs 404 jusqu'à ce que les routes soient créées

export const uploadDatasetFile = async (projectId, file) => {
  const formData = new FormData()
  formData.append('file', file)

  return authFetch(`/projects/${projectId}/dataset`, {
    method: 'POST',
    headers: {}, // Laisser vide pour que le navigateur définisse le bon Content-Type avec FormData
    body: formData,
  })
}

export const updateDatasetItemStatus = async (projectId, itemId, status) => {
  return authFetch(`/projects/${projectId}/dataset/${itemId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
}

export const assignDatasetItem = async (projectId, itemId, userId) => {
  return authFetch(`/projects/${projectId}/dataset/${itemId}/assign`, {
    method: 'PATCH',
    body: JSON.stringify({ userId }),
  })
}

export const exportProjectData = async (projectId, format = 'json') => {
  return authFetch(`/projects/${projectId}/export?format=${format}`)
}

export { ProjectServiceError }
