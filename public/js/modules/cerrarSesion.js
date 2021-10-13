import Swal from "sweetalert2";

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

export default btnCerrarSesion;