const sequelize = require("sequelize");

//importamos nuestra base de datos
const db = require("../config/db");

//importamos la base de datos con la que tiene relacion
const proyectos = require("./Proyectos");

const Usuarios = db.define("usuarios", {
    id: {
        type: sequelize.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: sequelize.STRING(40),
        allowNull: false
    },
    password: {
        type: sequelize.STRING(60),
        allowNull: false

    }
});

Usuarios.hasMany(proyectos);

module.exports = Usuarios;