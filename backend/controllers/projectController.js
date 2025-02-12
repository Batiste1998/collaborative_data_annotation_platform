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
    })
    .populate('owner', 'username email')
    .populate('collaborators.user', 'username email')
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
    // Trouver le projet sans restriction au propriétaire
    const project = await Project.findById(req.params.id)
      .populate('owner', 'username email')
      .populate('collaborators.user', 'username email')

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    // Vérifier les permissions
    const isOwner = project.owner._id.toString() === req.user._id
    const isManager = project.collaborators.some(
      c => c.user._id.toString() === req.user._id && c.role === 'manager'
    )

    // Seuls le propriétaire et les managers peuvent modifier le projet
    if (!isOwner && !isManager) {
      return res.status(403).json({ error: 'Not authorized to update this project' })
    }

    updates.forEach((update) => (project[update] = req.body[update]))
    await project.save()

    // Recharger le projet avec les populations
    const updatedProject = await Project.findById(project._id)
      .populate('owner', 'username email')
      .populate('collaborators.user', 'username email')

    res.json(updatedProject)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.deleteProject = async (req, res) => {
  try {
    // Trouver le projet sans restriction au propriétaire
    const project = await Project.findById(req.params.id)
      .populate('owner', 'username email')
      .populate('collaborators.user', 'username email')

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    // Vérifier les permissions
    const isOwner = project.owner._id.toString() === req.user._id
    const isManager = project.collaborators.some(
      c => c.user._id.toString() === req.user._id && c.role === 'manager'
    )

    // Seuls le propriétaire et les managers peuvent supprimer le projet
    if (!isOwner && !isManager) {
      return res.status(403).json({ error: 'Not authorized to delete this project' })
    }

    await Project.findByIdAndDelete(project._id)
    res.json({ message: 'Project deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.addCollaborator = async (req, res) => {
  try {
    // Trouver le projet sans restriction au propriétaire
    const project = await Project.findById(req.params.id)
      .populate('owner', 'username email')
      .populate('collaborators.user', 'username email')

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    // Vérifier les permissions
    const isOwner = project.owner._id.toString() === req.user._id
    const isManager = project.collaborators.some(
      c => c.user._id.toString() === req.user._id && c.role === 'manager'
    )

    const { userId, role } = req.body

    // Vérifier les permissions selon le rôle
    if (!isOwner && !isManager) {
      return res.status(403).json({ error: 'Not authorized to add collaborators' })
    }

    // Les managers ne peuvent ajouter que des annotateurs
    if (isManager && role !== 'annotator') {
      return res.status(403).json({ error: 'Managers can only add annotators' })
    }

    const existingCollaborator = project.collaborators.find(
      (c) => c.user._id.toString() === userId
    )

    if (existingCollaborator) {
      return res.status(400).json({ error: 'User is already a collaborator' })
    }

    project.collaborators.push({ user: userId, role })
    await project.save()

    // Recharger le projet avec les populations
    const updatedProject = await Project.findById(project._id)
      .populate('owner', 'username email')
      .populate('collaborators.user', 'username email')

    res.json(updatedProject)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.removeCollaborator = async (req, res) => {
  try {
    // Trouver le projet sans restriction au propriétaire
    const project = await Project.findById(req.params.id)
      .populate('owner', 'username email')
      .populate('collaborators.user', 'username email')

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    // Vérifier les permissions
    const isOwner = project.owner._id.toString() === req.user._id
    const isManager = project.collaborators.some(
      c => c.user._id.toString() === req.user._id && c.role === 'manager'
    )

    // Vérifier les permissions selon le rôle
    if (!isOwner && !isManager) {
      return res.status(403).json({ error: 'Not authorized to remove collaborators' })
    }

    // Trouver le collaborateur à retirer
    const collaboratorToRemove = project.collaborators.find(
      c => c.user._id.toString() === req.params.userId
    )

    if (!collaboratorToRemove) {
      return res.status(404).json({ error: 'Collaborator not found' })
    }

    // Les managers ne peuvent retirer que des annotateurs
    if (isManager && collaboratorToRemove.role !== 'annotator') {
      return res.status(403).json({ error: 'Managers can only remove annotators' })
    }

    project.collaborators = project.collaborators.filter(
      c => c.user._id.toString() !== req.params.userId
    )

    await project.save()

    // Recharger le projet avec les populations
    const updatedProject = await Project.findById(project._id)
      .populate('owner', 'username email')
      .populate('collaborators.user', 'username email')

    res.json(updatedProject)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
