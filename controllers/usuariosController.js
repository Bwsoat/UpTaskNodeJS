exports.formCrearCuenta = (req, res, next)=>{
    res.render("crearCuenta", {
        nombrePagina:"Crear un nuevo Usuario"
    });
}

exports.crearCuenta = (req, res, next)=>{
    const {email} = req.body;
    const {password} = req.body;
    console.log(`Email: ${email}, contraseña: ${password}`);

    res.send("todo ok");
/*
    let errores = [];
    //preguntamos si nombre no esta vacio.
    if(!nombre){
        errores.push({"texto": "Agregar un Nombre al Proyecto."});
    }
    //si hay errores
    if(errores.length > 0){
        //mostramos los errores en nuestra pagina
        res.render("nuevo-proyecto", {
            nombrePagina :"Nuevo Proyecto", errores, proyectos});
    }else{
        //no hay errores
        //insertamos los datos en la base de datos
        //le pasamos el nombre que ingresamos en el formulario
        await modelo.create({nombre});
        res.redirect("/");
    }
*/
}