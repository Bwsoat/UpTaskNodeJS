//importamos nuestro models
const { param } = require("express-validator");
const models = require("../models/Proyects");
const Tareas = require("../models/Tareas");

//exportamos el controlador
exports.proyectsHome = async(req, res)=>{
    const userId = res.locals.user.id;
    const userName = res.locals.user.userName;
    const userAvatar = res.locals.user.userAvatar;
    const proyects = await models.findAll({ where: { userId }})
        .catch();
    res.render("index", {
        namePag : "Proyects",
        proyects,
        userName,
        userAvatar
    });
}
//exportamos el controlador para mostrar la vista nuevo-proyect
exports.proyectNuevo = async(req, res)=>{
    const userId = res.locals.user.id;
    const userName = res.locals.user.userName;
    const userAvatar = res.locals.user.userAvatar;
    const proyects = await models.findAll({ where: { userId }})
        .catch();
    res.render("nuevo-proyect", {
        namePagina : "Nuevo Proyect",
        proyects,
        userName,
        userAvatar
    });
}

exports.nuevoProyect = async (req, res)=>{
    //mostramos solo los proyects que el user atenticado creo
    const userId = res.locals.user.id;
    const proyects = await models.findAll({ where: { userId }})
        .catch();

    //enviar a la consola lo que el user escribe
    //console.log(req.body);

    //validar que hay algo dentro del input
    //extramos el name que ingresamos en el formulario
    const {name} = req.body;

    let errores = [];
    //preguntamos si name no esta vacio.
    if(!name){
        errores.push({"texto": "Agregar un name al Proyect."});
    }
    //si hay errores
    if(errores.length > 0){
        //mostramos los errores en nuestra pagina
        res.render("nuevo-proyect", {
            namePagina :"Nuevo Proyect", errores, proyects});
    }else{
        //no hay errores
        //insertamos los datos en la base de datos
        //le pasamos el name que ingresamos en el formulario
        const userId = res.locals.user.id;
        await models.create({name, userId});
        res.redirect("/");
    }
}
exports.proyectForUrl = async(req, res, next)=>{
    //mostramos solo los proyects que el user atenticado creo
    const userName = res.locals.user.userName;
    const userAvatar = res.locals.user.userAvatar;
    const userId = res.locals.user.id;
    const proyectsPromise = models.findAll({ where: { userId }})
    const proyectPromise = models.findOne({
        where:{
            url: req.params.url
        }
    });

    const [proyects, proyect] = await Promise.all([proyectsPromise, proyectPromise]);

    //Consultar tareas del Proyect actual
    const tareas = await Tareas.findAll({
        where:{
            proyectId: proyect.id
        }
    });

    if(!proyect)return next()

    res.render("tareas", {
        namePag:`Tareas del Proyect`, 
        proyects,
        proyect,
        tareas,
        userName,
        userAvatar
    });
}

exports.editarFormulario = async(req, res)=>{
    //mostramos solo los proyects que el user atenticado creo
    const userId = res.locals.user.id;
    const proyectsPromise = models.findAll({ where: { userId }})
    const proyectPromise = models.findOne({
        where:{
            id: req.params.id
        }
    });
    const [proyects, proyect] = await Promise.all([proyectsPromise, proyectPromise]);
    //renderiza la vista
    res.render("nuevo-proyect", {
        namePag:"hola?", 
        proyects,
        proyect
    });

}

exports.actualizarProyect = async (req, res)=>{
    //mostramos solo los proyects que el user atenticado creo
    const userId = res.locals.user.id;
    const proyects = models.findAll({ where: { userId }})
        .catch();

    const {name} = req.body;

    let errores = [];
    if(!name){
        errores.push({"texto": "Agregar un name al Proyect."});
    }
    if(errores.length > 0){
        res.render("nuevo-proyect", {
            namePagina :"Nuevo Proyect", errores, proyects});
    }else{
        await models.update(
            {name},
            {where: {id: req.params.id }});
        res.redirect("/");
    }
}

exports.eliminarProyect = async (req, res, next)=>{
    //req, params o query para leer los datos que mandamos al servidor
    //console.log(req);
    const {proyectUrl} = req.query;
    const resultado = await models.destroy({where:{ url: proyectUrl }});
    if(!resultado) return next();
    //esto es lo que enviamos como respuesta a la eliminacion
    res.send("El proyect se ha eliminado");
}

exports.paginaProyects = async(req, res, next)=>{
    const userId = res.locals.user.id;
    const userName = res.locals.user.userName;
    const userAvatar = res.locals.user.userAvatar;
    const proyects = await models.findAll({ where: { userId }});
    res.render("proyects", {
        namePag: "Proyects",
        proyects,
        userAvatar,
        userName
    });
}