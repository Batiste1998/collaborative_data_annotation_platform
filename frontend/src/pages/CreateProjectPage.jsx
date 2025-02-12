import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/footer'
import Decoration from '../components/decoration'
import Input from '../components/input'
import Select from '../components/select'
import Button from '../components/button'
import { createProject } from '../services/projectService'


const CreateProjectPage = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: 'image',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleInputChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async () => {
        if (!formData.name || !formData.description) {
            setError('Veuillez remplir tous les champs obligatoires')
            return
        }

        setLoading(true)
        setError(null)

        try {
            await createProject(formData)
            navigate('/allprojects')
        } catch (err) {
            setError(err.message)
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
                    <Input 
                        text="Project's name" 
                        placeholder="Project's name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    <Input 
                        text="Project's description" 
                        placeholder="Project's description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                    <Select label="" placeholder="Project's members" variant={"primary"} list={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                    {error && (
                        <p className="mt-2 text-sm text-red-500">{error}</p>
                    )}
                    <div className='flex justify-start gap-3 sm:justify-end'>
                        <Button 
                            variant="primary" 
                            text={loading ? "Création..." : "Create project"}
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
                <div className='flex flex-col gap-8 before:content-[""] before:absolute before:bg-violetBordure before:opacity-40 before:w-screen before:h-[120%]  sm:before:h-[125%] before:z-0 z-10 relative before:rounded-bl-3xl before:translate-y-[-3rem]'>
                    <Select label={"Task 1"} placeholder={"Project’s members"} variant={"secondary"} list={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                    <Select label={"Task 2"} placeholder={"Project’s members"} variant={"secondary"} list={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                    <Select label={"Task 3"} placeholder={"Project's members"} variant={"secondary"} list={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                    <Select label={"Task 4"} placeholder={"Project's members"} variant={"secondary"} list={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                    <Select label={"Task 5"} placeholder={"Project's members"} variant={"secondary"} list={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                    <Select label={"Task 6"} placeholder={"Project's members"} variant={"secondary"} list={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                </div>
            </div>
            <Footer isRegistration={false}/>
        </div>
    )
}

export default CreateProjectPage
