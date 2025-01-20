
const express = require('express')
const router = express.Router()
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}= require('../controllers/userController')
const { authenticateToken } = require('../middlewares/auth')
const asyncHandler = require('../utils/asyncHandler')

router.get('/', authenticateToken, asyncHandler(async (req, res) => {
    const users = await getAllUsers()
    res.json(users)
}))

router.get('/:id', authenticateToken, asyncHandler(async (req, res) => {
    const user = await getUserById(req.params.id)
    res.json(user)
}))

router.post('/', asyncHandler(async (req, res) => {
    const user = await createUser(req.body)
    res.status(201).json(user)
}))

router.put('/:id', authenticateToken, asyncHandler(async (req, res) => {
    const user = await updateUser(req.params.id, req.body)
    res.json(user)
}))

router.delete('/:id', authenticateToken, asyncHandler(async (req, res) => {
    await deleteUser(req.params.id)
    res.json({ message: 'User deleted successfully' })
}))

module.exports = router