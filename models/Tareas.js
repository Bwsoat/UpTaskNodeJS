const sequelize = require("sequelize");
const slug = require("slug");
const db = require("../config/db");

//importamos Proyects
const proyects= require("./Proyects");

const Tareas = db.define("tareas", {
    id: {
        type: sequelize.INTEGER(10),
        primaryKey:true,
        autoIncrement:true
    },
    tarea: sequelize.STRING(100),
    
    estado: sequelize.INTEGER(1)
});
Tareas.belongsTo(proyects);
module.exports= Tareas;
