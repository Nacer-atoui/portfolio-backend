import { Router } from "express";
import { sendContact } from "../controllers/contact.controller.js";
import { validateContact } from "../validators/contact.validator.js";
import validate from "../middlewares/validate.middleware.js";

const router = Router();

// Si quelqu'un fait un POST sur /, on valide les données, puis on lance le contrôleur
router.post('/', validateContact, validate, sendContact);

export default router;