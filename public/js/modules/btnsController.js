import Swal from "sweetalert2";
import axios from "axios";

export const btnCerrarSesion = ()=> {
    const btnCerrarSesion = document.querySelector("#cerrarSesion");
    if(btnCerrarSesion){
        btnCerrarSesion.addEventListener("click", e =>{
            Swal.fire({
                title: 'Estas seguro?',
                text: "Se cerrara la sesion!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, cerrar sesion!',
                cancelButtonText: "Cancelar"
              }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href ="/sign-in"
                }
              })
        })
    }
}

export const btnDeleteProyect = ()=> {
        const btnEliminar = document.querySelector("#eliminar-proyecto");

    if(btnEliminar){
        //boton de eliminar
        btnEliminar.addEventListener("click", e =>{
            //hacemos referencia a la url que almacenamos en el boton
            const proyectUrl = e.target.dataset.proyectoUrl;
            Swal.fire({
                title: "Estas seguro?",
                text: "Los cambios no se podran deshacer!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar proyecto!",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    //enviar peticion a axios
                    const url =`${location.origin}/proyects/${proyectUrl}`;

                    axios.delete(url, { params: {proyectUrl}})
                        .then(function(respuesta){
                            Swal.fire(
                                "Eliminado!",
                                respuesta.data,
                                "success"
                            );
                            //redirecciona a al inicio despues de 3 segundos
                            setTimeout(()=>{
                                window.location.href ="/"
                            }, 2000);
                        })
                        .catch(()=>{
                            Swal.fire({
                                icon:"error",
                                title:"Hubo un error",
                                text: "No se pudo eliminar el Proyecto"
                            })
                        })
                }
            })
        });
    }
}
/** 
    Login buttons
**/

export const btnRegister = ()=> {
    const createAccount = document.querySelector("#register");
    if(createAccount){
        createAccount.addEventListener("click",  e =>{
            window.location.href ="/create-account";
        })
    }
}

export const btnResetPassword = ()=> {
    const resetPassword = document.querySelector("#resetPassword");
    if(resetPassword){
        resetPassword.addEventListener("click",  e =>{
            window.location.href ="/reset-password";
        })
    }
}

export const btnLoginGoogle = ()=> {
    const googleBtn = document.querySelector("#btn-google");
    if(googleBtn){
        googleBtn.addEventListener("click",  e =>{
            window.location.href ="/auth/google";
        })
    }
}

export const btnSignIn = ()=> {
    const btnSignIn = document.querySelector("#SignIn");
    if(btnSignIn){
        btnSignIn.addEventListener("click",  e =>{
            window.location.href ="/sign-in";
        })
    }
}