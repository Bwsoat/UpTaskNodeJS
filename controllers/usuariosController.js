//Importamos la base de datos: Users
const Users = require("../models/Users");
const sendEmail = require("../handles/email");

exports.formSignIn= (req, res)=>{
    res.render("login/sign-in", {
        namePag: "uptask con node JS"
    });
}

exports.formCreateAccount = (req, res, next)=>{
    res.render("login/create-account", {
        namePag:"Create a new account"
    });
}


exports.CreateAccount = async(req, res, next)=>{
    const {userName, email, userPassword} = req.body;
    try {
        //CreateAccount
        await Users.create({userName, email, userPassword})

        //crear una url que nos mande a activar la account
        const activateUrl = `http://${req.headers.host}/activate-account/${email}`;
        //Preparamos el objeto para send un email
       const user = {email};
       await sendEmail.send({
            user,
            subject: "activate account",
            activateUrl,
            archivo: "activate-account"
        }).catch( error =>{
            console.log(error, "Error to send email");
            next();
        });

        req.flash("success", "the email has been sent successfully");
        res.redirect("/sign-in");
    } catch (error) {
        req.flash("error", error.errors.map(error => error.message));
        res.render("login/create-account", {
            mensajes: req.flash(),
            namePag:"Create Account",
            email,
            userName
        });
    }
}

exports.formResetPassword= (req, res)=>{
    res.render("login/reset-password", {
        namePag: "reset password"
    })
}