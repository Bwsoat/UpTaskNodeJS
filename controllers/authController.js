const passport = require("passport");
const Usuarios = require("../models/Usuarios");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const crypto = require("crypto");

exports.autenticarUsuario = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/iniciar-sesion",
    failureFlash: true,
    badRequestMessage: "Ambos campos son obligatorios"
})

exports.usuarioAutenticado = (req, res, next) => {

    //si el usuario esta autenticado, adelante
    if(req.isAuthenticated()){
        return next();
    }
    //Si no esta autenticado, redirigir al formulario
    return res.redirect("/iniciar-sesion");
}

exports.cerrarSesion = (req, res) => {
    req.session.destroy(() =>{
        res.redirect("/iniciar-sesion"); //al cerrar sesion nos lleva al login
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
    console.log(resetUrl);
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
    const token = req.params.token;
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

    res.redirect("/iniciar-sesion");
}