import nodemailer from "nodemailer";

export const sendContactEmail = async (name, email, message) => {
    console.log(email)
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS, // mot de passe d'application Google
    },
  });

  await transport.sendMail({
    from: `"${name} (${email})" <${process.env.MAIL_USER}>`, 
  
  to: process.env.MAIL_TO,
  replyTo: email,
  subject: `Nouveau message de : ${name}`,
  text: message,
  });
};

