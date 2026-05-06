import { Router } from "express";
import validate from '../middlewares/validate.middleware.js';
import { newProject, getAll, getById, projectUpdate } from "../controllers/project.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { validateProject } from "../validators/project.validator.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", authenticate, authorize('admin'), validateProject, validate, newProject)
router.put("/:id", authenticate, authorize('admin'), validateProject, validate, projectUpdate)

export default router;