//traemos todas las funciones de express a este archivo
const express = require("express");
const router = express.Router();

//importar express validator, usamos check para usar metodos de validacion
const {body, validationResult} = require("express-validator");

//importamos los controladores
const proyectoController = require("../controllers/proyectosController.js");
const tareaController = require("../controllers/tareasController.js");
const usuarioController = require("../controllers/usuariosController.js");

//usamos module.exports para exportar de manera nativa
module.exports = function(){
    //ruta para el home
    router.get("/", proyectoController.proyectosHome);
    //ruta para la vista nuevo-proyecto
    router.get("/nuevo-proyecto", proyectoController.proyectoNuevo);
    //ruta para el post nuevo-proyecto
    router.post("/nuevo-proyecto", 
    //validamos si nombre no esta vacio  y con trim eliminamos los espacios en blanco
    //.escape para evitar caracteres raros
    body("nombre").not().isEmpty().trim().escape(),
    proyectoController.nuevoProyecto);

    //Listar Proyecto
    router.get("/proyectos/:url", proyectoController.proyectoPorUrl);
    
    //Atualizar Proyecto

    router.get("/proyecto/editar/:id", proyectoController.editarFormulario);

    router.post("/nuevo-proyecto/:id",
    body("nombre").not().isEmpty().trim().escape(),
    proyectoController.actualizarProyecto);
    //Eliminar Proyecto
    router.delete("/proyectos/:url", proyectoController.eliminarProyecto);
    //Agregar tarea
    router.post("/proyectos/:url", 
    body("nombre").not().isEmpty().trim().escape(),
    tareaController.agregarTarea);

    //Actualizar Tarea - patch nos permite editar una parte de la tabla

    router.patch("/tareas/:id", tareaController.cambiarEstadoTarea);

    //Eliminar tarea
    router.delete("/tareas/:id", tareaController.eliminarTarea);

    //Agregar un nuevo usuario
    router.get("/nueva-cuenta", usuarioController.formCrearCuenta);

    router.post("/nueva-cuenta", usuarioController.crearCuenta);

    //Iniciar Sesion
    router.get("/iniciar-sesion", usuarioController.formIniciarSesion);

    return router;

}

