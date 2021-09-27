const passport = require("passport");

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