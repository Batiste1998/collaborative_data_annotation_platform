import Header from '../components/header'
import Footer from '../components/footer'
import Decoration from '../components/decoration'
import Button from '../components/button'
import Project from '../components/project'


const AllProjects = () => {
    return(
        <div className="overflow-hidden w-screen">
            <Header/>
            <div className="bg-bleuElectrique h-[92vh] sm:h-screen lg:h-[70vw] xl:h-screen">
                <div className="w-full md:w-3/4 py-14 flex items-center gap-5 flex-col px-3 sm:px-0">
                    <h1 className="w-full sm:w-4/6 xl:w-4/6 font-Gelasio text-6xl lg:text-7xl xl:text-8xl text-white">Your projects</h1>
                    <p className="w-full sm:w-4/6 xl:w-4/6 font-Gelasio text-lg xl:text-xl text-white">Welcome to your project area. Consult the list of current projects and follow their progress.</p>
                    <div className="w-full sm:w-4/6 xl:w-4/6 flex justify-start">
                        <Button variant="secondary" text="Create a project" />
                    </div>
                </div>
                <Decoration className="absolute right-0"/>
            </div>
            {/* CARDS */}
            <div className="bg-white h-fit gap-12 pt-12 pb-[3rem] lg:pb-[5rem] flex justify-start flex-col mx-auto w-full xl:w-9/12 px-4 sm:px-6 md:px-10 xl:px-0 z-30">
                <div className="flex flex-wrap w-full gap-10 xl:gap-16 z-20 justify-center">
                    <Project description="Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page." name="Cat's project" img="../../public/chats.jpg" members={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                    <Project description="Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page." name="Fruit's project" img="../../public/fruits.jpg" members={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                    <Project description="Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page." name="Fleur's project" img="../../public/fleurs.jpg" members={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                    <Project description="Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page." name="Cat's project" img="../../public/chats.jpg" members={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                    <Project description="Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page." name="Fruit's project" img="../../public/fruits.jpg" members={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                    <Project description="Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page." name="Fleur's project" img="../../public/fleurs.jpg" members={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                </div>
            </div>
            <Footer isRegistration={false}/>
        </div>
    )
}

export default AllProjects