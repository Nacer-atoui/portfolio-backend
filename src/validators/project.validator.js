import { body, param } from "express-validator";

export const validateProject = [
  body("title")
    .notEmpty().withMessage("Le titre est requis")
    .isLength({ min: 2, max: 150}).withMessage("Le titre doit faire entre 2 et 150 caractères"),
  body("description")
    .optional()
    .isLength({ max: 2000 }).withMessage("La description ne doit pas dépasser 2000 caractères"),
  body("tech_stack")
    .optional()
    .isLength({ max: 255 }).withMessage("La stack ne doit pas dépasser 255 caractères"),
  body("github_url")
    .optional()
    .isURL(),
  body("demo_url")
    .optional()
    .isURL(),
  body("image_url")
    .optional()
    .isURL(),
];
