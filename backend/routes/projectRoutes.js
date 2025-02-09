const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const projectController = require('../controllers/projectController')

router.use(auth)

router.post('/', projectController.createProject)
router.get('/', projectController.getProjects)
router.get('/:id', projectController.getProject)
router.patch('/:id', projectController.updateProject)
router.delete('/:id', projectController.deleteProject)

router.post('/:id/collaborators', projectController.addCollaborator)
router.delete(
  '/:id/collaborators/:userId',
  projectController.removeCollaborator
)

module.exports = router
