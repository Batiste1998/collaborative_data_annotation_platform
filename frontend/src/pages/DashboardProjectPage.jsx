import Header from '../components/header'
import Footer from '../components/footer'
import Registration from '../components/registration'
import Decoration from '../components/decoration'
import Input from '../components/input'
import Select from '../components/select'
import Button from '../components/button'
import Name from '../components/name'
import Task from '../components/task'
import Message from '../components/message'


const DashboardProjectPage = ({name, members, description}) => {
    return(
        <div className="overflow-hidden w-screen">
            <Header/>
            <div className="bg-bleuElectrique h-[92vh] sm:h-screen lg:h-[70vw] xl:h-screen">
                <div className="w-full sm:w-3/4 py-14 flex items-center gap-5 flex-col px-3 sm:px-0">
                    <h1 className="font-Gelasio text-6xl lg:text-7xl xl:text-8xl text-white w-full sm:w-4/6 xl:w-4/6">Edit a new project</h1>
                    <h2 className="font-Gelasio text-6xl lg:text-7xl xl:text-8xl line-clamp-1 text-white w-full sm:w-4/6 xl:w-4/6">{name}</h2>
                    <p className="font-Gelasio text-lg xl:text-xl text-white w-full sm:w-4/6 xl:w-4/6">Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page.</p>
                    <div className="w-full sm:w-4/6 xl:w-4/6 z-10">
                        <ul className="flex gap-2 xl:gap-4 flex-wrap">
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
            {/* PROJECT's DATA */}
            <div className="bg-white h-fit gap-6 pt-12 pb-[3rem] md:pb-[5rem] xl:pb-[8rem] flex justify-center sm:justify-start lg:justify-evenly flex-wrap px-6 lg:px-0">
                <div className="flex flex-col gap-8 mb-14 lg:mb-0">
                    <Input text="Project's name" placeholder={name} />
                    <Input placeholder={description} text="Project's description"/>
                    <Select label="Project's memnbers" placeholder="Project's members" variant={"primary"} list={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                    <div className='flex justify-start sm:justify-end gap-3'>
                        <Button variant={"primary"} text={"Send data"} link={""}/>
                        <Button variant={"secondary"} text={"Import a file"} link={""}/>
                    </div>
                </div>
                <div className='flex flex-col gap-3 sm:gap-6 before:content-[""] before:absolute before:bg-violetBordure before:opacity-40 before:w-screen before:h-[125%] before:z-0 z-10 relative before:rounded-bl-3xl before:translate-y-[-3rem] max-w-[25rem] xl:max-w-[45rem]'>
                    <h2 className="pl-8 xl:pl-20 mb-2 font-Roboto text-black text-2xl font-bold ">Current project data</h2>
                    <p className="pl-8 xl:pl-20 font-Roboto text-black text-xl">{name}</p>
                    <p className="pl-8 xl:pl-20 font-Roboto text-black text-xl">{description}</p>
                    <div className="pl-8 xl:pl-20 z-10">
                        <ul className="flex gap-3 sm:gap-4 flex-wrap">
                        {members.map((member, index) => (
                            <li
                                key={index}>
                                <Name name={member}/>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
            </div>
            {/* TASKS */}
            <div className="bg-white h-fit gap-12 pt-12 pb-[3rem] lg:pb-[5rem] flex justify-start flex-col mx-auto w-full xl:w-9/12 px-4 sm:px-6 md:px-10 xl:px-0">
                <h2 className="text-xl font-Roboto text-black font-bold">Tasks</h2>
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
                <h2 className="text-xl font-Roboto text-black font-bold">Chat</h2>
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
                <h3 className="text-xl font-Roboto text-black font-bold">Votre message</h3>
                <div className="w-[95%] sm:w-[85%] xl:w-[75%] flex flex-col gap-8">
                    <textarea className="bg-white w-full shadow-lg h-[15rem] mt-1 ml-1 p-4 sm:p-8 flex flex-col gap-4 rounded-3xl"/>
                    <div className="w-full flex justify-end">
                        <Button variant="primary" text="Envoyer"/>
                    </div>
                </div>
            </div>
            <Footer isRegistration={false}/>
        </div>
    )
}

export default DashboardProjectPage