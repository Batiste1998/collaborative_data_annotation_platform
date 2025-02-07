const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

let mongod

beforeAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect()
  }
  mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()
  await mongoose.connect(uri)
})

afterEach(async () => {
  if (mongoose.connection.readyState !== 0) {
    const collections = mongoose.connection.collections
    for (const key in collections) {
      const collection = collections[key]
      await collection.deleteMany()
    }
  }
})

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  }
  if (mongod) {
    await mongod.stop()
  }
}, 10000)

// Dummy test to prevent jest warning
test('database setup', () => {
  expect(true).toBe(true)
})