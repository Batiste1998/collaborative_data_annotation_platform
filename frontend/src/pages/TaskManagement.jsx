import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Task from '../components/task'
import CreateTaskForm from '../components/CreateTaskForm'
import Button from '../components/button'
import Select from '../components/select'
import {
    getProjectTasks,
    createTask,
    updateTaskStatus,
    updateTask,
    deleteTask
} from '../services/taskService'
import { getProject } from '../services/projectService'

const TaskManagement = () => {
    const { projectId } = useParams()
    const { user } = useAuth()
    
    const [tasks, setTasks] = useState([])
    const [project, setProject] = useState(null)
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [statusFilter, setStatusFilter] = useState('all')
    const [assigneeFilter, setAssigneeFilter] = useState('all')
    const [showOnlyMyTasks, setShowOnlyMyTasks] = useState(false)

    const canManageTasks = user && ['admin', 'manager'].includes(user.role)

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)
                const [projectData, tasksData] = await Promise.all([
                    getProject(projectId),
                    getProjectTasks(projectId)
                ])
                setProject(projectData)
                setTasks(tasksData)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [projectId, user.role, user._id])

    const handleCreateTask = async (taskData) => {
        try {
            const newTask = await createTask(projectId, taskData)
            if (user.role === 'annotator') {
                // Pour les annotateurs, n'ajouter que si la tâche leur est assignée
                if (newTask.assignedTo && newTask.assignedTo._id === user._id) {
                    setTasks(prev => [...prev, newTask])
                }
            } else {
                setTasks(prev => [...prev, newTask])
            }
            setShowCreateForm(false)
        } catch (err) {
            setError(err.message)
        }
    }

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await updateTaskStatus(taskId, newStatus)
            setTasks(prev => prev.map(task => 
                task._id === taskId ? { ...task, status: newStatus } : task
            ))
        } catch (err) {
            setError(err.message)
        }
    }

    const handleAssign = async (taskId, userId) => {
        try {
            const updatedTask = await updateTask(taskId, { assignedTo: userId })
            if (user.role === 'annotator') {
                // Pour les annotateurs, retirer la tâche si elle n'est plus assignée à eux
                if (updatedTask.assignedTo._id !== user._id) {
                    setTasks(prev => prev.filter(task => task._id !== taskId))
                } else {
                    setTasks(prev => prev.map(task => 
                        task._id === taskId ? updatedTask : task
                    ))
                }
            } else {
                setTasks(prev => prev.map(task => 
                    task._id === taskId ? updatedTask : task
                ))
            }
        } catch (err) {
            setError(err.message)
        }
    }

    const handleDeleteTask = async (taskId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
            try {
                await deleteTask(taskId)
                setTasks(prev => prev.filter(task => task._id !== taskId))
            } catch (err) {
                setError(err.message)
            }
        }
    }

    const handleEditTask = async (taskId, updates) => {
        try {
            const updatedTask = await updateTask(taskId, updates)
            if (user.role === 'annotator') {
                // Pour les annotateurs, retirer la tâche si elle n'est plus assignée à eux
                if (updatedTask.assignedTo._id !== user._id) {
                    setTasks(prev => prev.filter(task => task._id !== taskId))
                } else {
                    setTasks(prev => prev.map(task => 
                        task._id === taskId ? updatedTask : task
                    ))
                }
            } else {
                setTasks(prev => prev.map(task => 
                    task._id === taskId ? updatedTask : task
                ))
            }
        } catch (err) {
            setError(err.message)
        }
    }

    const getAvailableUsers = () => {
        if (!project) return []
        return project.collaborators
            .filter(collab => collab.role === 'annotator')
            .map(collab => ({
                value: collab.user._id,
                label: collab.user.username
            }))
    }

    const filteredTasks = tasks.filter(task => {
        const matchesStatus = statusFilter === 'all' || task.status === statusFilter
        const matchesAssignee = assigneeFilter === 'all' || 
            (task.assignedTo && task.assignedTo._id === assigneeFilter)
        const matchesMyTasks = !showOnlyMyTasks || 
            (task.assignedTo && task.assignedTo._id === user._id)
        return matchesStatus && matchesAssignee && matchesMyTasks
    })

    if (loading) return <div className="p-4">Chargement...</div>
    if (error) return <div className="p-4 text-red-600">Erreur: {error}</div>
    if (!project) return <div className="p-4">Projet non trouvé</div>

    const availableUsers = getAvailableUsers()

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="mb-2 text-2xl font-bold">{project.name}</h1>
                <p className="text-gray-600">{project.description}</p>
            </div>

            <div className="flex items-center justify-between mb-6">
                {/* Filtres visibles uniquement pour admin/manager */}
                {canManageTasks ? (
                    <div className="flex gap-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Statut
                            </label>
                            <Select
                                value={statusFilter}
                                onChange={setStatusFilter}
                                list={[
                                    { value: 'all', label: 'Tous' },
                                    { value: 'pending', label: 'Non commencé' },
                                    { value: 'in_progress', label: 'En cours' },
                                    { value: 'completed', label: 'Terminé' }
                                ]}
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Assigné à
                            </label>
                            <Select
                                value={assigneeFilter}
                                onChange={setAssigneeFilter}
                                list={[
                                    { value: 'all', label: 'Tous' },
                                    ...availableUsers
                                ]}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Statut
                            </label>
                            <Select
                                value={statusFilter}
                                onChange={setStatusFilter}
                                list={[
                                    { value: 'all', label: 'Tous' },
                                    { value: 'pending', label: 'Non commencé' },
                                    { value: 'in_progress', label: 'En cours' }
                                ]}
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Affichage
                            </label>
                            <Select
                                value={showOnlyMyTasks ? 'my' : 'all'}
                                onChange={(value) => setShowOnlyMyTasks(value === 'my')}
                                list={[
                                    { value: 'all', label: 'Toutes les tâches' },
                                    { value: 'my', label: 'Mes tâches' }
                                ]}
                            />
                        </div>
                    </div>
                )}

                {canManageTasks && (
                    <Button
                        variant="primary"
                        text="Nouvelle tâche"
                        onClick={() => setShowCreateForm(true)}
                    />
                )}
            </div>

            {showCreateForm && (
                <div className="mb-6">
                    <CreateTaskForm
                        projectId={projectId}
                        users={project.collaborators.map(c => ({
                            _id: c.user._id,
                            username: c.user.username
                        }))}
                        onSubmit={handleCreateTask}
                        onCancel={() => setShowCreateForm(false)}
                    />
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTasks.map(task => (
                    <Task
                        key={task._id}
                        {...task}
                        availableUsers={availableUsers}
                        onStatusChange={(status) => handleStatusChange(task._id, status)}
                        onAssign={(userId) => handleAssign(task._id, userId)}
                        onEdit={(updates) => handleEditTask(task._id, updates)}
                        onDelete={() => handleDeleteTask(task._id)}
                    />
                ))}
            </div>

            {filteredTasks.length === 0 && (
                <p className="mt-6 text-center text-gray-500">
                    Aucune tâche trouvée
                </p>
            )}
        </div>
    )
}

export default TaskManagement
