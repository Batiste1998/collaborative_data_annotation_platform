import Header from '../components/header'
import Footer from '../components/footer'
import Registration from '../components/registration'
import Decoration from '../components/decoration'
import Input from '../components/input'
import Select from '../components/select'
import Button from '../components/button'
import Name from '../components/name'


const DashboardProjectPage = ({name, members, description}) => {
    return(
        <div className="overflow-hidden w-screen">
            <Header/>
            <div className="bg-bleuElectrique h-screen">
                <div className="w-3/4 py-14 flex items-center gap-5 flex-col">
                    <h1 className="font-Gelasio text-8xl text-white w-3/6">Edit a new project</h1>
                    <h2 className="font-Gelasio text-8xl text-white w-3/6">{name}</h2>
                    <p className="font-Gelasio text-xl text-white w-3/6">Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page.</p>
                    <div className="w-3/6">
                        <ul className="flex gap-4 flex-wrap">
                        {members.map((member, index) => (
                            <li
                                key={index}>
                                <Name name={member}/>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
                <Decoration className="absolute right-0"/>
            </div>
            <div className="bg-white h-fit gap-6 pt-12 pb-[20rem] flex justify-evenly">
                <div className="flex flex-col gap-8">
                    <Input text="Project's name" placeholder={name} />
                    <Input placeholder={description} text="Project's description"/>
                    <Select label="Project's memnbers" placeholder="Project's members" variant={"primary"} list={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
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
            <Footer isRegistration={false}/>
        </div>
    )
}

export default DashboardProjectPage