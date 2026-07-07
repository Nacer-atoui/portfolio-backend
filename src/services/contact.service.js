export const sendContactEmail = async (nom, email, message) => {
  // L'API REST de Mailjet utilise une authentification Basic avec tes clés encodées en Base64
  const auth = btoa(`${process.env.MAILJET_API_KEY}:${process.env.MAILJET_SECRET_KEY}`);

  const response = await fetch('https://api.mailjet.com/v3.1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`
    },
    body: JSON.stringify({
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
    })
  });

  const data = await response.json();

  if (!response.ok) {
    // Si Mailjet renvoie une erreur (par exemple clé invalide ou email expéditeur non vérifié)
    throw new Error(data.ErrorMessage || 'Erreur lors de l\'envoi via Mailjet');
  }
  
  return data;
};