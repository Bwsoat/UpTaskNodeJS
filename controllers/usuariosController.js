//Importamos la base de datos: Usuarios
const Usuarios = require("../models/Usuarios");
const enviarEmail = require("../handles/email");

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
        //Crear usuario
        await Usuarios.create({email, password})

        //crear una url que nos mande a activar la cuenta
        const activateUrl = `http://${req.headers.host}/activar-cuenta/${email}`;
       //Preparamos el objeto para enviar un email
       const usuario = {email};
       await enviarEmail.enviar({
            usuario,
            subject: "activar cuenta",
            activateUrl,
            archivo: "activar-cuenta"
        }).catch( error =>{
            console.log(error, "Error al enviar el email");
            next();
        });

        req.flash("correcto", "El correo de activacion se ha enviado");
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