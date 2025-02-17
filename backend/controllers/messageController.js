const Message = require('../models/Message')

const messageController = {
  // Récupérer l'historique des messages
  getMessages: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 50
      const skip = (page - 1) * limit

      const [messages, total] = await Promise.all([
        Message.find({ type: 'global' })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .populate('sender', 'username')
          .populate('readBy', 'username'),
        Message.countDocuments({ type: 'global' }),
      ])

      res.json({
        messages: messages.reverse(), // Pour afficher les plus anciens en premier
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit),
        },
      })
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Erreur lors de la récupération des messages',
          error: error.message,
        })
    }
  },

  // Créer un nouveau message
  createMessage: async (req, res) => {
    try {
      const { content } = req.body
      const message = new Message({
        content,
        sender: req.user._id,
        type: 'global',
        readBy: [req.user._id],
      })

      await message.save()
      await message.populate('sender', 'username')
      await message.populate('readBy', 'username')

      res.status(201).json(message)
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Erreur lors de la création du message',
          error: error.message,
        })
    }
  },

  // Marquer un message comme lu
  markAsRead: async (req, res) => {
    try {
      const { messageId } = req.params
      const userId = req.user._id

      const message = await Message.findById(messageId)
      if (!message) {
        return res.status(404).json({ message: 'Message non trouvé' })
      }

      if (!message.readBy.includes(userId)) {
        message.readBy.push(userId)
        await message.save()
      }

      res.json({ message: 'Message marqué comme lu' })
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Erreur lors du marquage du message',
          error: error.message,
        })
    }
  },
}

module.exports = messageController
