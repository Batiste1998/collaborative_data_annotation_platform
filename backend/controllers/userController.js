const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAllUsers = async (requestingUserId, role) => {
  try {
    // Only admin can see all users
    // Managers can see annotators
    // Annotators can only see themselves
    let query = {}
    if (role === 'manager') {
      query = { role: 'annotator' }
    } else if (role !== 'admin') {
      query = { _id: requestingUserId }
    }

    const users = await User.find(query).select('-password')
    if (!users || users.length === 0) {
      throw new Error('No users found')
    }
    return users
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`)
  }
}

const getManagersOnly = async () => {
  try {
    const managers = await User.find({ role: 'manager' }).select('-password')
    if (!managers || managers.length === 0) {
      throw new Error('No managers found')
    }
    return managers
  } catch (error) {
    throw new Error(`Error fetching managers: ${error.message}`)
  }
}

const getAnnotatorsOnly = async () => {
  try {
    const annotators = await User.find({ role: 'annotator' }).select('-password')
    if (!annotators || annotators.length === 0) {
      throw new Error('No annotators found')
    }
    return annotators
  } catch (error) {
    throw new Error(`Error fetching annotators: ${error.message}`)
  }
}

const getUserById = async (id, requestingUserId, role) => {
  try {
    const user = await User.findById(id).select('-password')
    if (!user) {
      throw new Error('No user found')
    }

    // Check permissions
    if (
      role !== 'admin' &&
      role !== 'manager' &&
      requestingUserId !== user._id.toString()
    ) {
      throw new Error('Not authorized to view this user')
    }

    // Managers can only view annotators
    if (role === 'manager' && user.role !== 'annotator') {
      throw new Error('Managers can only view annotators')
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
    // Exclude password from response
    const userObject = user.toObject()
    delete userObject.password
    return userObject
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`)
  }
}

const updateUser = async (id, updates, requestingUserId, role) => {
  try {
    // Check if user exists
    const userToUpdate = await User.findById(id)
    if (!userToUpdate) {
      throw new Error('No user found')
    }

    // Check permissions
    if (role !== 'admin' && requestingUserId !== id) {
      throw new Error('Not authorized to update this user')
    }

    // Only admin can change roles
    if (updates.role && role !== 'admin') {
      throw new Error('Only admin can change user roles')
    }

    // Hash password if it's being updated
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10)
    }

    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select('-password')

    return user
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`)
  }
}

const deleteUser = async (id, requestingUserId, role) => {
  try {
    // Check if user exists
    const userToDelete = await User.findById(id)
    if (!userToDelete) {
      throw new Error('No user found')
    }

    // Check permissions
    if (role !== 'admin' && requestingUserId !== id) {
      throw new Error('Not authorized to delete this user')
    }

    // Prevent deleting the last admin
    if (userToDelete.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' })
      if (adminCount <= 1) {
        throw new Error('Cannot delete the last admin user')
      }
    }

    await User.findByIdAndDelete(id)
    return { message: 'User deleted successfully' }
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`)
  }
}

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error('Invalid login credentials')
    }
    const isMatch = await user.comparePassword(password, user.password)
    if (!isMatch) {
      throw new Error('Invalid login credentials')
    }
    // Check if user is active
    if (!user.isActive) {
      throw new Error('Account is deactivated')
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return {
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        isActive: user.isActive,
      },
      token,
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getManagersOnly,
  getAnnotatorsOnly
}
