const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['image', 'text', 'audio'],
    default: 'image',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  collaborators: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      role: {
        type: String,
        enum: ['manager', 'annotator', 'reviewer'],
        default: 'annotator',
      },
    },
  ],
  dataset: [
    {
      fileUrl: {
        type: String,
        required: true,
      },
      fileName: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['pending', 'in_progress', 'annotated', 'reviewed'],
        default: 'pending',
      },
      assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  labels: [
    {
      name: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        default: '#000000',
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

projectSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
