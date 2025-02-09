const Project = require('../models/Project')

exports.createProject = async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      owner: req.user._id,
    })
    await project.save()
    res.status(201).json(project)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ owner: req.user._id }, { 'collaborators.user': req.user._id }],
    }).populate('owner', 'username email')
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      $or: [{ owner: req.user._id }, { 'collaborators.user': req.user._id }],
    })
      .populate('owner', 'username email')
      .populate('collaborators.user', 'username email')

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }
    res.json(project)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.updateProject = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'description', 'type', 'labels']
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates' })
  }

  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id,
    })

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    updates.forEach((update) => (project[update] = req.body[update]))
    await project.save()
    res.json(project)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    })

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }
    res.json(project)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.addCollaborator = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id,
    })

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    const { userId, role } = req.body

    const existingCollaborator = project.collaborators.find(
      (c) => c.user.toString() === userId
    )

    if (existingCollaborator) {
      return res.status(400).json({ error: 'User is already a collaborator' })
    }

    project.collaborators.push({ user: userId, role })
    await project.save()
    res.json(project)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.removeCollaborator = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id,
    })

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    project.collaborators = project.collaborators.filter(
      (c) => c.user.toString() !== req.params.userId
    )

    await project.save()
    res.json(project)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
