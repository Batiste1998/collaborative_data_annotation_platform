import Header from '../components/header'
import Footer from '../components/footer'
import Decoration from '../components/decoration'
import Button from '../components/button'
import Project from '../components/project'
import { useAuth } from '../context/AuthContext'

const HomePage = () => {
  const { isAuthenticated } = useAuth()
  const projects = [
    {
      name: "Cat's project",
      description:
        'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page.',
      img: '../../public/chats.jpg',
      members: [
        'Isabelle',
        'Nicolas',
        'Clément',
        'Virginie',
        'Batiste',
        'Julie',
      ],
    },
    {
      name: "Fruit's project",
      description:
        'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page.',
      img: '../../public/fruits.jpg',
      members: [
        'Isabelle',
        'Nicolas',
        'Clément',
        'Virginie',
        'Batiste',
        'Julie',
      ],
    },
    {
      name: "Fleur's project",
      description:
        'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page.',
      img: '../../public/fleurs.jpg',
      members: [
        'Isabelle',
        'Nicolas',
        'Clément',
        'Virginie',
        'Batiste',
        'Julie',
      ],
    },
    {
      name: "Cat's project",
      description:
        'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page.',
      img: '../../public/chats.jpg',
      members: [
        'Isabelle',
        'Nicolas',
        'Clément',
        'Virginie',
        'Batiste',
        'Julie',
      ],
    },
  ]
  return (
    <div className="w-screen overflow-hidden">
      <Header />
      <div className="bg-bleuElectrique h-[92vh] sm:h-screen lg:h-[70vw] xl:h-screen">
        <div className="flex flex-col items-center w-full gap-5 px-3 md:w-3/4 py-14 sm:px-0">
          <h1 className="w-full text-5xl text-white sm:w-4/6 xl:w-4/6 font-Gelasio sm:text-6xl lg:text-7xl xl:text-8xl">
            Collaborative data PROJECT
          </h1>
          <p className="w-full text-lg text-white sm:w-4/6 xl:w-4/6 font-Gelasio xl:text-xl">
            Make the companies’daily easier
          </p>
          {!isAuthenticated() ? (
            <div className="flex flex-wrap justify-start w-full gap-8 sm:w-4/6 xl:w-4/6">
              <Button variant="primary" text="Registration" link="/registrer" />
              <Button variant="secondary" text="Connexion" link="/login" />
            </div>
          ) : (
            <div className="flex flex-wrap justify-start w-full gap-8 sm:w-4/6 xl:w-4/6">
              <Button variant="primary" text="Accéder à mon espace" link="/dashboard" />
            </div>
          )}
        </div>
        <Decoration className="absolute right-0" />
      </div>
      {/* CARDS */}
      <div className="bg-white h-fit gap-8 sm:gap-10 md:gap-5 lg:gap-12 pt-6 pb-[3rem] flex justify-start flex-col mx-auto w-full xl:w-9/12 px-4 sm:px-6 md:px-10 xl:px-0 z-30">
        <h2 className='font-Gelasio w-fit text-4xl sm:text-5xl lg:text-6xl xl:text-7xl my-4 md:my-[1rem] lg:mt-[2rem] xl:my-[3rem] relative before:content-[""] before:absolute before:opacity-40 before:bg-bleuElectrique before:w-[103%] before:bottom-0 before:h-[1.5rem] before:sm:h-[2rem] before:md:h-[2.2rem] before:lg:h-[2.5rem] before:translate-y-2 before:sm:translate-y-4'>
          Your projects
        </h2>
        <div className="z-20 flex justify-start w-full gap-10 p-2 pt-0 overflow-auto xl:gap-16 md:p-5">
          {projects.slice(0, 3).map((project, index) => (
            <Project
              key={index}
              description={project.description}
              name={project.name}
              img={project.img}
              members={project.members}
            />
          ))}
        </div>
      </div>
      {/* BUTTONS */}
      {isAuthenticated() && (
        <div className="flex justify-start sm:justify-center mb-[3rem] xl:mb-[5rem] gap-3 sm:gap-8 flex-wrap pl-8 sm:pl-0">
          <Button variant="primary" text="See all projects" link="/allprojects" />
          <Button variant="secondary" text="Create a project" link="/create" />
        </div>
      )}
      <Footer isRegistration={false} />
    </div>
  )
}

export default HomePage
