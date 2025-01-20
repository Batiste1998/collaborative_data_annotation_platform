const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const accountsRouter = require('./routes/accounts')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', accountsRouter)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: err.message || 'Something went wrong' })
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
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}

startServer()

module.exports = app