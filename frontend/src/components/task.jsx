import PropTypes from 'prop-types'
import { useAuth } from '../context/AuthContext'
import Name from '../components/name'
import Select from '../components/select'

const Task = ({ image, members, status = 'pending', onAssign }) => {
    const { user } = useAuth()

    // Vérifier si l'utilisateur peut assigner des membres
    const canAssignMembers = () => {
        if (!user) return false
        return ['admin', 'manager'].includes(user.role)
    }

    const getStatusDisplay = () => {
        switch (status) {
            case 'annotated':
                return {
                    icon: "/check_vert.svg",
                    text: "Terminé",
                    className: "text-green-600"
                }
            case 'in_progress':
                return {
                    icon: "/check_bleu.svg",
                    text: "En cours",
                    className: "text-blue-600"
                }
            default:
                return {
                    icon: "/croix.svg",
                    text: "Non commencé",
                    className: "text-red-600"
                }
        }
    }

    const statusInfo = getStatusDisplay()

    return(
        <div className="flex flex-col w-fit">
            <img 
                className="mb-6 rounded-3xl min-w-[10rem] w-[14rem] sm:w-[15rem] md:w-[19rem] lg:w-[25rem] h-[17rem] object-cover" 
                src={image}
                alt="Tâche"
            />
            <div className="flex gap-5 flex-wrap min-w-[10rem] w-[14rem] sm:w-[15rem] md:w-[19rem] lg:w-[25rem]">
                {/* Liste des membres assignés */}
                {members.length > 0 && (
                    <ul className="flex flex-wrap gap-4">
                        {members.map((member, index) => (
                            <li key={index}>
                                <Name name={member}/>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Statut de la tâche */}
                <div className="flex items-center gap-2">
                    <img src={statusInfo.icon} alt={statusInfo.text} />
                    <p className={`font-semibold ${statusInfo.className}`}>
                        {statusInfo.text}
                    </p>
                </div>

                {/* Assignation de membres */}
                {members.length === 0 && canAssignMembers() && (
                    <Select 
                        placeholder="Assigner un membre" 
                        variant="primary" 
                        list={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}
                        onChange={onAssign}
                    />
                )}
            </div>
        </div>
    )
}

Task.propTypes = {
    image: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.oneOf(['pending', 'in_progress', 'annotated']),
    onAssign: PropTypes.func
}

Task.defaultProps = {
    members: [],
    status: 'pending'
}

export default Task
