const passport = require("passport");
require("dotenv").config({ path: "variables.env" });
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//Referenciamos al modelo que vamos a autenticar

const Users = require("../models/Users");

passport.use(
  new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/redirect'
  }, async(accessToken, refreshToken, profile, done) => {
      try {
        const email = profile._json.email;
        const userName = profile._json.name;
        const picture = profile._json.picture;
        const user = await Users.findOne({where:{ 
          email
         }})
         if(!user){
             await Users.create({
              userName : userName,
              email,
              activo: 1,
              userPassword: "undefined",
              userAvatar: picture
            })
         }
        return done(null, user);
      } catch (error) {
        console.log(error);
          return done(null, false, {
          message : "this account doesn't exist"
        });
      }
    }
  )
);
//Serializar el user
passport.serializeUser((user, callback) =>{
    callback(null, user);
})

//Deserializar el user
passport.deserializeUser((user, callback) =>{
    callback(null, user);
})
module.exports = passport;