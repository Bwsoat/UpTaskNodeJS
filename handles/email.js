const nodemailer = require("nodemailer");
const pug = require("pug");
const juice = require("juice");
const htmlText = require("html-to-text");

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
  //Generar html
  const generarHTML = (archivo, opciones = {})=> {
    const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opciones);
    return juice(html);
  }
exports.send = async (opciones)=> {
    const html  = generarHTML(opciones.archivo, opciones);
    const text  = htmlText.htmlToText(html);
    await transporter.sendMail({
      from: "'UpTask' <no-reply@gmail.com>",
      to: opciones.user.email,
      subject: opciones.subject,
      text,
      html
    }).catch(function(e) {
      console.log("que quiere esta mierda");
      //res.status(404).json({ message: "something goes wrong" });
    });
  }
});