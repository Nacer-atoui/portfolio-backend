import AppError from "../errors/AppError.js";
import * as ContactService from '../services/contact.service.js';

export const sendContact = async (req, res, next) => {
    await ContactService.sendContactEmail(req.body.name, req.body.email, req.body.message)
    return res.json({ message: 'Message envoyé avec succès' })
}