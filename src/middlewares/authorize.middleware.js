import AppError from "../errors/AppError.js";
import * as userModel from "../models/user.model.js";
import * as authService from "../services/auth.service.js";

export const authorize = (admin) => {
  return async (req, res, next) => {
    const authRole = await authService.loginUser(req.params.email)
    const isOk = req.user.role === "admin";

    if (!isOk) {
      throw new AppError(401, "Vous n'êtes pas admin");
    }
    next();
  };
};
