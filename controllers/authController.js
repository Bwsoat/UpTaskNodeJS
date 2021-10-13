const passport = require("passport");
const Usuarios = require("../models/Usuarios");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const enviarEmail = require("../handles/email");

exports.autenticarUsuario = passport.authenticate("local", {
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
exports.usuarioAutenticado = (req, res, next) => {

    //si el usuario esta autenticado, adelante
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
    //verificar si el usuario existe
    const {email} = req.body;
    const usuario = await Usuarios.findOne({ where: { email }});
    //Si no existe
    if (!usuario){
        req.flash("error", "Ese usuario no existe");
        res.render("restablecer", {
            nombrePagina: "Reestablecer Contraseña",
            mensajes: req.flash(),
            ruta: "restablecer-password"
        })
    }
    //si el usuario existe, generamos el token
    usuario.token = crypto.randomBytes(20).toString("hex");
    usuario.expiracion = Date.now() + 360000;

    //los guardamos en la base de datos
    await usuario.save();

    //url de reset

    const resetUrl = `http://${req.headers.host}/restablecer-password/${usuario.token}`;

    //Enviar el correo con el token
    await enviarEmail.enviar({
        usuario,
        subject: "Password Reset",
        resetUrl,
        archivo: "resetPassword"
    }).catch(function(e) {
        console.log(e);
        //res.status(404).json({ message: "something goes wrong" });
      });
    req.flash("correcto", "correo de restauracion enviado");
    res.redirect("/restablecer-password");
}

exports.validarToken = async(req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token
        }
    });
    //Si el usuario no existe, redireccionar al restablecer contraseña
    if(!usuario){
        req.flash("error", "Usuario no valido");
        res.redirect("/restablecer-password");
    }

    //formulario para resetear el password
    res.render("resetPassword", {
        nombrePagina : "Restablecer Contraseña"
    })
}

exports.restablecerPassword = async(req, res) => {
    //Verifica el token y la expiracion
    const { password } = req.body;
    const usuario = await Usuarios.findOne({ where: {
        token: req.params.token,
        expiracion: {
            [Op.gte] : Date.now()
        }
    }});

    if(!usuario){
        req.flash("error", "el usuario no existe, o expiro el tiempo de recuperacion");
        res.render("/restablecer-password");
    }
    //hasheamos el nuevo password, eliminamos el token y la expiracion
    usuario.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    usuario.token = null;
    usuario.expiracion = null;
    res.redirect("/sign-in");

    //Guardamos los cambios
    await usuario.save();
}

exports.activarCuenta = async(req, res)=> {
    const usuario = await Usuarios.findOne({
        where: {
            email: req.params.email
        }
    });
    //definimos y guardamos la activacion de la cuenta
    usuario.activo = 1;
    await usuario.save();

    //redireccionamos y enviamos un mensaje de confirmacion
    req.flash("correcto", "cuenta activada correntamente");
    res.redirect("/sign-in");
    
}