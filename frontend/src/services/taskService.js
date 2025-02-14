const API_URL = 'http://localhost:5000/api'

// Types d'erreurs spécifiques
class TaskServiceError extends Error {
  constructor(message, type) {
    super(message)
    this.name = 'TaskServiceError'
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
      switch (response.status) {
        case 400:
          throw new TaskServiceError(data.error || 'Données invalides', 'VALIDATION_ERROR')
        case 401:
          throw new TaskServiceError('Non autorisé', 'AUTH_ERROR')
        case 403:
          throw new TaskServiceError('Accès refusé', 'PERMISSION_ERROR')
        case 404:
          throw new TaskServiceError('Ressource non trouvée', 'NOT_FOUND')
        default:
          throw new TaskServiceError(data.error || 'Une erreur est survenue', 'SERVER_ERROR')
      }
    }

    return data
  } catch (error) {
    if (error instanceof TaskServiceError) {
      throw error
    }
    throw new TaskServiceError('Erreur de connexion au serveur', 'NETWORK_ERROR')
  }
}

// Création d'une nouvelle tâche
export const createTask = async (projectId, taskData) => {
  const { title, description, assignedTo, dueDate, priority } = taskData
  return authFetch(`/projects/${projectId}/tasks`, {
    method: 'POST',
    body: JSON.stringify({ title, description, assignedTo, dueDate, priority }),
  })
}

// Récupération des tâches d'un projet
export const getProjectTasks = async (projectId) => {
  return authFetch(`/projects/${projectId}/tasks`)
}

// Récupération des tâches assignées à l'utilisateur connecté
export const getMyTasks = async () => {
  return authFetch('/tasks/me')
}

// Mise à jour du statut d'une tâche
export const updateTaskStatus = async (taskId, status) => {
  return authFetch(`/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  })
}

// Mise à jour complète d'une tâche (admin/manager uniquement)
export const updateTask = async (taskId, updates) => {
  const allowedUpdates = ['title', 'description', 'assignedTo', 'dueDate', 'priority', 'status']
  const filteredUpdates = Object.keys(updates)
    .filter(key => allowedUpdates.includes(key))
    .reduce((obj, key) => {
      obj[key] = updates[key]
      return obj
    }, {})

  return authFetch(`/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(filteredUpdates),
  })
}

// Suppression d'une tâche
export const deleteTask = async (taskId) => {
  return authFetch(`/tasks/${taskId}`, {
    method: 'DELETE',
  })
}

export { TaskServiceError }
