const express = require('express')
const router = express.Router()
const { validationResult } = require('express-validator')
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getManagersOnly,
  getAnnotatorsOnly
} = require('../controllers/userController')
const { authenticateToken, requireRole } = require('../middlewares/auth')
const {
  createUserValidation,
  updateUserValidation,
  validateId,
  adminCreateUserValidation,
} = require('../validation/userValidation')

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

// Get managers (admin only)
router.get('/managers', authenticateToken, requireRole('admin'), async (req, res) => {
  try {
    const managers = await getManagersOnly()
    res.json(managers)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get annotators (admin and managers)
router.get('/annotators', authenticateToken, requireRole('admin', 'manager'), async (req, res) => {
  try {
    const annotators = await getAnnotatorsOnly()
    res.json(annotators)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all users (with role-based filtering)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const users = await getAllUsers(req.user.id, req.user.role)
    res.json(users)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get user by ID (with role-based access control)
router.get(
  '/:id',
  authenticateToken,
  validateId,
  validate,
  async (req, res) => {
    try {
      const user = await getUserById(req.params.id, req.user.id, req.user.role)
      res.json(user)
    } catch (error) {
      if (error.message.includes('Not authorized')) {
        return res.status(403).json({ message: error.message })
      }
      res.status(400).json({ message: error.message })
    }
  }
)

// Create new user (public route for registration)
router.post('/', createUserValidation, validate, async (req, res) => {
  try {
    // Set default role to annotator for new registrations
    const userData = {
      ...req.body,
      role: 'annotator', // Only admin can create users with different roles
      isActive: true,
    }
    const user = await createUser(userData)
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update user (with role-based permissions)
router.put(
  '/:id',
  authenticateToken,
  updateUserValidation,
  validate,
  async (req, res) => {
    try {
      const user = await updateUser(
        req.params.id,
        req.body,
        req.user.id,
        req.user.role
      )
      res.json(user)
    } catch (error) {
      if (error.message.includes('Not authorized')) {
        return res.status(403).json({ message: error.message })
      }
      res.status(400).json({ message: error.message })
    }
  }
)

// Delete user (with role-based permissions)
router.delete(
  '/:id',
  authenticateToken,
  validateId,
  validate,
  async (req, res) => {
    try {
      const result = await deleteUser(req.params.id, req.user.id, req.user.role)
      res.json(result)
    } catch (error) {
      if (error.message.includes('Not authorized')) {
        return res.status(403).json({ message: error.message })
      }
      res.status(400).json({ message: error.message })
    }
  }
)

// Admin route to create users with specific roles
router.post(
  '/admin/create',
  authenticateToken,
  requireRole('admin'),
  adminCreateUserValidation,
  validate,
  async (req, res) => {
    try {
      // Admin can specify role and isActive
      const userData = {
        ...req.body,
        role: req.body.role || 'annotator',
        isActive: req.body.isActive !== undefined ? req.body.isActive : true,
      }
      const user = await createUser(userData)
      res.status(201).json(user)
    } catch (error) {
      if (error.message.includes('duplicate key')) {
        return res.status(400).json({
          message: 'A user with this email already exists',
        })
      }
      res.status(400).json({ message: error.message })
    }
  }
)

module.exports = router
