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
        authController.authenticatedUser,
        proyectoController.proyectsHome);
    //ruta para la vista nuevo-proyecto
    router.get("/nuevo-proyect", 
        authController.authenticatedUser,
        proyectoController.proyectNuevo);
    
    
    //ruta para el post nuevo-proyecto
    router.post("/nuevo-proyect", 
    //validamos si nombre no esta vacio  y con trim eliminamos los espacios en blanco
    //.escape para evitar caracteres raros
        authController.authenticatedUser,    
        body("nombre").not().isEmpty().trim().escape(),
        proyectoController.nuevoProyect);

    //Listar Proyecto
    router.get("/proyects/:url", 
        authController.authenticatedUser,
        proyectoController.proyectForUrl);
    
    //Todos los proyectos
    router.get("/proyects", 
    authController.authenticatedUser,
    proyectoController.paginaProyects);
    
    //Atualizar Proyecto
    router.get("/proyect/editar/:id", 
        authController.authenticatedUser,
        proyectoController.editarFormulario);

    router.post("/nuevo-proyect/:id",
    authController.authenticatedUser,
    body("name").not().isEmpty().trim().escape(),
    proyectoController.actualizarProyect);

    //Eliminar Proyecto
    router.delete("/proyects/:url", 
        authController.authenticatedUser,
        proyectoController.eliminarProyect);
    //Agregar tarea
    router.post("/proyects/:url",
        authController.authenticatedUser,    
        body("name").not().isEmpty().trim().escape(),
        tareaController.agregarTarea);

    //Actualizar Tarea - patch nos permite editar una parte de la tabla
    router.patch("/tareas/:id", 
        authController.authenticatedUser,
        tareaController.cambiarEstadoTarea);

    //Eliminar tarea
    router.delete("/tareas/:id", 
        authController.authenticatedUser,
        tareaController.eliminarTarea);
    /** 
        Login UpTask
    **/

        //Sign - in
        router.get("/sign-in", usuarioController.formSignIn);
        router.post("/sign-in", authController.authenticatedUser);

        //Create a new account
        router.get("/create-account", usuarioController.formCreateAccount);
        router.post("/create-account", usuarioController.CreateAccount);

        //Activate account
        router.get("/activate-account/:email", authController.activarCuenta);

        //Reset Password
        router.get("/reset-password", usuarioController.formResetPassword);
        router.post("/reset-password", authController.enviarToken);

        router.get("/reset-password/:token", authController.validarToken);
        router.post("/reset-password/:token", authController.restablecerPassword);

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

