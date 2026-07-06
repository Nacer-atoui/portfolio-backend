import { Router } from "express";
import { validateContact } from "../validators/contact.validator.js";
import validate from "../middlewares/validate.middleware.js";
import { sendContact } from "../controllers/contact.controller.js";
import express from 'express';
import Mailjet from 'node-mailjet';

const router = express.Router();

// Initialisation de Mailjet avec les variables d'environnement
const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);

router.post('/', async (req, res) => {
  const { nom, email, message } = req.body;

  try {
    const request = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_SENDER_EMAIL,
            Name: "Portfolio Contact",
          },
          To: [
            {
              Email: "nacerpro69@gmail.com", 
              Name: "Nacer",
            },
          ],
          Subject: `Nouveau message de ${nom} sur ton portfolio !`,
          TextPart: `Message de: ${nom} (${email})\n\n${message}`,
          HTMLPart: `<h3>Nouveau contact depuis le portfolio</h3>
                     <p><strong>Nom :</strong> ${nom}</p>
                     <p><strong>Email :</strong> ${email}</p>
                     <p><strong>Message :</strong><br />${message}</p>`,
        },
      ],
    });

    res.status(200).json({ success: true, message: 'Email envoyé avec succès !' });
  } catch (error) {
    console.error("Erreur Mailjet :", error.statusCode, error.message);
    res.status(500).json({ success: false, message: "Erreur lors de l'envoi de l'email." });
  }
});

export default router;