const sequelize = require("sequelize");
const slug = require("slug");
const db = require("../config/db");

//importamos Proyectos
const proyectos= require("./Proyectos");

const Tareas = db.define("tareas", {
    id: {
        type: sequelize.INTEGER(10),
        primaryKey:true,
        autoIncrement:true
    },
    tarea: sequelize.STRING(100),
    
    estado: sequelize.INTEGER(1)
});
Tareas.belongsTo(proyectos);
module.exports= Tareas;
