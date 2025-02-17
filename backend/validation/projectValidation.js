const { body, param } = require('express-validator')

const baseProjectValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Le nom du projet est requis')
    .isLength({ min: 3 })
    .withMessage('Le nom du projet doit contenir au moins 3 caractères'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('La description du projet est requise'),
  body('type')
    .isIn(['image', 'text', 'audio'])
    .withMessage('Le type doit être image, text ou audio'),
]

const createProjectValidation = [
  ...baseProjectValidation,
  body('labels')
    .optional()
    .isArray()
    .withMessage('Les labels doivent être un tableau'),
  body('labels.*.name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Le nom du label est requis'),
  body('labels.*.color')
    .optional()
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage('La couleur doit être au format hexadécimal (ex: #000000)'),
]

const updateProjectValidation = [
  param('id').isMongoId().withMessage('ID de projet invalide'),
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Le nom du projet est requis')
    .isLength({ min: 3 })
    .withMessage('Le nom du projet doit contenir au moins 3 caractères'),
  body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('La description du projet est requise'),
  body('type')
    .optional()
    .isIn(['image', 'text', 'audio'])
    .withMessage('Le type doit être image, text ou audio'),
  body('labels')
    .optional()
    .isArray()
    .withMessage('Les labels doivent être un tableau'),
  body('labels.*.name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Le nom du label est requis'),
  body('labels.*.color')
    .optional()
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage('La couleur doit être au format hexadécimal (ex: #000000)'),
]

const addCollaboratorValidation = [
  param('id').isMongoId().withMessage('ID de projet invalide'),
  body('userId').isMongoId().withMessage('ID utilisateur invalide'),
  body('role')
    .isIn(['manager', 'annotator'])
    .withMessage('Le rôle doit être manager ou annotator'),
]

const removeCollaboratorValidation = [
  param('id').isMongoId().withMessage('ID de projet invalide'),
  param('userId').isMongoId().withMessage('ID utilisateur invalide'),
]

const updateDatasetStatusValidation = [
  param('id').isMongoId().withMessage('ID de projet invalide'),
  param('itemId').isMongoId().withMessage("ID d'élément invalide"),
  body('status')
    .isIn(['pending', 'in_progress', 'annotated'])
    .withMessage('Le statut doit être pending, in_progress ou annotated'),
]

const assignDatasetItemValidation = [
  param('id').isMongoId().withMessage('ID de projet invalide'),
  param('itemId').isMongoId().withMessage("ID d'élément invalide"),
  body('userId').isMongoId().withMessage('ID utilisateur invalide'),
]

const validateId = [
  param('id').isMongoId().withMessage('ID de projet invalide'),
]

module.exports = {
  createProjectValidation,
  updateProjectValidation,
  addCollaboratorValidation,
  removeCollaboratorValidation,
  updateDatasetStatusValidation,
  assignDatasetItemValidation,
  validateId,
  baseProjectValidation,
}
