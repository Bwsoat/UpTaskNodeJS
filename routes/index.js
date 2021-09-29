//traemos todas las funciones de express a este archivo
const express = require("express");
const router = express.Router();

//importar express validator, usamos check para usar metodos de validacion
const {body, validationResult} = require("express-validator");

//importamos los controladores
const proyectoController = require("../controllers/proyectosController.js");
const tareaController = require("../controllers/tareasController.js");
const usuarioController = require("../controllers/usuariosController.js");
const authController = require("../controllers/authController");

//usamos module.exports para exportar de manera nativa
module.exports = function(){
    //ruta para el home
    router.get("/",
        authController.usuarioAutenticado,
        proyectoController.proyectosHome);
    //ruta para la vista nuevo-proyecto
    router.get("/nuevo-proyecto", 
        authController.usuarioAutenticado,
        proyectoController.proyectoNuevo);
    
    
    //ruta para el post nuevo-proyecto
    router.post("/nuevo-proyecto", 
    //validamos si nombre no esta vacio  y con trim eliminamos los espacios en blanco
    //.escape para evitar caracteres raros
        authController.usuarioAutenticado,    
        body("nombre").not().isEmpty().trim().escape(),
        proyectoController.nuevoProyecto);

    //Listar Proyecto
    router.get("/proyectos/:url", 
        authController.usuarioAutenticado,
        proyectoController.proyectoPorUrl);
    
    //Atualizar Proyecto
    router.get("/proyecto/editar/:id", 
        authController.usuarioAutenticado,
        proyectoController.editarFormulario);

    router.post("/nuevo-proyecto/:id",
    authController.usuarioAutenticado,
    body("nombre").not().isEmpty().trim().escape(),
    proyectoController.actualizarProyecto);

    //Eliminar Proyecto
    router.delete("/proyectos/:url", 
        authController.usuarioAutenticado,
        proyectoController.eliminarProyecto);
    //Agregar tarea
    router.post("/proyectos/:url",
        authController.usuarioAutenticado,    
        body("nombre").not().isEmpty().trim().escape(),
        tareaController.agregarTarea);

    //Actualizar Tarea - patch nos permite editar una parte de la tabla
    router.patch("/tareas/:id", 
        authController.usuarioAutenticado,
        tareaController.cambiarEstadoTarea);

    //Eliminar tarea
    router.delete("/tareas/:id", 
        authController.usuarioAutenticado,
        tareaController.eliminarTarea);

    //Agregar un nuevo usuario
    router.get("/nueva-cuenta", usuarioController.formCrearCuenta);
    router.post("/nueva-cuenta", usuarioController.crearCuenta);

    //Iniciar Sesion
    router.get("/iniciar-sesion", usuarioController.formIniciarSesion);
    router.post("/iniciar-sesion", authController.autenticarUsuario);

    //Cerrar sesion
    router.get("/cerrar-sesion", authController.cerrarSesion);

    //Reestablecer Contraseña
    router.get("/restablecer-password", usuarioController.formRestablecerPassword);
    router.post("/restablecer-password", authController.enviarToken);

    router.get("/restablecer-password/:token", authController.validarToken);
    router.post("/restablecer-password/:token", authController.restablecerPassword);

    return router;

}

