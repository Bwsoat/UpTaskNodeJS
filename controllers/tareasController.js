const Proyects = require("../models/Proyects");
const Tareas = require("../models/Tareas");

exports.agregarTarea = async (req, res, next)=>{
    //obtenemos el proyect actual
    const proyect  = await Proyects.findOne({ where: {url: req.params.url }});

    // leer el valor del imput
    const {tarea} = req.body;

    //estado 0 = incompleto y ID Proyect
    const estado = 0;
    const proyectId = proyect.id;

    //insertar en la base de datos
    const resultado  = await Tareas.create({tarea, estado, proyectId});
    if(!resultado) next();

    //redireccionamos
    res.redirect(`/proyects/${proyect.url}`);
}


exports.cambiarEstadoTarea = async (req, res, next)=>{
    const { id } = req.params;
    const tarea = await Tareas.findOne({ where: { id }});

    //cambiar el estado
    let estado = 0;
    if(tarea.estado === estado){
        estado = 1;
    }
    tarea.estado = estado;

    const resultado = await tarea.save();

    if(!resultado) return next();

    res.status(200).send("Actualizado");
}
exports.eliminarTarea = async (req, res, next)  =>{

    const { id } = req.params;

    //eliminar la tarea
    const resultado  = await Tareas.destroy({where:{ id }})
    if(!resultado) next();

    res.status(200).send("Tarea eliminada correctamente");
}