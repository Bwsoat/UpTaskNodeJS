//Importamos la base de datos: Usuarios
const Usuarios = require("../models/Usuarios");

exports.formCrearCuenta = (req, res, next)=>{
    res.render("crearCuenta", {
        nombrePagina:"Crear un nuevo Usuario"
    });
}

exports.crearCuenta = async(req, res, next)=>{
    const {email, password} = req.body;
    try {
       await Usuarios.create({email, password})
        res.send("todo ok");
    } catch (error) {
        req.flash("error", error.errors.map(error => error.menssage));
        res.render("crearCuenta", {
            errores: req.flash(),
            nombrePagina:"Crear un nuevo Usuario"
        });
    }
}