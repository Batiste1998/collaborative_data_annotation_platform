module.exports = async () => {
  process.env.NODE_ENV = 'test'
  process.env.JWT_SECRET = 'test-secret'
  process.env.PORT = '5001'

  global.__MONGOD__ = null
}
