const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    type: {
      type: String,
      enum: ['global'],
      default: 'global',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Message', messageSchema)
