import { Router } from "express";
import validate from "../middlewares/validate.middleware.js";
import {
  newProject,
  getAll,
  getById,
  projectUpdate,
  projectDelete,
} from "../controllers/project.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { validateProject } from "../validators/project.validator.js";

// On importe notre nouveau middleware configuré
import upload from "../middlewares/upload.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);

// On utilise upload.array('project_images') juste avant les validateurs
router.post(
  "/",
  authenticate,
  authorize("admin"),
  upload.array("image_url"),
  validateProject,
  validate,
  newProject,
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validateProject,
  validate,
  projectUpdate,
);
router.delete("/:id", authenticate, authorize("admin"), projectDelete);

export default router;
