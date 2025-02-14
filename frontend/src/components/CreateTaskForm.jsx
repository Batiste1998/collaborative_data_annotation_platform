import { useState } from 'react'
import PropTypes from 'prop-types'
import Input from './input'
import Button from './button'
import Select from './select'

const CreateTaskForm = ({ projectId, onSubmit, onCancel, users }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assignedTo: '',
        dueDate: '',
        priority: 'medium'
    })

    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {}
        
        if (!formData.title.trim()) {
            newErrors.title = 'Le titre est requis'
        } else if (formData.title.length < 3) {
            newErrors.title = 'Le titre doit contenir au moins 3 caractères'
        }

        if (!formData.description.trim()) {
            newErrors.description = 'La description est requise'
        } else if (formData.description.length < 10) {
            newErrors.description = 'La description doit contenir au moins 10 caractères'
        }

        if (!formData.assignedTo) {
            newErrors.assignedTo = "L'assignation est requise"
        }

        if (!formData.dueDate) {
            newErrors.dueDate = "La date d'échéance est requise"
        } else {
            const selectedDate = new Date(formData.dueDate)
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            
            if (selectedDate < today) {
                newErrors.dueDate = "La date d'échéance doit être dans le futur"
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            onSubmit({ ...formData, projectId })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Effacer l'erreur quand l'utilisateur commence à corriger
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }))
        }
    }

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }))
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-lg p-6 mx-auto space-y-4 bg-white rounded-lg shadow">
            <h2 className="mb-6 text-2xl font-bold">Créer une nouvelle tâche</h2>
            
            <div>
                <Input
                    text="Titre"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    error={errors.title}
                    required
                />
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${
                        errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    rows="4"
                    required
                />
                {errors.description && (
                    <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                )}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    Assigner à
                </label>
                <Select
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={(value) => handleSelectChange('assignedTo', value)}
                    list={users.map(user => ({
                        value: user._id,
                        label: user.username
                    }))}
                    error={errors.assignedTo}
                    required
                />
            </div>

            <div>
                <Input
                    type="date"
                    text="Date d'échéance"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    error={errors.dueDate}
                    required
                />
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    Priorité
                </label>
                <Select
                    name="priority"
                    value={formData.priority}
                    onChange={(value) => handleSelectChange('priority', value)}
                    list={[
                        { value: 'low', label: 'Basse' },
                        { value: 'medium', label: 'Moyenne' },
                        { value: 'high', label: 'Haute' }
                    ]}
                />
            </div>

            <div className="flex justify-end gap-4 mt-6">
                <Button
                    type="button"
                    variant="secondary"
                    text="Annuler"
                    onClick={onCancel}
                />
                <Button
                    type="submit"
                    variant="primary"
                    text="Créer la tâche"
                />
            </div>
        </form>
    )
}

CreateTaskForm.propTypes = {
    projectId: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
    })).isRequired
}

export default CreateTaskForm
