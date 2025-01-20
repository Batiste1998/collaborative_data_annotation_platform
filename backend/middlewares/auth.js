const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.match(/^Bearer (.+)$/)?.[1]
  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

const protectRoute = (req, res, next) => {
  if (!req.user) return res.sendStatus(403)
  next()
}

module.exports = {
  authenticateToken,
  protectRoute,
}
