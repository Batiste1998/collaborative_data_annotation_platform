import Header from '../components/header'
import Footer from '../components/footer'
import Registration from '../components/registration'
import Decoration from '../components/decoration'
import Input from '../components/input'


const CreateProjectPage = () => {
    return(
        <div>
            <Header/>
            <div className="bg-bleuElectrique h-screen">
                <div className="w-3/4 py-32 flex justify-evenly">
                    <h1 className="font-Gelasio text-8xl text-white w-3/6">Create a new project</h1>
                </div>
                <Decoration className="absolute right-0"/>
            </div>
            <div className="bg-white h-screen gap-6 py-12 flex justify-evenly">
                <div className="flex flex-col gap-8">
                    <Input text="Project's name"/>
                    <Input text="Project's description"/>
                    <Input text="Project's members"/>
                </div>
                <div className="flex flex-col gap-8">
                    <Input text="Project's name"/>
                    <Input text="Project's description"/>
                    <Input text="Project's members"/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default CreateProjectPage