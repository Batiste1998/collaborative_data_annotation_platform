const User = require('../models/User')

const getAllUsers = async () => {
  try {
    const user = await User.find({}).select('-password')
    if (!user) {
      throw new Error('No user found')
    }
    return user
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`)
  }
}

const getUserById = async (id) => {
  try {
    const user = await User.findById(id).select('-password')
    if (!user) {
      throw new Error('No user found')
    }
    return user
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`)
  }
}

const createUser = async (userData) => {
  try {
    const user = new User(userData)
    await user.save()
    return user
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`)
  }
}

const updateUser = async (id, updates) => {
  try {
    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select('-password')
    if (!user) {
      throw new Error('No user found')
    }
    return user
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`)
  }
}

const deleteUser = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      throw new Error('No user found')
    }
    return user
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`)
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
