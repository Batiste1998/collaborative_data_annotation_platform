import Header from '../components/header'
import Footer from '../components/footer'
import Registration from '../components/registration'
import Decoration from '../components/decoration'
import Input from '../components/input'
import Select from '../components/select'
import Button from '../components/button'


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
            <div className="bg-white h-fit gap-6 pt-12 pb-[20rem] flex justify-evenly">
                <div className="flex flex-col gap-8">
                    <Input text="Project's name"/>
                    <Input text="Project's description"/>
                    <Select label="" placeholder="Project's members" variant={"primary"} list={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                    <div className='flex justify-end gap-3'>
                        <Button variant={"primary"} text={"Create project"} link={""}/>
                        <Button variant={"secondary"} text={"Import a file"} link={""}/>
                    </div>
                </div>
                <div className='flex flex-col gap-8 before:content-[""] before:absolute before:bg-violetBordure before:opacity-40 before:w-screen before:h-[125%] before:z-0 z-10 relative before:rounded-bl-3xl before:translate-y-[-3rem]'>
                    <Select label={"Task 1"} placeholder={"Project’s members"} variant={"secondary"} list={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                    <Select label={"Task 2"} placeholder={"Project’s members"} variant={"secondary"} list={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                    <Select label={"Task 3"} placeholder={"Project's members"} variant={"secondary"} list={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                    <Select label={"Task 4"} placeholder={"Project's members"} variant={"secondary"} list={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                    <Select label={"Task 5"} placeholder={"Project's members"} variant={"secondary"} list={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                    <Select label={"Task 6"} placeholder={"Project's members"} variant={"secondary"} list={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default CreateProjectPage