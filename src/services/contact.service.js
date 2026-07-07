import Mailjet from 'node-mailjet';

// Initialisation (en dehors de la fonction pour ne pas la refaire à chaque appel)
const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);

export const sendContactEmail = async (nom, email, message) => {
  const request = await mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: process.env.MAILJET_SENDER_EMAIL, // Ton mail validé
          Name: "Portfolio Contact",
        },
        To: [
          {
            Email: "nacerpro69@gmail.com", 
            Name: "Nacer",
          },
        ],
        ReplyTo: {
          Email: email, // L'email du visiteur
          Name: nom
        },
        Subject: `Nouveau message de ${nom} sur ton portfolio !`,
        TextPart: `Message de: ${nom} (${email})\n\n${message}`,
        HTMLPart: `<h3>Nouveau contact depuis le portfolio</h3>
                   <p><strong>Nom :</strong> ${nom}</p>
                   <p><strong>Email :</strong> ${email}</p>
                   <p><strong>Message :</strong><br />${message}</p>`,
      },
    ],
  });
  
  return request;
};