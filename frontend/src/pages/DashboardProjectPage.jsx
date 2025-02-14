import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Header from '../components/header'
import Footer from '../components/footer'
import Decoration from '../components/decoration'
import Input from '../components/input'
import Button from '../components/button'
import Name from '../components/name'
import Task from '../components/task'
import { 
    getProject, 
    updateProject
} from '../services/projectService'
import { 
    updateTaskStatus,
    deleteTask
} from '../services/taskService'

const DashboardProjectPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: 'image'
    })

    const projectTypes = [
        { value: 'image', label: 'Images' },
        { value: 'text', label: 'Textes' },
        { value: 'audio', label: 'Audio' }
    ]

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await getProject(id)
                setProject(data)
                setFormData({
                    name: data.name,
                    description: data.description,
                    type: data.type
                })
            } catch (err) {
                if (err.type === 'NOT_FOUND') {
                    setError('Projet non trouvé')
                } else if (err.type === 'AUTH_ERROR') {
                    setError('Session expirée. Veuillez vous reconnecter.')
                    // Rediriger vers la page de connexion si nécessaire
                } else {
                    setError(err.message)
                }
            } finally {
                setLoading(false)
            }
        }

        fetchProject()
    }, [id])

    const handleInputChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await updateTaskStatus(taskId, newStatus)
            // Recharger le projet pour avoir les données à jour
            const updatedProject = await getProject(id)
            setProject(updatedProject)
        } catch (err) {
            setError(err.message)
        }
    }

    const handleAssign = async (taskId, userId) => {
        try {
            await updateTaskStatus(taskId, { assignedTo: userId })
            const updatedProject = await getProject(id)
            setProject(updatedProject)
        } catch (err) {
            setError(err.message)
        }
    }

    const handleEdit = (taskId) => {
        navigate(`/projects/${id}/tasks/${taskId}/edit`)
    }

    const handleDelete = async (taskId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
            try {
                await deleteTask(taskId)
                const updatedProject = await getProject(id)
                setProject(updatedProject)
            } catch (err) {
                setError(err.message)
            }
        }
    }

    const handleSubmit = async () => {
        if (!formData.name || !formData.description) {
            setError('Veuillez remplir tous les champs obligatoires')
            return
        }

        try {
            setLoading(true)
            setError(null)
            await updateProject(id, formData)
            const updatedProject = await getProject(id)
            setProject(updatedProject)
            alert('Projet mis à jour avec succès')
            navigate('/allprojects')
        } catch (err) {
            if (err.type === 'VALIDATION_ERROR') {
                setError('Données invalides. Vérifiez les champs requis.')
            } else if (err.type === 'AUTH_ERROR') {
                setError('Session expirée. Veuillez vous reconnecter.')
            } else if (err.type === 'PERMISSION_ERROR') {
                setError('Vous n\'avez pas les droits pour modifier ce projet.')
            } else {
                setError(err.message)
            }
        } finally {
            setLoading(false)
        }
    }

    const getTypeIcon = (type) => {
        switch (type) {
            case 'image': return '🖼️'
            case 'text': return '📝'
            case 'audio': return '🎵'
            default: return '📁'
        }
    }

    // Vérifie si l'utilisateur peut modifier le projet
    const canEditProject = () => {
        if (!project || !user) return false
        if (user.role === 'admin') return true
        if (user.role === 'manager' && project.collaborators.some(
            c => c.user._id === user._id && c.role === 'manager'
        )) return true
        return project.owner._id === user._id
    }

    if (loading) return <div className="flex items-center justify-center h-screen"><div className="text-2xl">Chargement...</div></div>
    if (error) return <div className="flex items-center justify-center h-screen"><div className="text-xl text-red-500">{error}</div></div>
    if (!project) return <div className="flex items-center justify-center h-screen"><div className="text-xl">Projet non trouvé</div></div>

    // Calcul des statistiques
    const totalItems = project.dataset?.length || 0
    const completedItems = project.dataset?.filter(item => item.status === 'annotated').length || 0
    const inProgressItems = project.dataset?.filter(item => item.status === 'in_progress').length || 0
    const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

    return(
        <div className="w-screen overflow-hidden">
            <Header/>
            <div className="bg-bleuElectrique h-[92vh] sm:h-screen lg:h-[70vw] xl:h-screen">
                <div className="flex flex-col items-center w-full gap-5 px-3 sm:w-3/4 py-14 sm:px-0">
                    <div className="flex items-center gap-4">
                        <span className="text-4xl" title={`Type: ${project.type}`}>{getTypeIcon(project.type)}</span>
                        <h1 className="w-full text-6xl text-white font-Gelasio lg:text-7xl xl:text-8xl sm:w-4/6 xl:w-4/6">{project.name}</h1>
                    </div>
                    <p className="w-full text-lg text-white font-Gelasio xl:text-xl sm:w-4/6 xl:w-4/6">{project.description}</p>
                    
                    {/* Statistiques */}
                    <div className="grid grid-cols-3 gap-4 p-4 mt-4 rounded-lg bg-white/10">
                        <div className="text-center text-white">
                            <p className="text-2xl font-bold">{totalItems}</p>
                            <p>Total</p>
                        </div>
                        <div className="text-center text-white">
                            <p className="text-2xl font-bold">{inProgressItems}</p>
                            <p>En cours</p>
                        </div>
                        <div className="text-center text-white">
                            <p className="text-2xl font-bold">{completedItems}</p>
                            <p>Terminé</p>
                        </div>
                    </div>

                    {/* Barre de progression */}
                    <div className="w-full sm:w-4/6 xl:w-4/6">
                        <div className="flex justify-between mb-2 text-white">
                            <span>Progression</span>
                            <span>{progressPercentage}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/30">
                            <div 
                                className="h-full bg-white rounded-full"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>

                    {/* Collaborateurs */}
                    <div className="z-10 w-full sm:w-4/6 xl:w-4/6">
                        <h3 className="mb-2 text-white">Collaborateurs</h3>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-white">Propriétaire:</span>
                                <Name name={project.owner.username} />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.collaborators.map((collab, index) => (
                                    <Name 
                                        key={index}
                                        name={`${collab.user.username} (${collab.role})`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Decoration className="absolute right-0"/>
            </div>

            {/* PROJECT's DATA */}
            {canEditProject() && (
                <div className="bg-white h-fit gap-6 pt-12 pb-[3rem] md:pb-[5rem] xl:pb-[8rem] flex justify-center sm:justify-start lg:justify-evenly flex-wrap px-6 lg:px-0">
                    <div className="flex flex-col gap-8 mb-14 lg:mb-0">
                        <div className="flex flex-col gap-6">
                            <h2 className="text-2xl font-bold text-black font-Roboto">Informations du projet</h2>
                            <Input 
                                text="Nom du projet" 
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                            <Input 
                                text="Description"
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                            />
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">Type de projet</label>
                                <select 
                                    className="p-2 border rounded-md"
                                    value={formData.type}
                                    onChange={(e) => handleInputChange('type', e.target.value)}
                                >
                                    {projectTypes.map(type => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Note: Ces fonctionnalités seront implémentées plus tard */}
                        <div className="flex flex-col gap-6">
                            <h2 className="text-2xl font-bold text-black font-Roboto">Labels</h2>
                            <p className="text-gray-600">
                                La gestion des labels sera disponible prochainement.
                            </p>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h2 className="text-2xl font-bold text-black font-Roboto">Dataset</h2>
                            <p className="text-gray-600">
                                L&apos;upload de fichiers sera disponible prochainement.
                            </p>
                        </div>

                        {error && (
                            <p className="mt-2 text-sm text-red-500">{error}</p>
                        )}

                        <div className="flex justify-start gap-3 sm:justify-end">
                            <Button 
                                variant="primary" 
                                text={loading ? "Mise à jour..." : "Mettre à jour"}
                                onClick={handleSubmit}
                                disabled={loading}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* TASKS */}
            <div className="bg-white h-fit gap-12 pt-12 pb-[3rem] lg:pb-[5rem] flex justify-start flex-col mx-auto w-full xl:w-9/12 px-4 sm:px-6 md:px-10 xl:px-0">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-black font-Roboto">Tâches</h2>
                    <div className="flex gap-4">
                        {(user.role === 'admin' || user.role === 'manager') && (
                    <Button
                        variant="primary"
                        text="Gérer les tâches"
                        onClick={() => navigate(`/projects/${id}/tasks`)}
                    />
                )}
                <Button
                    variant="secondary"
                    text="Voir les tâches"
                    onClick={() => navigate(`/projects/${id}/tasks`)}
                />
                    </div>
                </div>
                <div className="flex flex-wrap w-full gap-10 lg:gap-16">
                    {project.dataset?.map((item, index) => (
                        <Task 
                            key={index}
                            title={`Tâche ${index + 1}`}
                            description={`Annotation de ${item.fileName}`}
                            assignedTo={item.assignedTo?.username}
                            dueDate={new Date().toISOString()} // À remplacer par la vraie date d'échéance
                            priority="medium"
                            status={item.status}
                            onStatusChange={(newStatus) => handleStatusChange(item._id, newStatus)}
                            onAssign={(userId) => handleAssign(item._id, userId)}
                            onEdit={() => handleEdit(item._id)}
                            onDelete={() => handleDelete(item._id)}
                        />
                    ))}
                    {project.dataset?.length === 0 && (
                        <p className="text-gray-600">
                            Aucune tâche n&apos;a encore été créée pour ce projet.
                        </p>
                    )}
                </div>
            </div>

            {/* CHAT */}
            <div className="bg-white h-fit gap-10 md:pt-12 pb-[5rem] xl:pb-[8rem] flex justify-start flex-col mx-auto w-full xl:w-9/12 px-4 sm:px-10 xl:px-0">
                <h2 className="text-xl font-bold text-black font-Roboto">Chat</h2>
                <p className="text-gray-600">
                    Le système de chat sera disponible prochainement.
                </p>
            </div>
            <Footer isRegistration={false}/>
        </div>
    )
}

export default DashboardProjectPage
