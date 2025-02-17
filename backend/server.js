const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const morgan = require('morgan')
const { createServer } = require('http')
const { Server } = require('socket.io')
const jwt = require('jsonwebtoken')
const accountsRouter = require('./routes/userRoutes')
const projectRouter = require('./routes/projectRoutes')
const authRouter = require('./routes/authRoutes')
const taskRouter = require('./routes/taskRoutes')
const messageRouter = require('./routes/messageRoutes')
require('dotenv').config()

const requiredEnvVars = ['JWT_SECRET', 'MONGODB_URI']
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`${envVar} is not defined`)
    process.exit(1)
  }
}

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  },
})
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token?.replace('Bearer ', '')
    if (!token) {
      return next(new Error('Authentication error'))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    socket.user = decoded
    next()
  } catch (err) {
    next(new Error('Authentication error'))
  }
})

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.user.username}`)

  socket.join('global')

  socket.on('send_message', async (messageData) => {
    try {
      const Message = require('./models/Message')

      const message = new Message({
        content: messageData.content,
        sender: socket.user.id,
        type: 'global',
        readBy: [socket.user.id],
      })

      await message.save()
      await message.populate('sender', 'username')

      io.to('global').emit('new_message', message)
    } catch (error) {
      console.error('Error sending message:', error)
      socket.emit('error', { message: 'Error sending message' })
    }
  })

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.user.username}`)
  })
})

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  message: 'Too many requests from this IP, please try again later.',
})

app.use(morgan('dev'))
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
)
app.use(helmet())
app.use(limiter)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

app.use('/api/users', accountsRouter)
app.use('/api/projects', projectRouter)
app.use('/api/auth', authRouter)
app.use('/api', taskRouter)
app.use('/api/messages', messageRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use((err, req, res, next) => {
  console.error(`${new Date().toISOString()} - Error:`, err)

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      details: Object.values(err.errors).map((e) => e.message),
    })
  }

  if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(400).json({
      message: 'Duplicate key error',
      field: Object.keys(err.keyPattern)[0],
    })
  }

  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
})

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Successfully connected to the database')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

const startServer = async () => {
  await connectDB()
  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}

startServer()

module.exports = app
