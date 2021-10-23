const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//Referenciamos al modelo que vamos a autenticar

const Users = require("../models/Users");

passport.use(
  new GoogleStrategy({
      clientID: "836700723282-3blmrknqqms84e81o4nrllmdfgc010r8.apps.googleusercontent.com",
      clientSecret: "8PMZyjL4Xc04QkxvwrnEISN5",
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