import AppError from "../errors/AppError.js";
import * as userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async ({ email, password }) => {

    const user = await userModel.findByEmail(email);
    if (!user) {
        throw new AppError("Identifiants invalides", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        throw new AppError("Mot de passe invalides", 401 );
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "24h" });
        return token;
}
