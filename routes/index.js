//traemos todas las funciones de express a este archivo
const express = require("express");
const router = express.Router();

//importar express validator, usamos check para usar metodos de validacion
const {body} = require("express-validator");

//importamos el controlador
const proyectoController = require("../controllers/proyectosController.js");

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

    router.get("/proyecto/editar/:id", proyectoController.editarFormulario)

    router.post("/nuevo-proyecto/:id",
    body("nombre").not().isEmpty().trim().escape(),
    proyectoController.actualizarProyecto);

    return router;
}

