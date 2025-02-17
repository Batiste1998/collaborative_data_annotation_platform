const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.match(/^Bearer (.+)$/)?.[1]
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Authentication token is required' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = {
      _id: decoded.id,
      role: decoded.role,
      email: decoded.email,
      username: decoded.username,
    }

    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({
        message: 'Invalid token',
        details:
          'The authentication token is invalid or has been tampered with',
      })
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Token expired',
        details: 'Your session has expired. Please log in again',
      })
    }
    return res.status(500).json({
      message: 'Internal server error',
      details:
        process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

const protectRoute = (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({ message: 'Access denied' })
  }
  next()
}

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Required role: ${roles.join(' or ')}`,
      })
    }
    next()
  }
}

module.exports = {
  authenticateToken,
  protectRoute,
  requireRole,
}
