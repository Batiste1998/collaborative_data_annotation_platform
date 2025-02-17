const Task = require('../models/Task')
const Project = require('../models/Project')

exports.createTask = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)
    if (!project) {
      return res.status(404).json({ error: 'Projet non trouvé' })
    }

    const isAdmin = req.user.role === 'admin'
    const isManager = project.collaborators.some(
      (c) =>
        c.user.toString() === req.user._id.toString() && c.role === 'manager'
    )
    const isOwner = project.owner.toString() === req.user._id.toString()

    if (!isAdmin && !isManager && !isOwner) {
      return res.status(403).json({ error: 'Non autorisé à créer des tâches' })
    }

    const isAssignedUserInProject = project.collaborators.some(
      (c) => c.user.toString() === req.body.assignedTo
    )
    if (
      !isAssignedUserInProject &&
      project.owner.toString() !== req.body.assignedTo
    ) {
      return res
        .status(400)
        .json({ error: "L'utilisateur assigné doit faire partie du projet" })
    }

    const task = new Task({
      ...req.body,
      project: project._id,
      assignedBy: req.user._id,
    })

    await task.save()

    const populatedTask = await Task.findById(task._id)
      .populate('assignedTo', 'username email')
      .populate('assignedBy', 'username email')

    res.status(201).json(populatedTask)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.getProjectTasks = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)
    if (!project) {
      return res.status(404).json({ error: 'Projet non trouvé' })
    }

    const hasAccess =
      project.collaborators.some(
        (c) => c.user.toString() === req.user._id.toString()
      ) || project.owner.toString() === req.user._id.toString()

    if (!hasAccess) {
      return res
        .status(403)
        .json({ error: 'Non autorisé à voir les tâches de ce projet' })
    }

    const tasks = await Task.find({ project: req.params.projectId })
      .populate('assignedTo', 'username email')
      .populate('assignedBy', 'username email')
      .sort({ createdAt: -1 })

    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id })
      .populate('project', 'name description')
      .populate('assignedBy', 'username email')
      .sort({ createdAt: -1 })

    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId)
      .populate('project')
      .populate('assignedTo', 'username email')
      .populate('assignedBy', 'username email')

    if (!task) {
      return res.status(404).json({ error: 'Tâche non trouvée' })
    }

    const project = task.project

    const isAdmin = req.user.role === 'admin'
    const isManager = project.collaborators.some(
      (c) =>
        c.user.toString() === req.user._id.toString() && c.role === 'manager'
    )
    const isOwner = project.owner.toString() === req.user._id.toString()
    const isAssignedUser =
      task.assignedTo._id.toString() === req.user._id.toString()

    const updates = Object.keys(req.body)
    let allowedUpdates = ['status']

    if (isAdmin || isManager || isOwner) {
      allowedUpdates = [
        ...allowedUpdates,
        'title',
        'description',
        'assignedTo',
        'dueDate',
        'priority',
      ]
    }

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    )
    if (!isValidOperation) {
      return res.status(400).json({ error: 'Mises à jour non valides' })
    }

    if (!isAdmin && !isManager && !isOwner && !isAssignedUser) {
      return res
        .status(403)
        .json({ error: 'Non autorisé à mettre à jour cette tâche' })
    }

    if (isAssignedUser && !isAdmin && !isManager && !isOwner) {
      if (updates.length > 1 || updates[0] !== 'status') {
        return res
          .status(403)
          .json({ error: 'Vous ne pouvez mettre à jour que le statut' })
      }
    }

    updates.forEach((update) => {
      task[update] = req.body[update]
    })

    await task.save()

    const updatedTask = await Task.findById(task._id)
      .populate('project', 'name description')
      .populate('assignedTo', 'username email')
      .populate('assignedBy', 'username email')

    res.json(updatedTask)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId).populate('project')
    if (!task) {
      return res.status(404).json({ error: 'Tâche non trouvée' })
    }

    const project = task.project

    const isAdmin = req.user.role === 'admin'
    const isManager = project.collaborators.some(
      (c) =>
        c.user.toString() === req.user._id.toString() && c.role === 'manager'
    )
    const isOwner = project.owner.toString() === req.user._id.toString()

    if (!isAdmin && !isManager && !isOwner) {
      return res
        .status(403)
        .json({ error: 'Non autorisé à supprimer cette tâche' })
    }

    await task.deleteOne()
    res.json({ message: 'Tâche supprimée avec succès' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
