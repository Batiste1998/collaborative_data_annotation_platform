const User = require('../models/User')

//Résolveurs
const userController = {
    getAllUsers: async () => {
        const users = await User.find({});
        return users.map(user => ({
            ...user._doc,
            id: user._id,
        }));
    },
  // Route pour chercher un user en particulier grâce à son id
  user: async ({ id }) => {
    const user = await User.findById(id)
    return {
      ...user._doc,
      id: user._id,
    }
  },

  addUser: async ({ username, email, password }) => {
    const user = new User({
      username,
      email,
      password
    }) 
    await user.save()
    return {
      ...user._doc,
      id: user._id
    }
  },

  updateUser: async ({password, username, email, userId}) => {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { password: password, username: username, email: email} },
      { new: true}
    )
    return {
      ...user._doc,
      id: user._id,
    }
  },

  deleteUser: async ({ id }) => {
    const user = await User.findByIdAndDelete(id)
    return {
      ...user._doc,
      id: user._id,
    }
  },
}


module.exports = userController