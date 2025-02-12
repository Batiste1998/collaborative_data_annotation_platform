import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/footer'
import Decoration from '../components/decoration'
import Button from '../components/button'
import Project from '../components/project'
import { getAllProjects } from '../services/projectService'


const AllProjects = () => {
    const navigate = useNavigate()
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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
                    <h1 className="w-full text-6xl text-white sm:w-4/6 xl:w-4/6 font-Gelasio lg:text-7xl xl:text-8xl">Your projects</h1>
                    <p className="w-full text-lg text-white sm:w-4/6 xl:w-4/6 font-Gelasio xl:text-xl">Welcome to your project area. Consult the list of current projects and follow their progress.</p>
                    <div className="flex justify-start w-full sm:w-4/6 xl:w-4/6">
                        <Button 
                            variant="secondary" 
                            text="Create a project" 
                            onClick={handleCreateProject}
                        />
                    </div>
                </div>
                <Decoration className="absolute right-0"/>
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
                        <div className="w-full text-xl text-center">
                            Aucun projet trouvé. Créez votre premier projet !
                        </div>
                    ) : (
                        projects.map((project) => (
                            <Project
                                key={project._id}
                                description={project.description}
                                name={project.name}
                                img={project.type === 'image' ? "../../public/chats.jpg" : "../../public/fruits.jpg"}
                                members={project.collaborators.map(collab => collab.user.username)}
                                onClick={() => navigate(`/dashboard/${project._id}`)}
                            />
                        ))
                    )}
                </div>
            </div>
            <Footer isRegistration={false}/>
        </div>
    )
}

export default AllProjects
