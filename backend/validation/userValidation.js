const { body, param } = require('express-validator')

// Base user validation rules
const baseUserValidation = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
]

// Additional rules for admin user creation
const adminCreateUserValidation = [
  ...baseUserValidation,
  body('role')
    .optional()
    .isIn(['admin', 'manager', 'annotator'])
    .withMessage('Invalid role. Must be admin, manager, or annotator'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean value'),
]

// Regular user creation (registration)
const createUserValidation = [
  ...baseUserValidation,
  // Role and isActive are set automatically for regular registration
  body('role')
    .not()
    .exists()
    .withMessage('Role cannot be set during registration'),
  body('isActive')
    .not()
    .exists()
    .withMessage('isActive cannot be set during registration'),
]

// Update validation with role restrictions
const updateUserValidation = [
  param('id').isMongoId().withMessage('Invalid user ID'),
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  // Role can only be updated by admin (handled in controller)
  body('role')
    .optional()
    .isIn(['admin', 'manager', 'annotator'])
    .withMessage('Invalid role. Must be admin, manager, or annotator'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean value'),
]

const validateId = [param('id').isMongoId().withMessage('Invalid user ID')]

module.exports = {
  createUserValidation,
  adminCreateUserValidation,
  updateUserValidation,
  validateId,
  baseUserValidation,
}
