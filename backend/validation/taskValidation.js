const { body, param } = require('express-validator')

const baseTaskValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Le titre est requis')
    .isLength({ min: 3, max: 100 })
    .withMessage('Le titre doit contenir entre 3 et 100 caractères'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('La description est requise')
    .isLength({ min: 10, max: 1000 })
    .withMessage('La description doit contenir entre 10 et 1000 caractères'),
  body('assignedTo')
    .notEmpty()
    .withMessage("L'utilisateur assigné est requis")
    .isMongoId()
    .withMessage("L'ID de l'utilisateur assigné n'est pas valide"),
  body('dueDate')
    .notEmpty()
    .withMessage("La date d'échéance est requise")
    .isISO8601()
    .withMessage("La date d'échéance doit être une date valide")
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error("La date d'échéance doit être dans le futur")
      }
      return true
    }),
  body('priority')
    .isIn(['low', 'medium', 'high'])
    .withMessage('La priorité doit être low, medium ou high'),
]

const createTaskValidation = [...baseTaskValidation]

const updateTaskValidation = [
  param('taskId').isMongoId().withMessage('ID de tâche invalide'),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Le titre doit contenir entre 3 et 100 caractères'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('La description doit contenir entre 10 et 1000 caractères'),
  body('assignedTo')
    .optional()
    .isMongoId()
    .withMessage("L'ID de l'utilisateur assigné n'est pas valide"),
  body('status')
    .optional()
    .isIn(['pending', 'in_progress', 'completed'])
    .withMessage('Le statut doit être pending, in_progress ou completed'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage("La date d'échéance doit être une date valide")
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error("La date d'échéance doit être dans le futur")
      }
      return true
    }),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('La priorité doit être low, medium ou high'),
]

module.exports = {
  createTaskValidation,
  updateTaskValidation,
}
