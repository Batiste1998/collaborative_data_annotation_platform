const express = require('express')
const router = express.Router()
const { validationResult } = require('express-validator')
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController')
const { authenticateToken } = require('../middlewares/auth')
const {
  createUserValidation,
  updateUserValidation,
  validateId,
} = require('../validation/userValidation')

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

router.get('/', authenticateToken, async (req, res) => {
  const users = await getAllUsers()
  res.json(users)
})

router.get(
  '/:id',
  authenticateToken,
  validateId,
  validate,
  async (req, res) => {
    const user = await getUserById(req.params.id)
    res.json(user)
  }
)

router.post('/', createUserValidation, validate, async (req, res) => {
  const user = await createUser(req.body)
  res.status(201).json(user)
})

router.put(
  '/:id',
  authenticateToken,
  updateUserValidation,
  validate,
  async (req, res) => {
    const user = await updateUser(req.params.id, req.body)
    res.json(user)
  }
)

router.delete(
  '/:id',
  authenticateToken,
  validateId,
  validate,
  async (req, res) => {
    await deleteUser(req.params.id)
    res.json({ message: 'User deleted successfully' })
  }
)

module.exports = router
