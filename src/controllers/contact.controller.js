import { sendContactEmail } from "../services/contact.service.js";

export const sendContact = async (req, res) => {
  // 1. On extrait les données reçues
  const { nom, email, message } = req.body;

  try {
    // 2. On délègue l'envoi au Service
    await sendContactEmail(nom, email, message);
    
    // 3. On répond au frontend que tout va bien
    res.status(200).json({ success: true, message: 'Email envoyé avec succès !' });
  } catch (error) {
    // En cas d'erreur de Mailjet, ça tombe ici
    console.error("💥 Erreur Mailjet :", error.statusCode, error.message);
    res.status(500).json({ success: false, message: "Erreur lors de l'envoi de l'email." });
  }
};