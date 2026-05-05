import { body, param } from "express-validator";

export const validateAuth = [
    body("email")
        .notEmpty().withMessage("L'email est requis")
        .isEmail(),
    body("password")
        .notEmpty().withMessage("Le mot de passe est requis")
        .isLength({min: 6}).withMessage("Le mot de passe est trop court"),
];