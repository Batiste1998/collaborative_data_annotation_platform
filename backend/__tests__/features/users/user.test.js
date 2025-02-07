const User = require('../../../models/User')

describe('Feature: User Management', () => {
  const userData = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
    role: 'annotator'
  }

  beforeEach(async () => {
    await User.deleteMany({})
  })

  describe('Scenario: Managing user accounts', () => {
    describe('Given a new user data', () => {
      it('should create a new user account', async () => {
        const user = new User(userData)
        const savedUser = await user.save()
        
        expect(savedUser._id).toBeDefined()
        expect(savedUser.email).toBe(userData.email)
        expect(savedUser.username).toBe(userData.username)
        expect(savedUser.role).toBe(userData.role)
        expect(savedUser.password).not.toBe(userData.password) // Password should be hashed
      })

      it('should not create user without required fields', async () => {
        const user = new User({ username: 'test' })
        let err
        try {
          await user.save()
        } catch (error) {
          err = error
        }
        expect(err).toBeDefined()
        expect(err.name).toBe('ValidationError')
      })
    })

    describe('Given an existing user', () => {
      let existingUser

      beforeEach(async () => {
        existingUser = await User.create(userData)
      })

      it('should fetch the user details', async () => {
        const fetchedUser = await User.findById(existingUser._id)
        expect(fetchedUser.email).toBe(userData.email)
        expect(fetchedUser.username).toBe(userData.username)
      })

      it('should update user information', async () => {
        const updatedData = {
          username: 'updateduser',
          email: 'updated@example.com'
        }
        
        const updatedUser = await User.findByIdAndUpdate(
          existingUser._id,
          updatedData,
          { new: true }
        )
        
        expect(updatedUser.username).toBe(updatedData.username)
        expect(updatedUser.email).toBe(updatedData.email)
      })

      it('should delete the user account', async () => {
        await User.findByIdAndDelete(existingUser._id)
        const deletedUser = await User.findById(existingUser._id)
        expect(deletedUser).toBeNull()
      })
    })
  })
})