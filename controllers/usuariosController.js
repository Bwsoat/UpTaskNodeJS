//Importamos la base de datos: Usuarios
const Usuarios = require("../models/Usuarios");

exports.formCrearCuenta = (req, res, next)=>{
    res.render("crearCuenta", {
        nombrePagina:"Crear un nuevo Usuario",
        ruta: "nueva-cuenta"
    });
}

exports.formIniciarSesion= (req, res)=>{
    res.render("iniciarSesion", {
        nombrePagina: "Iniciar Sesion en UpTask",
        ruta: "iniciar-sesion"
    })
}

exports.crearCuenta = async(req, res, next)=>{
    const {email, password} = req.body;
    try {
       await Usuarios.create({email, password})
        res.redirect("/iniciar-sesion");
    } catch (error) {
        req.flash("error", error.errors.map(error => error.message));
        res.render("crearCuenta", {
            mensajes: req.flash(),
            nombrePagina:"Crear un nuevo Usuario",
            email: email,
            ruta: "nueva-cuenta"
        });
    }
}

exports.formRestablecerPassword= (req, res)=>{
    res.render("restablecer", {
        nombrePagina: "Restablecer Contraseña",
        ruta: "restablecer-password"
    })
}