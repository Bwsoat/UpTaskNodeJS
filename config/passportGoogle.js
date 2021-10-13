const passport = require("passport");
require("dotenv").config({ path: "variables.env" });
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//Referenciamos al modelo que vamos a autenticar

const Usuarios = require("../models/Usuarios");

passport.use(
  new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/redirect'
  }, async(accessToken, refreshToken, profile, done) => {
      try {
        const email = profile._json.email;
        const picture = profile._json.picture;
        const usuario = await Usuarios.findOne({where:{ 
          email
         }})
         if(!usuario){
             await Usuarios.create({
              email,
              activo: 1,
              password: "undefine"
            })
         }
        return done(null, usuario);
      } catch (error) {
        console.log(error);
          return done(null, false, {
          message : "esta cuenta no existe"
        });
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