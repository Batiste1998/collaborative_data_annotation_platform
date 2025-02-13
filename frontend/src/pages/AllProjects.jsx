import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/footer'
import Decoration from '../components/decoration'
import Button from '../components/button'
import Project from '../components/project'
import Input from '../components/input'
import { getAllProjects } from '../services/projectService'

const AllProjects = () => {
    const navigate = useNavigate()
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filters, setFilters] = useState({
        search: '',
        type: 'all',
        status: 'all'
    })

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getAllProjects()
                setProjects(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProjects()
    }, [])

    const handleCreateProject = () => {
        navigate('/create')
    }

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const getProjectStatus = (project) => {
        if (!project.dataset || project.dataset.length === 0) return 'empty'
        const completedItems = project.dataset.filter(item => item.status === 'annotated').length
        const totalItems = project.dataset.length
        if (completedItems === totalItems) return 'completed'
        if (completedItems > 0) return 'in_progress'
        return 'not_started'
    }

    const filteredProjects = projects.filter(project => {
        // Filtre par recherche
        const searchMatch = project.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                          project.description.toLowerCase().includes(filters.search.toLowerCase())
        
        // Filtre par type
        const typeMatch = filters.type === 'all' || project.type === filters.type
        
        // Filtre par statut
        const statusMatch = filters.status === 'all' || getProjectStatus(project) === filters.status

        return searchMatch && typeMatch && statusMatch
    })

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-2xl">Chargement...</div>
            </div>
        )
    }

    return(
        <div className="w-screen overflow-hidden">
            <Header/>
            <div className="bg-bleuElectrique h-[92vh] sm:h-screen lg:h-[70vw] xl:h-screen">
                <div className="flex flex-col items-center w-full gap-5 px-3 md:w-3/4 py-14 sm:px-0">
                    <h1 className="w-full text-6xl text-white sm:w-4/6 xl:w-4/6 font-Gelasio lg:text-7xl xl:text-8xl">Vos projets</h1>
                    <p className="w-full text-lg text-white sm:w-4/6 xl:w-4/6 font-Gelasio xl:text-xl">Bienvenue dans votre espace projets. Consultez la liste des projets en cours et suivez leur progression.</p>
                    <div className="flex justify-start w-full sm:w-4/6 xl:w-4/6">
                        <Button 
                            variant="secondary" 
                            text="Créer un projet" 
                            onClick={handleCreateProject}
                        />
                    </div>
                </div>
                <Decoration className="absolute right-0"/>
            </div>

            {/* Filtres */}
            <div className="sticky top-0 z-50 w-full px-4 py-4 bg-white shadow-md sm:px-6 md:px-10 xl:px-0">
                <div className="flex flex-wrap items-center justify-center w-full gap-4 mx-auto xl:w-9/12">
                    <div className="w-full md:w-auto">
                        <Input 
                            text="Rechercher"
                            placeholder="Nom ou description du projet"
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <select
                            className="px-4 py-2 border rounded-md"
                            value={filters.type}
                            onChange={(e) => handleFilterChange('type', e.target.value)}
                        >
                            <option value="all">Tous les types</option>
                            <option value="image">Images</option>
                            <option value="text">Textes</option>
                            <option value="audio">Audio</option>
                        </select>
                        <select
                            className="px-4 py-2 border rounded-md"
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                        >
                            <option value="all">Tous les statuts</option>
                            <option value="empty">Vide</option>
                            <option value="not_started">Non commencé</option>
                            <option value="in_progress">En cours</option>
                            <option value="completed">Terminé</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* CARDS */}
            <div className="bg-white h-fit gap-12 pt-12 pb-[3rem] lg:pb-[5rem] flex justify-start flex-col mx-auto w-full xl:w-9/12 px-4 sm:px-6 md:px-10 xl:px-0 z-30">
                <div className="z-20 flex flex-wrap justify-center w-full gap-10 xl:gap-16">
                    {error && (
                        <div className="w-full text-center text-red-500">
                            {error}
                        </div>
                    )}
                    {projects.length === 0 ? (
                        <div className="flex flex-col items-center justify-center w-full gap-6 py-12">
                            <p className="text-xl text-center text-gray-600">
                                Aucun projet trouvé. Commencez par créer votre premier projet !
                            </p>
                            <Button 
                                variant="primary" 
                                text="Créer un projet"
                                onClick={handleCreateProject}
                            />
                        </div>
                    ) : filteredProjects.length === 0 ? (
                        <div className="w-full py-12 text-xl text-center text-gray-600">
                            Aucun projet ne correspond à vos critères de recherche.
                        </div>
                    ) : (
                        filteredProjects.map((project) => (
                            <Project
                                key={project._id}
                                id={project._id}
                                type={project.type}
                                name={project.name}
                                description={project.description}
                                img={project.type === 'image' ? "/chats.jpg" : project.type === 'audio' ? "/fruits.jpg" : "/fleurs.jpg"}
                                collaborators={project.collaborators}
                                dataset={project.dataset || []}
                                labels={project.labels || []}
                            />
                        ))
                    )}
                </div>

                {/* Statistiques globales */}
                {projects.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 p-6 mt-8 rounded-lg bg-gray-50 md:grid-cols-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-bleuElectrique">{projects.length}</p>
                            <p className="text-gray-600">Projets totaux</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-bleuElectrique">
                                {projects.filter(p => getProjectStatus(p) === 'completed').length}
                            </p>
                            <p className="text-gray-600">Projets terminés</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-bleuElectrique">
                                {projects.filter(p => getProjectStatus(p) === 'in_progress').length}
                            </p>
                            <p className="text-gray-600">Projets en cours</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-bleuElectrique">
                                {projects.reduce((acc, p) => acc + (p.dataset?.length || 0), 0)}
                            </p>
                            <p className="text-gray-600">Tâches totales</p>
                        </div>
                    </div>
                )}
            </div>
            <Footer isRegistration={false}/>
        </div>
    )
}

export default AllProjects
