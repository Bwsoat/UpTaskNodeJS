const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

//Referenciamos al modelo que vamos a autenticar

const Usuarios = require("../models/Usuarios");

//local Strategy -login con credenciales propios (usuario y contraseña)
passport.use(
    new localStrategy(
        //Por default passport espera un usuario y una contraseña
        {
            usernameField: "email",
            passwordField: "passport"
        },
        async (email, password, done) =>{
            try {
                //buscamos el usuario en la base de datos
                 const usuario = await Usuarios.find({
                     where: { email: email}
                 })   
            } catch (error) {
                //si el usuario no existe, lanzar un error
                return done(null, false, {
                    message : "esta cuenta no existe"
                })
            }

        }
    )
)