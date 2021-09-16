const proyectos = require("../models/Proyectos");
const tareas = require("../models/Tareas");

exports.agregarTarea = async (req, res, next)=>{
    //Obtenemos el proyecto actual
    const proyectoActual = await proyectos.findOne({where: {url: req.params.url }});
    if(!proyectoActual) {return next();}
    //leemos el valor del input
    const {tarea} = req.body;

    //estado 0 = incompleto y ID de Proyecto
    const estado = 0;
    const proyectoId = proyectoActual.id;
    //insertar en la base de datos
    const resultado = await tareas.create({
        tarea:tarea,
        estado:estado,
        proyectoId:proyectoId
    });
    if(!resultado) return next();
    
    //redireccionamos 
    res.redirect(`/proyectos/${req.params.url}`);
}