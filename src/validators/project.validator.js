import { body, param } from "express-validator";

export const validateAuth = [
  body("title").notEmpty().withMessage("Le titre est requis").isLength({ min: 2, max: 150}),
  body("description")
    .notEmpty()
    .withMessage("Le mot de passe est requis")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe est trop court"),
  body("tech_stack").notEmpty().withMessage("L'email est requis").isEmail(),
  body("github_url")
    .notEmpty()
    .withMessage("Le mot de passe est requis")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe est trop court"),
  body("demo_url").notEmpty().withMessage("L'email est requis").isEmail(),
  body("image_url")
    .notEmpty()
    .withMessage("Le mot de passe est requis")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe est trop court"),
];
