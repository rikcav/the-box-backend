import * as nodemailer from "nodemailer"
import { env } from "../env";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: env.EMAIL,
    pass: env.EMAIL_PASSWORD
  }
});

export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
  const mailOptions = {
    from: 'The Box App',
    to, // Destinatário
    subject, // Assunto
    text, // Texto simples
    html // HTML opcional
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email enviado com sucesso');
  } catch (error) {
    console.error('Erro ao enviar email: ', error);
    throw error;
  }
};