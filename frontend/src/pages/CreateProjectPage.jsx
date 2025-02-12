import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Header from '../components/header'
import Footer from '../components/footer'
import Decoration from '../components/decoration'
import Input from '../components/input'
import Button from '../components/button'
import { createProject, addCollaborator } from '../services/projectService'
import { getManagers, getAnnotators } from '../services/userService'

const CreateProjectPage = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [managers, setManagers] = useState([])
    const [annotators, setAnnotators] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: 'image',
        manager: '',
        selectedAnnotators: []
    })
    const [labels, setLabels] = useState([])
    const [newLabel, setNewLabel] = useState({ name: '', color: '#000000' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const projectTypes = [
        { value: 'image', label: 'Images' },
        { value: 'text', label: 'Textes' },
        { value: 'audio', label: 'Audio' }
    ]

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                if (user.role === 'admin') {
                    const managersData = await getManagers()
                    setManagers(managersData)
                }
                const annotatorsData = await getAnnotators()
                setAnnotators(annotatorsData)
            } catch (err) {
                setError(`Erreur lors de la récupération des utilisateurs : ${err.message}`)
            }
        }

        fetchUsers()
    }, [user.role])

    const handleInputChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleAddLabel = () => {
        if (newLabel.name.trim()) {
            setLabels(prev => [...prev, { ...newLabel }])
            setNewLabel({ name: '', color: '#000000' })
        }
    }

    const handleRemoveLabel = (index) => {
        setLabels(prev => prev.filter((_, i) => i !== index))
    }

    const handleAnnotatorSelect = (annotatorId) => {
        setFormData(prev => {
            const selectedAnnotators = prev.selectedAnnotators.includes(annotatorId)
                ? prev.selectedAnnotators.filter(id => id !== annotatorId)
                : [...prev.selectedAnnotators, annotatorId]
            return { ...prev, selectedAnnotators }
        })
    }

    const handleSubmit = async () => {
        if (!formData.name || !formData.description) {
            setError('Veuillez remplir tous les champs obligatoires')
            return
        }

        if (user.role === 'admin' && !formData.manager) {
            setError('Veuillez sélectionner un manager pour le projet')
            return
        }

        setLoading(true)
        setError(null)

        try {
            // Créer le projet
            const project = await createProject({
                name: formData.name,
                description: formData.description,
                type: formData.type,
                labels
            })

            // Si admin, ajouter le manager
            if (user.role === 'admin' && formData.manager) {
                await addCollaborator(project._id, formData.manager, 'manager')
            }

            // Ajouter les annotateurs sélectionnés
            for (const annotatorId of formData.selectedAnnotators) {
                await addCollaborator(project._id, annotatorId, 'annotator')
            }

            navigate('/allprojects')
        } catch (err) {
            if (err.type === 'VALIDATION_ERROR') {
                setError('Données invalides. Vérifiez les champs requis.')
            } else if (err.type === 'AUTH_ERROR') {
                setError('Session expirée. Veuillez vous reconnecter.')
            } else {
                setError(err.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return(
        <div className="w-screen overflow-hidden">
            <Header/>
            <div className="bg-bleuElectrique h-[92vh] sm:h-screen lg:h-[70vw] xl:h-screen">
                <div className="flex w-3/4 py-20 lg:py-28 xl:py-32 justify-evenly">
                    <h1 className="w-5/6 text-6xl text-white font-Gelasio lg:text-7xl xl:text-8xl md:w-3/6">Create a new project</h1>
                </div>
                <Decoration className="absolute right-0"/>
            </div>
            <div className="bg-white h-fit gap-6 pt-12 pb-[8rem] lg:pb-[10rem] xl:pb-[15rem] flex lg:justify-evenly flex-wrap lg:flex-nowrap px-6 lg:px-0 justify-center sm:justify-start">
                <div className="flex flex-col gap-8 mb-14 lg:mb-0">
                    {/* Informations de base */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl font-bold text-black font-Roboto">Informations de base</h2>
                        <Input 
                            text="Nom du projet" 
                            placeholder="Nom du projet"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                        <Input 
                            text="Description du projet" 
                            placeholder="Description du projet"
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

                    {/* Gestion des labels */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl font-bold text-black font-Roboto">Labels</h2>
                        <div className="flex gap-4">
                            <Input 
                                text="Nom du label"
                                placeholder="Nom du label"
                                value={newLabel.name}
                                onChange={(e) => setNewLabel(prev => ({ ...prev, name: e.target.value }))}
                            />
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">Couleur</label>
                                <input 
                                    type="color"
                                    value={newLabel.color}
                                    onChange={(e) => setNewLabel(prev => ({ ...prev, color: e.target.value }))}
                                    className="w-20 h-10"
                                />
                            </div>
                            <Button 
                                variant="secondary" 
                                text="Ajouter"
                                onClick={handleAddLabel}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {labels.map((label, index) => (
                                <div 
                                    key={index}
                                    className="flex items-center gap-2 px-3 py-1 rounded-full"
                                    style={{ backgroundColor: label.color, color: '#ffffff' }}
                                >
                                    <span>{label.name}</span>
                                    <button 
                                        onClick={() => handleRemoveLabel(index)}
                                        className="text-white hover:text-gray-200"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Note: L'upload de fichiers sera implémenté plus tard */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl font-bold text-black font-Roboto">Dataset</h2>
                        <p className="text-gray-600">
                            L&apos;upload de fichiers sera disponible prochainement.
                        </p>
                    </div>

                    {/* Gestion des collaborateurs */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl font-bold text-black font-Roboto">Collaborateurs</h2>
                        
                        {/* Sélection du manager (admin uniquement) */}
                        {user.role === 'admin' && (
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">Manager du projet</label>
                                <select 
                                    className="p-2 border rounded-md"
                                    value={formData.manager}
                                    onChange={(e) => handleInputChange('manager', e.target.value)}
                                >
                                    <option value="">Sélectionner un manager</option>
                                    {managers.map(manager => (
                                        <option key={manager._id} value={manager._id}>
                                            {manager.username}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Sélection des annotateurs */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">Annotateurs</label>
                            <div className="flex flex-wrap gap-2">
                                {annotators.map(annotator => (
                                    <div 
                                        key={annotator._id}
                                        className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                                            formData.selectedAnnotators.includes(annotator._id)
                                                ? 'bg-bleuElectrique text-white'
                                                : 'bg-gray-200 text-gray-700'
                                        }`}
                                        onClick={() => handleAnnotatorSelect(annotator._id)}
                                    >
                                        {annotator.username}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {error && (
                        <p className="mt-2 text-sm text-red-500">{error}</p>
                    )}

                    <div className="flex justify-start gap-3 sm:justify-end">
                        <Button 
                            variant="primary" 
                            text={loading ? "Création..." : "Créer le projet"}
                            onClick={handleSubmit}
                            disabled={loading}
                        />
                    </div>
                </div>
            </div>
            <Footer isRegistration={false}/>
        </div>
    )
}

export default CreateProjectPage
