const sequelize = require("sequelize");

//importamos nuestra base de datos
const db = require("../config/db");

//importamos bcrypt 
const bcrypt = require("bcryptjs");

//importamos la base de datos con la que tiene relacion
const proyects = require("./Proyects");

const Users = db.define("users", {
    id: {
        type: sequelize.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
    },
    userName: {
        type: sequelize.STRING(30),
        validate: {
            notEmpty: {
                msg: "can't have an empty username"
            }
        }
    },
    email: {
        type: sequelize.STRING(60),
        validate: {
            isEmail: {
                msg: "invalid email address"
            },
           notEmpty: {
                msg: "can't have an empty email"
            }
        },
        unique: {
            msg: "An account with this email already exists"
        }
    },
    userPassword: {
        type: sequelize.STRING(60),
        validate: {
            notEmpty: {
                msg: "can't have an empty password"
            }
        }

    },
    activo: {
        type: sequelize.INTEGER,
        defaultValue: 0
    },
    token: sequelize.STRING,
    
    expiracion: sequelize.DATE
},  
    {
    hooks:{
        beforeCreate(user){
            user.userPassword = bcrypt.hashSync(user.userPassword, bcrypt.genSaltSync(10));
        }
    }
});
// Metodos personalizados
Users.prototype.verificarPassword = function(userPassword){
    //comparamos la contraseña ingresada con la almacenada en la base de datos
    return bcrypt.compareSync(userPassword, this.userPassword);
}

Users.hasMany(proyects);

module.exports = Users;