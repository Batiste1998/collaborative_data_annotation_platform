
const express = require('express')
const router = express.Router()
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}= require('../controllers/controller')

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

router.get('/', asyncHandler(async (req, res) => {
    const users = await getAllUsers()
    res.json(users)
}))

router.get('/:id', asyncHandler(async (req, res) => {
    const user = await getUserById(req.params.id)
    res.json(user)
}))

router.post('/', asyncHandler(async (req, res) => {
    const user = await createUser(req.body)
    res.status(201).json(user)
}))

router.put('/:id', asyncHandler(async (req, res) => {
    const user = await updateUser(req.params.id, req.body)
    res.json(user)
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    await deleteUser(req.params.id)
    res.json({ message: 'User deleted successfully' })
}))

module.exports = router