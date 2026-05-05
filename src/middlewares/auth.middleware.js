import  jwt  from "jsonwebtoken";
import AppError from "../errors/AppError.js";
import { application } from "express";

export const authenticate = (req, res, next) => {
    const header = req.headers.authorization;

    if(!header) {
        throw new AppError(401, "Accès non autorisé");
    }

    const token = header.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw new AppError(403, "Token invalide ou expiré");
        }

        req.user = decoded;
        next();
    })
}