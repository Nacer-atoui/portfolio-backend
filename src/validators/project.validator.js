import { body, param } from "express-validator";

export const validateProject = [
  body("title")
    .notEmpty().withMessage("Le titre est requis")
    .isLength({ min: 2, max: 150}).withMessage("Le titre doit faire entre 2 et 150 caractères"),
  body("description")
    .optional({ checkFalsy: true }) // Recommandé ici aussi
    .isLength({ max: 2000 }).withMessage("La description ne doit pas dépasser 2000 caractères"),
  body("github_url")
    .optional({ checkFalsy: true }) // <-- Ignore les chaînes vides ""
    .isURL().withMessage("L'URL GitHub n'est pas valide"),
  body("demo_url")
    .optional({ checkFalsy: true })
    .isURL().withMessage("L'URL de la démo n'est pas valide"),
  body("image_url")
    .optional({ checkFalsy: true })
    .isURL().withMessage("L'URL de l'image n'est pas valide"),
];
