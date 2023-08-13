const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // verdadeiro para 465, falso para outras portas.
    auth: {
      user: process.env.MAIL_ID, // usuário interno gerado
      pass: process.env.MP, // senha interna gerada
    },
  });

// enviar e-mail com objeto de transporte definido
let info = await transporter.sendMail({
  from: '"Hey 👻" <bsmaticdb@gmail.com>', // Endereço do remetente
  to: data.to, // lista de receptores
  subject: data.subject, // Linha de assunto
  text: data.text, // corpo de texto simples
  html: data.htm, // corpo html
});

  console.log("Mensagem enviada: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});

module.exports = sendEmail;
