import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../context/AuthContext'

const RoleRoute = ({ children, allowedRoles }) => {
    const { user, isAuthenticated, loading } = useAuth()

    if (loading) {
        return <div>Chargement...</div>
    }

    if (!isAuthenticated()) {
        return <Navigate to="/login" />
    }

    // Rediriger vers le dashboard approprié si l'utilisateur n'a pas le bon rôle
    if (!allowedRoles.includes(user.role)) {
        switch (user.role) {
            case 'admin':
                return <Navigate to="/admin-dashboard" />
            case 'manager':
                return <Navigate to="/manager-dashboard" />
            case 'annotator':
                return <Navigate to="/annotator-dashboard" />
            default:
                return <Navigate to="/login" />
        }
    }

    return children
}

RoleRoute.propTypes = {
    children: PropTypes.node.isRequired,
    allowedRoles: PropTypes.arrayOf(
        PropTypes.oneOf(['admin', 'manager', 'annotator'])
    ).isRequired,
}

export default RoleRoute
