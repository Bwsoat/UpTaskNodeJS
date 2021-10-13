//importamos nuestro modelo
const { param } = require("express-validator");
const modelo = require("../models/Proyectos");
const Tareas = require("../models/Tareas");

//exportamos el controlador
exports.proyectosHome = async(req, res)=>{
    const usuarioId = res.locals.usuario.id;
    const proyectos = await modelo.findAll({ where: { usuarioId }})
        .catch();
    res.render("index", {
        nombrePagina : "Proyectos",
        proyectos
    });
}
//exportamos el controlador para mostrar la vista nuevo-proyecto
exports.proyectoNuevo = async(req, res)=>{
    const usuarioId = res.locals.usuario.id;
    const proyectos = await modelo.findAll({ where: { usuarioId }})
        .catch();
    res.render("nuevo-proyecto", {
        nombrePagina : "Nuevo Proyecto",
        proyectos
    });
}

exports.nuevoProyecto = async (req, res)=>{
    //mostramos solo los proyectos que el usuario atenticado creo
    const usuarioId = res.locals.usuario.id;
    const proyectos = await modelo.findAll({ where: { usuarioId }})
        .catch();

    //enviar a la consola lo que el usuario escribe
    //console.log(req.body);

    //validar que hay algo dentro del input
    //extramos el nombre que ingresamos en el formulario
    const {nombre} = req.body;

    let errores = [];
    //preguntamos si nombre no esta vacio.
    if(!nombre){
        errores.push({"texto": "Agregar un Nombre al Proyecto."});
    }
    //si hay errores
    if(errores.length > 0){
        //mostramos los errores en nuestra pagina
        res.render("nuevo-proyecto", {
            nombrePagina :"Nuevo Proyecto", errores, proyectos});
    }else{
        //no hay errores
        //insertamos los datos en la base de datos
        //le pasamos el nombre que ingresamos en el formulario
        const usuarioId = res.locals.usuario.id;
        await modelo.create({nombre, usuarioId});
        res.redirect("/");
    }
}
exports.proyectoPorUrl = async(req, res, next)=>{
    //mostramos solo los proyectos que el usuario atenticado creo
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = modelo.findAll({ where: { usuarioId }})
    const proyectoPromise = modelo.findOne({
        where:{
            url: req.params.url
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    //Consultar tareas del Proyecto actual
    const tareas = await Tareas.findAll({
        where:{
            proyectoId: proyecto.id
        }
    });

    if(!proyecto)return next()
    res.render("tareas", {
        nombrePagina:`Tareas del Proyecto`, 
        proyectos,
        proyecto,
        tareas
    });
}

exports.editarFormulario = async(req, res)=>{
    //mostramos solo los proyectos que el usuario atenticado creo
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = modelo.findAll({ where: { usuarioId }})
    const proyectoPromise = modelo.findOne({
        where:{
            id: req.params.id
        }
    });
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);
    //renderiza la vista
    res.render("nuevo-proyecto", {
        nombrePagina:"hola?", 
        proyectos,
        proyecto
    });

}

exports.actualizarProyecto = async (req, res)=>{
    //mostramos solo los proyectos que el usuario atenticado creo
    const usuarioId = res.locals.usuario.id;
    const proyectos = modelo.findAll({ where: { usuarioId }})
        .catch();

    const {nombre} = req.body;

    let errores = [];
    if(!nombre){
        errores.push({"texto": "Agregar un Nombre al Proyecto."});
    }
    if(errores.length > 0){
        res.render("nuevo-proyecto", {
            nombrePagina :"Nuevo Proyecto", errores, proyectos});
    }else{
        await modelo.update(
            {nombre:nombre},
            {where: {id: req.params.id }});
        res.redirect("/");
    }
}

exports.eliminarProyecto = async (req, res, next)=>{
    //req, params o query para leer los datos que mandamos al servidor
    //console.log(req);
    const {urlProyecto} = req.query;

    const resultado = await modelo.destroy({where:{url: urlProyecto}});
    if(!resultado) return next();
    //esto es lo que enviamos como respuesta a la eliminacion
    res.send("El proyecto se ha eliminado");
}

exports.paginaProyectos = async(req, res, next)=>{
    const usuarioId = res.locals.usuario.id;
    const proyectos = await modelo.findAll({ where: { usuarioId }});
    res.render("proyectos", {
        nombrePagina: "Proyectos",
        proyectos
    });
}