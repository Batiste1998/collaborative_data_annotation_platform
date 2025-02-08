import Header from '../components/header'
import Footer from '../components/footer'
import Registration from '../components/registration'
import Decoration from '../components/decoration'
import Input from '../components/input'
import Select from '../components/select'
import Button from '../components/button'


const CreateProjectPage = () => {
    return(
        <div className="overflow-hidden w-screen">
            <Header/>
            <div className="bg-bleuElectrique h-screen lg:h-[70vw] xl:h-screen">
                <div className="w-3/4 py-20 lg:py-28 xl:py-32 flex justify-evenly">
                    <h1 className="font-Gelasio text-6xl lg:text-7xl xl:text-8xl text-white w-5/6 md:w-3/6">Create a new project</h1>
                </div>
                <Decoration className="absolute right-0"/>
            </div>
            <div className="bg-white h-fit gap-6 pt-12 pb-[8rem] lg:pb-[10rem] xl:pb-[15rem] flex lg:justify-evenly flex-wrap lg:flex-nowrap px-6 lg:px-0 justify-center sm:justify-start">
                <div className="flex flex-col gap-8 mb-14 lg:mb-0">
                    <Input text="Project's name" placeholder="Project's name"/>
                    <Input text="Project's description" placeholder="Project's description"/>
                    <Select label="" placeholder="Project's members" variant={"primary"} list={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                    <div className='flex justify-start sm:justify-end gap-3'>
                        <Button variant={"primary"} text={"Create project"} link={""}/>
                        <Button variant={"secondary"} text={"Import a file"} link={""}/>
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