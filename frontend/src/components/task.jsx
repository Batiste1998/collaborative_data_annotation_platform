import PropTypes from 'prop-types'
import { useAuth } from '../context/AuthContext'
import Name from '../components/name'
import Select from '../components/select'
import Button from '../components/button'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const Task = ({ 
    title,
    description,
    assignedTo,
    dueDate,
    priority,
    status = 'pending',
    availableUsers = [],
    onStatusChange,
    onAssign,
    onEdit,
    onDelete 
}) => {
    const { user } = useAuth()

    // Vérifier les permissions
    const canManageTask = () => {
        if (!user) return false
        return ['admin', 'manager'].includes(user.role)
    }

    const canUpdateStatus = () => {
        if (!user) return false
        if (canManageTask()) return true
        // Un annotateur ne peut mettre à jour que ses propres tâches
        if (assignedTo && user._id === assignedTo._id) {
            // Un annotateur ne peut pas marquer une tâche comme terminée
            if (status === 'completed') return false
            return true
        }
        return false
    }

    const getAvailableStatuses = () => {
        if (canManageTask()) {
            return [
                { value: 'pending', label: 'Non commencé' },
                { value: 'in_progress', label: 'En cours' },
                { value: 'completed', label: 'Terminé' }
            ]
        }
        // Pour les annotateurs
        return [
            { value: 'pending', label: 'Non commencé' },
            { value: 'in_progress', label: 'En cours' }
        ]
    }

    const getStatusDisplay = () => {
        switch (status) {
            case 'completed':
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

    const getPriorityDisplay = () => {
        const colors = {
            high: 'text-red-600',
            medium: 'text-yellow-600',
            low: 'text-green-600'
        }
        return colors[priority] || 'text-gray-600'
    }

    const statusInfo = getStatusDisplay()

    return(
        <div className="flex flex-col p-4 bg-white border rounded-lg shadow-sm">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                    <p className="mb-2 text-gray-600">{description}</p>
                </div>
                {canManageTask() && (
                    <div className="flex gap-2">
                        <Button 
                            variant="secondary"
                            text="Modifier"
                            onClick={onEdit}
                        />
                        <Button 
                            variant="danger"
                            text="Supprimer"
                            onClick={onDelete}
                        />
                    </div>
                )}
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-4">
                {/* Assignation */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-600">Assigné à:</span>
                    {assignedTo ? (
                        <Name name={assignedTo.username} />
                    ) : canManageTask() && (
                        <Select 
                            placeholder="Assigner" 
                            variant="primary" 
                            list={availableUsers}
                            onChange={onAssign}
                        />
                    )}
                </div>

                {/* Date d'échéance */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-600">Échéance:</span>
                    <span className="font-medium">
                        {format(new Date(dueDate), 'dd MMMM yyyy', { locale: fr })}
                    </span>
                </div>

                {/* Priorité */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-600">Priorité:</span>
                    <span className={`font-medium ${getPriorityDisplay()}`}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-between">
                {/* Statut */}
                <div className="flex items-center gap-2">
                    <img src={statusInfo.icon} alt={statusInfo.text} className="w-5 h-5" />
                    <span className={`font-semibold ${statusInfo.className}`}>
                        {statusInfo.text}
                    </span>
                </div>

                {/* Mise à jour du statut */}
                {canUpdateStatus() && (
                    <Select 
                        value={status}
                        onChange={onStatusChange}
                        variant="primary"
                        list={getAvailableStatuses()}
                    />
                )}
            </div>
        </div>
    )
}

Task.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    assignedTo: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
    }),
    dueDate: PropTypes.string.isRequired,
    priority: PropTypes.oneOf(['low', 'medium', 'high']).isRequired,
    status: PropTypes.oneOf(['pending', 'in_progress', 'completed']),
    availableUsers: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    })),
    onStatusChange: PropTypes.func,
    onAssign: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
}

Task.defaultProps = {
    status: 'pending'
}

export default Task
