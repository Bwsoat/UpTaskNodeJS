//traemos todas las funciones de express a este archivo
const express = require("express");
const router = express.Router();
const passport = require("passport");

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
    
    //Todos los proyectos
    router.get("/proyectos", 
    authController.usuarioAutenticado,
    proyectoController.paginaProyectos);
    
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
    /** 
        Login UpTask
    **/

        //Sign - in
        router.get("/sign-in", usuarioController.formSignIn);
        router.post("/sign-in", authController.autenticarUsuario);

        //Create a new account
        router.get("/create-account", usuarioController.formCreateAccount);
        router.post("/create-account", usuarioController.crearCuenta);

        //Activate account
        router.get("/activar-cuenta/:email", authController.activarCuenta);

        //Reset Password
        router.get("/reset-password", usuarioController.formResetPassword);
        router.post("/reset-password", authController.enviarToken);

        router.get("/restablecer-password/:token", authController.validarToken);
        router.post("/restablecer-password/:token", authController.restablecerPassword);

        //Log - out
        router.get("/cerrar-sesion", authController.cerrarSesion);

        router.get("/auth/google", authController.autenticarGoogle);
        router.get('/auth/google/redirect', 
            passport.authenticate('google', { failureRedirect: '/sign-in' }),
            function(req, res) {
                // Successful authentication, redirect home.
                res.redirect('/');
        });
    return router;

}

