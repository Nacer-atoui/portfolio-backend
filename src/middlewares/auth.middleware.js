import  jwt  from "jsonwebtoken";
import AppError from "../errors/AppError.js";
import { application } from "express";

export const authenticate = (req, res, next) => {
    const header = req.headers.authorization;

    if(!header) {
        throw new AppError("Accès non autorisé", 401);
    }

    const token = header.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw new AppError("Token invalide ou expiré", 403);
        }

        req.user = decoded;
        next();
    })
}