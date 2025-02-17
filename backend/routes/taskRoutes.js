const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const { authenticateToken, requireRole } = require('../middlewares/auth')
const {
  createTaskValidation,
  updateTaskValidation,
} = require('../validation/taskValidation')

router.use(authenticateToken)

router.post(
  '/projects/:projectId/tasks',
  requireRole('admin', 'manager'),
  createTaskValidation,
  taskController.createTask
)

router.get('/projects/:projectId/tasks', taskController.getProjectTasks)

router.get('/tasks/me', taskController.getMyTasks)

router.put('/tasks/:taskId', updateTaskValidation, taskController.updateTask)

router.delete('/tasks/:taskId', taskController.deleteTask)

module.exports = router
