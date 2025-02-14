const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const { authenticateToken, requireRole } = require('../middlewares/auth')
const { createTaskValidation, updateTaskValidation } = require('../validation/taskValidation')

// Toutes les routes nécessitent une authentification
router.use(authenticateToken)

// Routes pour les tâches d'un projet spécifique
router.post(
    '/projects/:projectId/tasks',
    requireRole('admin', 'manager'),
    createTaskValidation,
    taskController.createTask
)

router.get(
    '/projects/:projectId/tasks',
    taskController.getProjectTasks
)

// Routes pour les tâches de l'utilisateur connecté
router.get(
    '/tasks/me',
    taskController.getMyTasks
)

// Routes pour une tâche spécifique
router.put(
    '/tasks/:taskId',
    updateTaskValidation,
    taskController.updateTask
)

router.delete(
    '/tasks/:taskId',
    taskController.deleteTask
)

module.exports = router
