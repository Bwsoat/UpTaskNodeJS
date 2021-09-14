//importamos nuestro modelo
const { param } = require("express-validator");
const Proyectos = require("../models/Proyectos");
const modelo = require("../models/Proyectos");

//exportamos el controlador
exports.proyectosHome = async(req, res)=>{
    const proyectos = await modelo.findAll();
    res.render("index", {
        nombrePagina : "Proyectos",
        proyectos
    });
}
//exportamos el controlador para mostrar la vista nuevo-proyecto
exports.proyectoNuevo = async(req, res)=>{
    const proyectos = await modelo.findAll();
    res.render("nuevo-proyecto", {
        nombrePagina : "Nuevo Proyecto",
        proyectos
    });
}

exports.nuevoProyecto = async (req, res)=>{
    const proyectos = await modelo.findAll();
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
        await modelo.create({nombre});
        res.redirect("/");
    }
}
exports.proyectoPorUrl = async(req, res, next)=>{
    const proyectos = await modelo.findAll();
    const proyecto = await modelo.findOne({
        where:{
            url: req.params.url
        }
    });
    if(!proyecto)return next()
    res.render("tareas", {
        nombrePagina:`Tareas del Proyecto`, 
        proyectos,
        proyecto
    });
}

exports.editarFormulario = async(req, res)=>{
    const proyectosPromise = await modelo.findAll();
    const proyectoPromise = await modelo.findOne({
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
    const proyectos = await modelo.findAll();
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

    const resultado = await Proyectos.destroy({where:{url: urlProyecto}});

    //esto es lo que enviamos como respuesta a la eliminacion
    res.send("El proyecto se ha eliminado");
}