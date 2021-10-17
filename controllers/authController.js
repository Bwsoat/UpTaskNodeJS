const passport = require("passport");
const Users = require("../models/Users");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sendEmail = require("../handles/email");

exports.authenticateUser = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/sign-in",
    failureFlash: true,
    badRequestMessage: "Ambos campos son obligatorios"
});
exports.autenticarGoogle = passport.authenticate("google", { 
    scope: ["profile", "email"]
});
/*
exports.googleRedirect = passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/sign-in",
    failureFlash: true,
    badRequestMessage: "error"
});
*/
exports.authenticatedUser = (req, res, next) => {

    //si el user esta autenticado, adelante
    if(req.isAuthenticated()){
        return next();
    }
    //Si no esta autenticado, redirigir al formulario
    return res.redirect("/sign-in");
}

exports.cerrarSesion = (req, res) => {
    req.session.destroy(() =>{
        res.redirect("/sign-in"); //al cerrar sesion nos lleva al login
    })
}
exports.enviarToken = async(req, res, next) => {
    //verificar si el user existe
    const {email} = req.body;
    const user = await Users.findOne({ where: { email }});
    //Si no existe
    if (!user){
        req.flash("error", "Ese user no existe");
        res.render("reset-password", {
            namePag: "reset password",
            mensajes: req.flash()
        })
    }
    //si el user existe, generamos el token
    user.token = crypto.randomBytes(20).toString("hex");
    user.expiracion = Date.now() + 360000;

    //los guardamos en la base de datos
    await user.save();

    //url de reset

    const resetUrl = `http://${req.headers.host}/reset-password/${user.token}`;

    //Enviar el correo con el token
    await sendEmail.send({
        user,
        subject: "Password Reset",
        resetUrl,
        archivo: "resetPassword"
    }).catch(function(e) {
        console.log(e);
        //res.status(404).json({ message: "something goes wrong" });
      });
    req.flash("success", "correo de restauracion enviado");
    res.redirect("/reset-password");
}

exports.validarToken = async(req, res) => {
    const user = await Users.findOne({
        where: {
            token: req.params.token
        }
    });
    //Si el user no existe, redireccionar al restablecer contraseña
    if(!user){
        req.flash("error", "el user no existe, o expiro el tiempo de recuperacion");
        res.redirect("/reset-password");
    }

    //formulario para resetear el password
    res.render("login/new-password", {
        namePag : "Type you new password"
    })
}

exports.restablecerPassword = async(req, res) => {
    //Verifica el token y la expiracion
    const { newPassword,repeatPassword } = req.body;
    if(!(newPassword === repeatPassword)){
        req.flash("error", "Las contraseñas no coinciden");
        res.render("login/new-password", {
            namePag : "Type you new password",
            mensajes: req.flash()
        })
    }
    const user = await Users.findOne({ where: {
        token: req.params.token,
        expiracion: {
            [Op.gte] : Date.now()
        }
    }});
    console.log(user);

    if(!user){
        req.flash("error", "el user no existe, o expiro el tiempo de recuperacion");
        res.redirect("/reset-password");
    }
    //hasheamos el nuevo password, eliminamos el token y la expiracion
    user.userPassword = bcrypt.hashSync(req.body.newPassword, bcrypt.genSaltSync(10));
    user.token = null;
    user.expiracion = null;
    
    //Guardamos los cambios
    await user.save();
    
    req.flash("success", "se restablecio la contraseña correctamente");
    res.redirect("/sign-in");
}

exports.activarCuenta = async(req, res)=> {
    const user = await Users.findOne({
        where: {
            email: req.params.email
        }
    });
    //definimos y guardamos la activacion de la cuenta
    user.activo = 1;

    //redireccionamos y enviamos un mensaje de confirmacion
    req.flash("success", "cuenta activada correntamente");
    res.redirect("/sign-in");

    await user.save();
}