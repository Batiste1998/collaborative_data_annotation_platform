import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/footer'
import Decoration from '../components/decoration'
import Input from '../components/input'
import Select from '../components/select'
import Button from '../components/button'
import Name from '../components/name'
import Task from '../components/task'
import Message from '../components/message'
import { getProject, updateProject } from '../services/projectService'


const DashboardProjectPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    })

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await getProject(id)
                setProject(data)
                setFormData({
                    name: data.name,
                    description: data.description,
                })
            } catch (err) {
                setError(err.message)
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

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await updateProject(id, formData)
            const updatedProject = await getProject(id)
            setProject(updatedProject)
            alert('Projet mis à jour avec succès')
            navigate('/allprojects')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-2xl">Chargement...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl text-red-500">{error}</div>
            </div>
        )
    }

    if (!project) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl">Projet non trouvé</div>
            </div>
        )
    }

    return(
        <div className="w-screen overflow-hidden">
            <Header/>
            <div className="bg-bleuElectrique h-[92vh] sm:h-screen lg:h-[70vw] xl:h-screen">
                <div className="flex flex-col items-center w-full gap-5 px-3 sm:w-3/4 py-14 sm:px-0">
                    <h1 className="w-full text-6xl text-white font-Gelasio lg:text-7xl xl:text-8xl sm:w-4/6 xl:w-4/6">Edit a new project</h1>
                    <h2 className="w-full text-6xl text-white font-Gelasio lg:text-7xl xl:text-8xl line-clamp-1 sm:w-4/6 xl:w-4/6">{project.name}</h2>
                    <p className="w-full text-lg text-white font-Gelasio xl:text-xl sm:w-4/6 xl:w-4/6">{project.description}</p>
                    <div className="z-10 w-full sm:w-4/6 xl:w-4/6">
                        <ul className="flex flex-wrap gap-2 xl:gap-4">
                        {project.collaborators.map((collab, index) => (
                            <li
                                key={index}>
                                <Name name={collab.user.username}/>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
                <Decoration className="absolute right-0"/>
            </div>
            {/* PROJECT's DATA */}
            <div className="bg-white h-fit gap-6 pt-12 pb-[3rem] md:pb-[5rem] xl:pb-[8rem] flex justify-center sm:justify-start lg:justify-evenly flex-wrap px-6 lg:px-0">
                <div className="flex flex-col gap-8 mb-14 lg:mb-0">
                    <Input 
                        text="Project's name" 
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    <Input 
                        text="Project's description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                    <Select label="Project's memnbers" placeholder="Project's members" variant={"primary"} list={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                    <div className='flex justify-start gap-3 sm:justify-end'>
                        <Button 
                            variant="primary" 
                            text={loading ? "Mise à jour..." : "Send data"}
                            onClick={handleSubmit}
                            disabled={loading}
                        />
                        <Button 
                            variant="secondary" 
                            text="Import a file"
                            disabled={loading}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-3 sm:gap-6 before:content-[""] before:absolute before:bg-violetBordure before:opacity-40 before:w-screen before:h-[125%] before:z-0 z-10 relative before:rounded-bl-3xl before:translate-y-[-3rem] max-w-[25rem] xl:max-w-[45rem]'>
                    <h2 className="pl-8 mb-2 text-2xl font-bold text-black xl:pl-20 font-Roboto ">Current project data</h2>
                    <p className="pl-8 text-xl text-black xl:pl-20 font-Roboto">{project.name}</p>
                    <p className="pl-8 text-xl text-black xl:pl-20 font-Roboto">{project.description}</p>
                    <div className="z-10 pl-8 xl:pl-20">
                        <ul className="flex flex-wrap gap-3 sm:gap-4">
                        {project.collaborators.map((collab, index) => (
                            <li
                                key={index}>
                                <Name name={collab.user.username}/>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
            </div>
            {/* TASKS */}
            <div className="bg-white h-fit gap-12 pt-12 pb-[3rem] lg:pb-[5rem] flex justify-start flex-col mx-auto w-full xl:w-9/12 px-4 sm:px-6 md:px-10 xl:px-0">
                <h2 className="text-xl font-bold text-black font-Roboto">Tasks</h2>
                <div className="flex flex-wrap w-full gap-10 lg:gap-16">
                    <Task image="../../public/chat1.jpg" members={["Isabelle"]} finished/>
                    <Task image="../../public/chat2.jpg" members={["Isabelle", "Jean"]} checked/>
                    <Task image="../../public/chat3.jpg" members={["Batiste"]} finished checked/>
                    <Task image="../../public/chat4.jpg" members={[]}/>
                    <Task image="../../public/chat5.jpg" members={["Marie", "Clément", "Cathy"]}/>
                    <Task image="../../public/chat6.jpg" members={["Romain"]}/>
                </div>
                <Button variant="secondary" text="Export anonations"/>
            </div>
            {/* CHAT */}
            <div className="bg-white h-fit gap-10 md:pt-12 pb-[5rem] xl:pb-[8rem] flex justify-start flex-col mx-auto w-full xl:w-9/12 px-4 sm:px-10 xl:px-0">
                <h2 className="text-xl font-bold text-black font-Roboto">Chat</h2>
                <div className="flex flex-col gap-4 h-[35rem] overflow-auto pb-5 scrollable-container">
                    <Message member="Julie"/>
                    <Message member="Julie"/>
                    <Message member="Julie"/>
                    <Message member="Julie"/>
                    <Message member="Julie"/>
                    <Message member="Julie"/>
                    <Message member="Julie"/>
                    <Message member="Julie"/>
                </div>
                <h3 className="text-xl font-bold text-black font-Roboto">Votre message</h3>
                <div className="w-[95%] sm:w-[85%] xl:w-[75%] flex flex-col gap-8">
                    <textarea className="bg-white w-full shadow-lg h-[15rem] mt-1 ml-1 p-4 sm:p-8 flex flex-col gap-4 rounded-3xl"/>
                    <div className="flex justify-end w-full">
                        <Button variant="primary" text="Envoyer"/>
                    </div>
                </div>
            </div>
            <Footer isRegistration={false}/>
        </div>
    )
}

export default DashboardProjectPage
