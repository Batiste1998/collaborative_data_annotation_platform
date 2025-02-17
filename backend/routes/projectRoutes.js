const express = require('express')
const router = express.Router()
const { authenticateToken, requireRole } = require('../middlewares/auth')
const projectController = require('../controllers/projectController')
const {
  createProjectValidation,
  updateProjectValidation,
  addCollaboratorValidation,
  removeCollaboratorValidation,
  updateDatasetStatusValidation,
  assignDatasetItemValidation,
  validateId,
} = require('../validation/projectValidation')

router.use(authenticateToken)

router.post(
  '/',
  requireRole('admin', 'manager'),
  createProjectValidation,
  projectController.createProject
)

router.get('/', projectController.getProjects)

router.get('/:id', validateId, projectController.getProject)

router.patch(
  '/:id',
  validateId,
  updateProjectValidation,
  projectController.updateProject
)

router.delete('/:id', validateId, projectController.deleteProject)

router.post(
  '/:id/collaborators',
  validateId,
  addCollaboratorValidation,
  projectController.addCollaborator
)

router.delete(
  '/:id/collaborators/:userId',
  removeCollaboratorValidation,
  projectController.removeCollaborator
)

router.patch(
  '/:id/dataset/:itemId/status',
  updateDatasetStatusValidation,
  projectController.updateDatasetStatus
)

router.patch(
  '/:id/dataset/:itemId/assign',
  assignDatasetItemValidation,
  projectController.assignDatasetItem
)

module.exports = router
