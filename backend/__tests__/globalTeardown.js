const mongoose = require('mongoose')

module.exports = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close()
  }
  
  await mongoose.disconnect()
  
  delete process.env.JWT_SECRET
  delete process.env.PORT
  
  if (global.__MONGOD__) {
    await global.__MONGOD__.stop()
  }
}