const passport = require("passport");

const Usuarios = require("../models/Usuarios");

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
}