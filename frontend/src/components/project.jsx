import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import Name from '../components/name'
import Button from '../components/button'
import { deleteProject } from '../services/projectService'

const Project = ({ id, members, img, name, description }) => {
    const navigate = useNavigate()
    return (
       <div className="transition-transform duration-200 hover:scale-105">
            <img src={img} className="w-[17rem] lg:w-[20rem] xl:w-[22rem] h-[15rem] rounded-tr-3xl rounded-tl-3xl object-cover"/>
            <div className="bg-white shadow-lg w-[17rem] lg:w-[20rem] xl:w-[22rem] rounded-br-3xl rounded-bl-3xl p-6">
            <div className="flex flex-col gap-4">
                <p className="text-xl font-bold text-black font-Roboto xl:text-2xl">{name}</p>
                <p className="text-black font-Roboto">{description}</p>
                <ul className="flex flex-wrap gap-1 sm:gap-2">
                {members.map((member, index) => (
                    <li
                        key={index}>
                        <Name name={member}/>
                    </li>
                ))}
                </ul>
                <div className="flex gap-2 md:mt-2">
                    <Button 
                        variant="primary" 
                        text="Edit" 
                        onClick={() => navigate(`/dashboard/${id}`)}
                    />
                    <Button 
                        variant="secondary" 
                        text="Delete" 
                        onClick={async () => {
                            if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
                                try {
                                    await deleteProject(id)
                                    window.location.reload()
                                } catch (err) {
                                    alert(`Erreur lors de la suppression du projet : ${err.message}`)
                                }
                            }
                        }}
                    />
                </div>
            </div>
            </div>
        </div>
    )
}

Project.propTypes = {
    id: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.string).isRequired,
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

export default Project
