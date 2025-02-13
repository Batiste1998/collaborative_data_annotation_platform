import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/footer'
import Button from '../components/button'
import Project from '../components/project'
import { getAllProjects } from '../services/projectService'

const ManagerDashboard = () => {
    const navigate = useNavigate()
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getAllProjects()
                // Filtrer les projets où l'utilisateur est manager
                const managerProjects = data.filter(project => 
                    project.collaborators.some(collab => 
                        collab.role === 'manager'
                    )
                )
                setProjects(managerProjects)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProjects()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-2xl">Chargement...</div>
            </div>
        )
    }

    return (
        <div className="w-screen overflow-hidden">
            <Header />
            <div className="bg-bleuElectrique h-[92vh] sm:h-screen lg:h-[70vw] xl:h-screen">
                <div className="flex flex-col items-center w-full gap-5 px-3 md:w-3/4 py-14 sm:px-0">
                    <h1 className="w-full text-6xl text-white sm:w-4/6 xl:w-4/6 font-Gelasio lg:text-7xl xl:text-8xl">
                        Manager Dashboard
                    </h1>
                    <p className="w-full text-lg text-white sm:w-4/6 xl:w-4/6 font-Gelasio xl:text-xl">
                        Gérez vos projets et vos équipes d'annotateurs
                    </p>
                    <div className="flex flex-wrap justify-start w-full gap-8 sm:w-4/6 xl:w-4/6">
                        <Button
                            variant="primary"
                            text="Créer un projet"
                            onClick={() => navigate('/create')}
                        />
                        <Button
                            variant="secondary"
                            text="Gérer les annotateurs"
                            onClick={() => navigate('/annotators')}
                        />
                    </div>
                </div>
            </div>

            {/* Liste des projets */}
            <div className="bg-white h-fit gap-12 pt-12 pb-[3rem] lg:pb-[5rem] flex justify-start flex-col mx-auto w-full xl:w-9/12 px-4 sm:px-6 md:px-10 xl:px-0 z-30">
                <h2 className="text-2xl font-bold">Vos projets</h2>
                <div className="z-20 flex flex-wrap justify-center w-full gap-10 xl:gap-16">
                    {error && (
                        <div className="w-full text-center text-red-500">
                            {error}
                        </div>
                    )}
                    {projects.length === 0 ? (
                        <div className="w-full text-xl text-center">
                            Aucun projet trouvé. Créez votre premier projet !
                        </div>
                    ) : (
                        projects.map((project) => (
                            <Project
                                key={project._id}
                                id={project._id}
                                type={project.type}
                                name={project.name}
                                description={project.description}
                                img={project.type === 'image' ? "/chats.jpg" : project.type === 'audio' ? "/fruits.jpg" : "/fleurs.jpg"}
                                owner={project.owner}
                                collaborators={project.collaborators}
                                dataset={project.dataset}
                                labels={project.labels}
                            />
                        ))
                    )}
                </div>

                {/* Section des statistiques */}
                <div className="mt-12">
                    <h2 className="mb-6 text-2xl font-bold">Statistiques des projets</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="mb-2 text-lg font-semibold">Tâches en cours</h3>
                            <p className="text-3xl font-bold text-bleuElectrique">
                                {projects.reduce((acc, project) => 
                                    acc + project.dataset.filter(item => 
                                        item.status === 'in_progress'
                                    ).length, 0
                                )}
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="mb-2 text-lg font-semibold">Tâches terminées</h3>
                            <p className="text-3xl font-bold text-roseBordure">
                                {projects.reduce((acc, project) => 
                                    acc + project.dataset.filter(item => 
                                        item.status === 'annotated'
                                    ).length, 0
                                )}
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="mb-2 text-lg font-semibold">Annotateurs actifs</h3>
                            <p className="text-3xl font-bold text-violetBordure">
                                {new Set(projects.flatMap(project => 
                                    project.collaborators
                                        .filter(collab => collab.role === 'annotator')
                                        .map(collab => collab.user._id)
                                )).size}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer isRegistration={false} />
        </div>
    )
}

export default ManagerDashboard
