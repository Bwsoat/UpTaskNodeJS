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
            passwordField: "password"
        },
        async (email, password, done) =>{
            try {
                //buscamos el usuario en la base de datos
                 const usuario = await Usuarios.findOne({
                     where: { email,
                              activo: 1    
                    }
                 })
                 //usuario existe, contraseña incorrecta
                 if(!usuario.verificarPassword(password)){
                    return done(null, false, {
                        message : "contraseña incorrecta"
                    })
                 }
                 //el usuario existe y la contraseña es correcta
                 return done(null, usuario);
            } catch (error) {
                //si el usuario no existe, lanzar un error
                return done(null, false, {
                    message : "esta cuenta no existe"
                })
            }

        }
    )
);

//Serializar el usuario
passport.serializeUser((usuario, callback) =>{
    callback(null, usuario);
})

//Deserializar el usuario
passport.deserializeUser((usuario, callback) =>{
    callback(null, usuario);
})

module.exports = passport;