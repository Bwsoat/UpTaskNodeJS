const nodemailer = require("nodemailer");
const pug = require("pug");
const juice = require("juice");
const htmlToText = require("html-to-text");
const util = require("util");

const emailConfig = require("../config/email");

let transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.auth.user,
      pass: emailConfig.auth.pass
    },
});
//Verificamos que el trasnporter funciona correctamente
transporter.verify().then(()=>{
  console.log("Ready to send");
});
  //Generar html
  const generarHTML = ()=> {
    const hmtl = pug.renderFile();
  }

  transporter.sendMail({
    from: "'UpTask' <no-reply@uptask.com>",
    to: "correo@correo.com",
    subject: "Password Reset",
    text: "texto",
    html: "<b>texto</b>",
  });
