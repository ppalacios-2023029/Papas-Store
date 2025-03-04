import { body } from "express-validator";
import { validateErrors } from "./validate.errors.js"
import { existEmail, existUsername } from "../utils/db.validators.js";

export const registerValidator = [
    body('name', 'Name cannot be empty').notEmpty,
    body('surname', 'Surname cannot be empty').notEmpty(),
    body('username', 'Username cannot be empty').notEmpty().toLowerCase().custom(existUsername),
    body('email', 'Email cannot be empty').notEmpty().isEmail().custom(existEmail),
    body('password', 'Password cannot be empty').notEmpty().isStrongPassword().withMessage('Password must be strong').isLength({min: 8}).withMessage('Password need min characters'),
    body('phone', 'Phone cannot be empty').notEmpty().isMobilePhone(),
    validateErrors
]
