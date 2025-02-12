import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"
import Button from "../components/button"
import { getAllUsers, updateUserRole, deleteUser } from "../services/userService"
import { getCurrentUser } from "../services/authService"

const ManageUsers = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState("")
    const currentUser = getCurrentUser()

    useEffect(() => {
        // Vérifier si l'utilisateur est admin
        if (!currentUser || currentUser.role !== "admin") {
            navigate("/")
            return
        }

        fetchUsers()
    }, [navigate])

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers()
            setUsers(data)
            setError(null)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateUserRole(userId, newRole)
            setSuccessMessage("Rôle mis à jour avec succès")
            fetchUsers() // Rafraîchir la liste
            setTimeout(() => setSuccessMessage(""), 3000)
        } catch (err) {
            setError(err.message)
            setTimeout(() => setError(null), 3000)
        }
    }

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            return
        }

        try {
            await deleteUser(userId)
            setSuccessMessage("Utilisateur supprimé avec succès")
            fetchUsers() // Rafraîchir la liste
            setTimeout(() => setSuccessMessage(""), 3000)
        } catch (err) {
            setError(err.message)
            setTimeout(() => setError(null), 3000)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-2xl">Chargement...</div>
            </div>
        )
    }

    return (
        <div className="w-screen overflow-hidden">
            <Header />
            <div className="min-h-screen bg-white">
                <div className="w-full px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-3xl font-semibold text-gray-900">Gestion des Utilisateurs</h1>
                            <p className="mt-2 text-sm text-gray-700">
                                Liste de tous les utilisateurs avec leurs rôles
                            </p>
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 mt-4 text-red-700 bg-red-100 rounded-md">
                            {error}
                        </div>
                    )}

                    {successMessage && (
                        <div className="p-4 mt-4 text-green-700 bg-green-100 rounded-md">
                            {successMessage}
                        </div>
                    )}

                    <div className="mt-8 overflow-hidden bg-white shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Nom d&apos;utilisateur
                                    </th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Email
                                    </th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Rôle
                                    </th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
                                            {user.username}
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {user.email}
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                className="block w-full px-3 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                disabled={user._id === currentUser.id}
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="manager">Manager</option>
                                                <option value="annotator">Annotator</option>
                                            </select>
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            <Button
                                                variant="danger"
                                                text="Supprimer"
                                                onClick={() => handleDeleteUser(user._id)}
                                                disabled={user._id === currentUser.id}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ManageUsers
