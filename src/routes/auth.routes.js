import { Router } from "express";
import { validateAuth } from "../validators/auth.validator.js";
import validate from "../middlewares/validate.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { login } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login",login, validateAuth, validate, authenticate, authorize('admin'));

export default router;