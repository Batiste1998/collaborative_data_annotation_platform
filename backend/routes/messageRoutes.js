const express = require('express')
const router = express.Router()
const messageController = require('../controllers/messageController')
const { authenticateToken, protectRoute } = require('../middlewares/auth')

router.use(authenticateToken)
router.use(protectRoute)

router.get('/', messageController.getMessages)
router.post('/', messageController.createMessage)
router.put('/:messageId/read', messageController.markAsRead)

module.exports = router
