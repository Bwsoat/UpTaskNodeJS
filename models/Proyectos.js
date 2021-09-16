const sequelize = require("sequelize");

//importamos slug

const slug = require("slug");

//importamos shortid

const shortid = require("shortid");

//importamos nuestra base de datos
const db = require("../config/db");

const Proyectos = db.define("proyectos", {
    id: {
        type: sequelize.INTEGER(10),
        primaryKey: true,
        autoIncrement:true
    },
    nombre : sequelize.STRING(100),
    url: sequelize.STRING(100)
}, {//usamos hooks para correr funciones en determinado tiempo
    hooks:{
        beforeCreate(proyecto){
        
        const url = slug(proyecto.nombre).toLowerCase();
        //con shortid y un template agregamos un id al final para diferenciar campos 
        proyecto.url =`${url}-${shortid.generate()}`;
        }
    }
});
//importamos el proyecto que acabamos de crear
module.exports = Proyectos;