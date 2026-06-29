import { body, param } from "express-validator";

export const validateContact = [
    body("name")
        .notEmpty()
        .isLength({ min: 2, max: 100}).withMessage("Le nom est requis"),  
    body("email")
        .notEmpty()
        .isEmail(),
    body("message")
        .notEmpty()
        .isLength({ min: 10, max: 2000})
]