import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../context/AuthContext'
import Name from '../components/name'
import Button from '../components/button'
import { deleteProject } from '../services/projectService'

const Project = ({ 
  id, 
  type = 'image',
  name, 
  description, 
  collaborators = [], 
  dataset = [], 
  labels = [],
  img,
  owner
}) => {
  const navigate = useNavigate()
  const { user } = useAuth()

  // Calcul des statistiques
  const totalItems = dataset.length
  const completedItems = dataset.filter(item => item.status === 'annotated').length
  const inProgressItems = dataset.filter(item => item.status === 'in_progress').length
  const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

  // Grouper les collaborateurs par rôle
  const collaboratorsByRole = collaborators.reduce((acc, collab) => {
    const role = collab.role || 'annotator'
    if (!acc[role]) acc[role] = []
    acc[role].push(collab.user.username)
    return acc
  }, {})

  // Vérifier les permissions de l'utilisateur
  const canEditProject = () => {
    if (!user) return false
    if (user.role === 'admin') return true
    if (user.role === 'manager' && collaborators.some(
      c => c.user._id === user._id && c.role === 'manager'
    )) return true
    return owner?._id === user._id
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'image':
        return '🖼️'
      case 'text':
        return '📝'
      case 'audio':
        return '🎵'
      default:
        return '📁'
    }
  }

  return (
    <div className="transition-transform duration-200 hover:scale-105">
      <div className="relative">
        <img 
          src={img} 
          className="w-[17rem] lg:w-[20rem] xl:w-[22rem] h-[15rem] rounded-tr-3xl rounded-tl-3xl object-cover"
          alt={name}
        />
        <div className="absolute px-3 py-1 bg-white rounded-full shadow-md top-4 right-4">
          <span className="text-lg" title={`Type: ${type}`}>{getTypeIcon(type)}</span>
        </div>
      </div>
      <div className="bg-white shadow-lg w-[17rem] lg:w-[20rem] xl:w-[22rem] rounded-br-3xl rounded-bl-3xl p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <p className="text-xl font-bold text-black font-Roboto xl:text-2xl">{name}</p>
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-gray-600">{progressPercentage}%</span>
              <div className="w-20 h-2 mt-1 bg-gray-200 rounded-full">
                <div 
                  className="h-full rounded-full bg-bleuElectrique"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <p className="text-black font-Roboto">{description}</p>

          {/* Statistiques */}
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="p-2 text-center rounded bg-gray-50">
              <p className="font-bold">{totalItems}</p>
              <p className="text-gray-600">Total</p>
            </div>
            <div className="p-2 text-center rounded bg-gray-50">
              <p className="font-bold">{inProgressItems}</p>
              <p className="text-gray-600">En cours</p>
            </div>
            <div className="p-2 text-center rounded bg-gray-50">
              <p className="font-bold">{completedItems}</p>
              <p className="text-gray-600">Terminé</p>
            </div>
          </div>

          {/* Labels */}
          {labels.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {labels.map((label, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-sm rounded-full"
                  style={{ 
                    backgroundColor: label.color || '#000000',
                    color: '#ffffff'
                  }}
                >
                  {label.name}
                </span>
              ))}
            </div>
          )}

          {/* Propriétaire */}
          {owner && (
            <div>
              <p className="mb-1 text-sm text-gray-600">Propriétaire</p>
              <Name name={owner.username} />
            </div>
          )}

          {/* Collaborateurs par rôle */}
          {Object.entries(collaboratorsByRole).map(([role, users]) => (
            <div key={role}>
              <p className="mb-1 text-sm text-gray-600 capitalize">{role}s</p>
              <ul className="flex flex-wrap gap-1 sm:gap-2">
                {users.map((username, index) => (
                  <li key={index}>
                    <Name name={username}/>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {canEditProject() && (
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
          )}
        </div>
      </div>
    </div>
  )
}

Project.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['image', 'text', 'audio']),
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }),
  collaborators: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    }),
    role: PropTypes.oneOf(['manager', 'annotator'])
  })),
  dataset: PropTypes.arrayOf(PropTypes.shape({
    status: PropTypes.oneOf(['pending', 'in_progress', 'annotated'])
  })),
  labels: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string
  }))
}

export default Project
