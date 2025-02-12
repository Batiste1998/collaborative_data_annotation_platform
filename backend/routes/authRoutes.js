const express = require('express')
const router = express.Router()
const { loginUser } = require('../controllers/userController')
const { validationResult } = require('express-validator')

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await loginUser(email, password)
    res.json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
