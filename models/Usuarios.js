const sequelize = require("sequelize");

//importamos nuestra base de datos
const db = require("../config/db");

//importamos bcrypt 
const bcrypt = require("bcryptjs");

//importamos la base de datos con la que tiene relacion
const proyectos = require("./Proyectos");

const Usuarios = db.define("usuarios", {
    id: {
        type: sequelize.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: sequelize.STRING(60),
        validate: {
            isEmail: {
                msg: "El correo no es valido"
            },
           notEmpty: {
                msg: "EL email no puede ir vacio"
            }
        },
        unique: {
            msg: "Ya hay una cuenta registrada con ese email"
        }
    },
    password: {
        type: sequelize.STRING(60),
        validate: {
            notEmpty: {
                msg: "La contraseña no puede ir vacia"
            }
        }

    }
},{
    hooks:{
        beforeCreate(usuario){
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }
    }
});

Usuarios.hasMany(proyectos);

module.exports = Usuarios;